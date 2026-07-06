# Panda CSS × Qwik v2 — Requirements Hand-off

**Audience:** a fresh agent (no prior conversation context) tasked with
writing a detailed implementation plan and then implementing **first-class
Qwik v2 support in Panda CSS** (`chakra-ui/panda`), including
`createStyleContext`.

**Why this exists:** Park UI (this repo) wants to add Qwik as a supported
framework (see `components/qwik/PLAN.md` in this repo, branch
`claude/park-ui-qwik-plan-42ayi3`). The analysis there found that the
blocking layer is not Ark UI (a working `@ark-ui/qwik` spike exists) but
**Panda's Qwik codegen**: it targets Qwik 1, its `styled` factory has a
likely event-delivery bug on Qwik 2, and it deliberately generates **no
`createStyleContext`** for Qwik — the helper every Park UI component file is
built on. Fixing this upstream means Park UI's Qwik components become the
same thin one-liners as its React/Solid components, and every other Panda
user gets working Qwik 2 support.

Everything in Part 1 was verified against `@pandacss/generator@1.8.1`
(fetched from unpkg) and `@pandacss/types@1.8.1`. Re-verify against the
current `main` of `chakra-ui/panda` before planning — line numbers will
drift, the facts should not.

---

## Part 0 — Required reading & prior art (read all before planning)

1. **`chakra-ui/panda`** — the target repo. Key paths (in the generator
   package; locate exactly by grepping, the bundle paths below come from the
   published dist):
   - `packages/generator/src/artifacts/qwik-jsx/` — `jsx.ts`, `pattern.ts`,
     `types.ts`, `jsx.string-literal.ts`, `types.string-literal.ts`
   - `packages/generator/src/artifacts/react-jsx/create-style-context.ts` —
     the reference implementation to port (transcribed in Appendix A)
   - the setup code containing `const styleContextExclude = ["qwik", "svelte"]`
     (grep for `styleContextExclude`; it lives in the JSX artifact setup,
     alongside `setupJsxCreateStyleContext` / `setupJsxPatternsIndex`)
   - `packages/types/src/config.ts` — `JsxFramework = 'react' | 'solid' | 'preact' | 'vue' | 'qwik'`
   - the generator's existing artifact snapshot tests and the per-framework
     sandbox apps (grep for how `vue-jsx`/`solid-jsx` artifacts are tested;
     mirror that for qwik)
2. **`gabrielgrant/ark`, branch `claude/busy-noether-lu8dvd`,
   `packages/qwik/PLAN.md`** ("ARK-PLAN") — empirically established Qwik 2
   rules R1–R8. The ones that bind this work are restated as constraints
   C1–C5 in Part 4.3. Also read
   `packages/qwik/src/components/factory.tsx` (why `ark.div` is a tag
   string) and `packages/qwik/src/utils/create-context.ts` (serializable
   context sentinel).
3. **This repo, `components/qwik/PLAN.md`** — the downstream consumer's
   plan; Part 2 there is the gap analysis this hand-off expands.
4. **Qwik 2 docs** (qwik.dev): serialization rules, `component$` vs inline
   components, `useContextProvider`/`useContext`, optimizer `$` capture
   rules, `PropsOf`, `Slot`, and the package rename
   (`@builder.io/qwik` → `@qwik.dev/core`, vite plugin `qwikVite` from
   `@qwik.dev/core/optimizer`, testing from `@qwik.dev/core/testing`).
5. **Test tooling:** `vitest-browser-qwik` (real-browser component tests,
   the only harness that wires Qwik's client event system — ARK-PLAN R5) and
   `ssrRenderToDom` from `@qwik.dev/core/testing` (headless SSR assertions).

---

## Part 1 — Current state of Qwik support in Panda (verified findings)

**F1.** `jsxFramework: 'qwik'` is a valid config value and generates:
`styled-system/jsx/factory` (the `styled` proxy factory), per-pattern JSX
components, and types. So "Qwik support" nominally exists.

**F2.** Every generated qwik artifact imports from **`@builder.io/qwik`**
(Qwik 1): `import { h } from '@builder.io/qwik'` in the factory and
pattern artifacts; `import type { Component, QwikIntrinsicElements } from
'@builder.io/qwik'` in the types artifacts. Qwik 2 renamed the package to
`@qwik.dev/core`. An app on Qwik 2 cannot use these artifacts as generated.

**F3.** The generated qwik `styled` factory produces **plain-function
("inline"/"lite") components**, not `component$`s. The component body
splits props, computes classes, and re-creates the element via
`h(Element, {...forwardedProps, ...elementProps, class}, children)`.
Relevant because of C1 below: ARK-PLAN R1 established by browser bisection
that on Qwik 2 an inline-component wrapper that re-spreads props onto an
inner element renders correct HTML but **silently drops trusted user
events** (spread `on*$` handlers never fire). Whether Panda's `h`-based
variant has the same failure is unverified — it is Spike V2.

**F4.** `createStyleContext` is generated for react, preact, solid, and vue,
but **explicitly excluded for qwik and svelte**:
`const styleContextExclude = ["qwik", "svelte"]` in the JSX patterns index
setup, and `setupJsxCreateStyleContext` returns nothing for them (no
`jsx/create-style-context` file is emitted; the `.d.ts` export line is
emitted unconditionally in the dts index — check whether that dangling type
export is a latent bug worth fixing in passing).

**F5.** The react `createStyleContext` (Appendix A) is the behavioral
reference. Its context **value** is, for config slot recipes, a plain
record of slot-name → className string plus a `_classNameMap` — i.e.
**strings only, fully serializable**. This matters: the hard part on Qwik
is never the context value, it is the HOC mechanics (Part 4.3).

**F6.** Panda exposes a `codegen:prepare` plugin hook that can rewrite
artifact file contents before writing. Park UI's interim plan uses it to
string-replace `@builder.io/qwik` → `@qwik.dev/core` in generated files.
That workaround is the thing this upstream work makes unnecessary.
Signature verified against `@pandacss/types@1.8.1` `hooks.d.ts`:
`'codegen:prepare': (args: { artifacts: Artifact[], original?: Artifact[],
changed: ArtifactId[] | undefined }) => MaybeAsync<void | Artifact[]>` with
`Artifact = { id, dir?, files: { file: string, code: string | undefined }[] }`.

**F7.** The **solid** and **vue** `createStyleContext` artifacts
(`packages/generator/src/artifacts/{solid,vue}-jsx/create-style-context.ts`)
are closer porting references than react's in two respects: solid's uses
the `class` prop (as Qwik does) and has no `forwardRef`, and both show how
the same behavioral contract is re-expressed in a non-React reactivity
model. Read them alongside Appendix A before designing.

**F8.** The `styled-system/` output is emitted as `.mjs`/`.js` (per the
config's `outExtension` / `forceConsistentTypeExtension`), not `.tsx`.
Design C's artifacts want to call `component$` — **whether `qwikVite`'s
optimizer transforms `$`-calls in plain `.mjs` files under `styled-system/`
is unverified** and load-bearing. Spike V1 must include this check (build a
Qwik 2 app whose `component$` lives in a generated-style `.mjs` file and
confirm QRL extraction happens; if not, the qwik artifacts need an
extension/inclusion strategy the plan must specify — e.g. emitting the
style-context artifact so the optimizer processes it, or documenting a
required vite include).

---

## Part 2 — Workstream A: migrate qwik artifacts to Qwik v2 (mechanical)

**Goal:** `panda codegen` with `jsxFramework: 'qwik'` emits artifacts that
import only `@qwik.dev/core` and typecheck in a Qwik 2 app.

Requirements:

- **A1.** All qwik-jsx artifact templates switch imports to
  `@qwik.dev/core` — **and off `h`**. Verified against
  `@qwik.dev/core@2.0.0-beta.36`: `h`/`createElement` still exist at runtime
  and in `core-internal.d.ts` (documented as "the legacy transform,
  @public"), but they are **absent from `public.d.ts`**, the package's `.`
  types entry — so `import { h } from '@qwik.dev/core'` typechecks as an
  error even though it runs (worth filing as a Qwik issue, but don't depend
  on the fix). Migrate the factory to
  `jsx(type, props, key?)` — note the signature change: `h(type, props,
  ...children)` takes varargs children, `jsx` expects **children inside
  props** (`jsx(Element, { ...rest, class, children }, key)`), so the
  factory's render call must move `children ?? combinedProps.children` into
  the props object.
  Confirmed present in the v2 public surface (safe to generate against):
  `jsx`, `Fragment`, `Component`, `FunctionComponent`, `PropsOf`,
  `QwikIntrinsicElements`, `QwikHTMLElements`, `QwikSVGElements`,
  `JSXOutput`, `JSXChildren`, `ContextId`, `createContextId`, `Slot`,
  `useContext`, `useContextProvider`, `component$`, `noSerialize`. Anything
  else the artifacts reference must be re-verified against `public.d.ts`.
- **A2. Back-compat decision (make explicitly, document in the PR):** Panda
  1.x users may exist on Qwik 1. Options:
  (a) hard-switch `'qwik'` to v2 (breaking; simplest; arguably fine since
  the current output is unusable on v2 and Qwik 2 is the supported line);
  (b) add a config knob (e.g. `jsxFramework: 'qwik'` +
  `qwikImportSource: '@builder.io/qwik' | '@qwik.dev/core'`, defaulting to
  v2);
  (c) auto-detect the installed package at codegen time.
  Recommendation to carry into the plan: (a), with (b) as the fallback if
  maintainers push back. Surface the question in the PR description/issue
  before investing in (b)/(c).
- **A3.** The string-literal (template-literal syntax) qwik artifacts get
  the same import migration. Parity, low risk.
- **A4.** Panda's website docs for Qwik installation are updated to a
  Qwik 2 (Qwik City / `@qwik.dev/router`) walkthrough.

Acceptance: a scratch Qwik 2 app (`npm create qwik@latest`, Qwik 2 beta
template) with Panda installed per updated docs; `panda codegen` output
typechecks (`tsc`) and contains zero occurrences of `@builder.io/`.

---

## Part 3 — Workstream B: `styled` factory correctness on Qwik 2

**Goal:** the generated `styled` factory delivers full functionality on
Qwik 2 under SSR + resume, most critically **event handling**.

**Spike V2 (do before designing anything):** in a Qwik 2 app rendered via
SSR and resumed in a real browser (vitest-browser-qwik or a Qwik City dev
server — NOT jsdom/node, see ARK-PLAN R5):
1. `<styled.button onClick$={...}>` — does the handler fire on a trusted
   click? (a) after SSR + resume, (b) pure CSR.
2. `<styled.div asChild?/as={...}>` — `as` prop behavior.
3. `styled(SomeComponent$)` wrapping a `component$` — class merge + prop
   forwarding + a QRL prop passing through.
4. Variant/style-prop recompute when a parent signal changes props.

If events are dropped (expected per ARK-PLAN R1): redesign the factory
component shape. Candidate shapes, in preference order:
- **B-1: keep inline components, stop re-creating the element through a
  wrapper boundary** — investigate whether the failure is specific to how
  props cross the inline boundary and whether `h(tag, props)` with the
  original props object (not a rebuilt one) behaves differently. Only viable
  if the spike isolates a narrow cause.
- **B-2: single static `component$` host** — one `component$` defined at
  artifact module top level, taking `{ as: string | Component, ...props }`;
  the `styled.div` proxy returns lite wrappers that only *add data*
  (class strings, defaults) and delegate rendering to the static
  `component$`, which spreads props onto the host element inside its own
  render (the pattern Qwik component libraries use — spread `on*$` received
  as `component$` props onto a host element works; that is how
  `@ark-ui/qwik` parts deliver user handlers today). Costs a component
  boundary per styled element; measure, don't guess.
- **B-3: document events-unsupported on styled elements** — last resort;
  unacceptable for Park UI (buttons are styled elements).

Requirements regardless of shape:
- **B1.** Class computation semantics identical to react factory: recipe/cva
  resolution, `shouldForwardProp`/`forwardProps`, `dataAttr`, `defaultProps`,
  `unstyled`, `class`+`className` merge (qwik uses `class`; accept both like
  the current artifact does).
- **B2.** All of it verified over **SSR + resume**, not only CSR — Qwik's
  failure modes are resume-specific (serialization errors class Q3/Q8,
  handlers never wired). Every artifact test in Part 5 runs both modes.
- **B3.** No use of Qwik internals; only public `@qwik.dev/core` API (the
  Zag adapter's use of internals is already flagged as a churn risk —
  don't add a second dependency on internals from Panda).

---

## Part 4 — Workstream C: `createStyleContext` for Qwik (the core ask)

### 4.1 API surface (must match the react artifact, Appendix A)

```ts
export function createStyleContext<R extends SlotRecipe>(recipe: R): {
  withRootProvider: <T>(Component: T, options?: { defaultProps?: Partial<Props> }) => Component
  withProvider:     <T>(Component: T, slot: InferSlot<R>, options?: JsxFactoryOptions) => Component
  withContext:      <T>(Component: T, slot: InferSlot<R>, options?: JsxFactoryOptions) => Component
}
```

Called by downstream code exactly like this (real Park UI file):

```tsx
const { withProvider, withContext } = createStyleContext(checkbox)
export const Root    = withProvider(Checkbox.Root, 'root')      // module top level
export const Control = withContext(Checkbox.Control, 'control')
export const Label   = withContext(Checkbox.Label, 'label')
```

and (dialog — the no-element provider case):

```tsx
const { withRootProvider, withContext } = createStyleContext(dialog)
export const Root = withRootProvider(Dialog.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
```

and (accordion — the JSX-in-defaultProps case):

```tsx
export const ItemIndicator = withContext(Accordion.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <ChevronDownIcon /> },
})
```

### 4.2 Behavioral requirements (extracted from the react artifact — parity list)

- **CS1.** `withProvider` splits variant props via
  `recipe.splitVariantProps(props)`; computes `slotStyles`
  (config recipe → `recipe(variantProps)` = slot→className record; ad-hoc
  recipe → `sva(recipe.config)` and `.raw(variantProps)`); attaches
  `_classNameMap = recipe.classNameMap`; provides
  `{ ...slotStyles, _classNameMap }` via context; renders the wrapped
  component with the slot's classes merged.
- **CS2.** Class merge order must match react:
  final class = `cx(resolvedClassName, _classNameMap[slot])` where
  `resolvedClassName` = `cx(slotStyles[slot], userClassName)` for config
  recipes, or the `jsxStyleProps`-mode-dependent resolution for ad-hoc
  recipes (`all` → spread slot styles as style props; `minimal` → merge into
  `css` prop via `css.raw`; `none` → `cx(css(slotStyles), userClassName)`).
  The qwik artifact must honor `ctx.config.jsxStyleProps` through the same
  three modes (Qwik note: `class` is the native prop; also accept
  `className` for parity with the factory).
- **CS3.** `unstyled?: boolean` prop on every produced component skips
  recipe classes (user class/css still applies).
- **CS4.** `options.defaultProps` merge under incoming props, including
  **JSX children** (accordion case above). On Qwik, JSX nodes are
  serializable values — but this specific case (JSX created at module scope
  of a user file, stored in an options object, rendered inside another
  component) must be covered by a test (V3-d).
- **CS5.** `withRootProvider` renders **no styled element** — context
  provider + component only; takes no slot; supports `defaultProps`.
- **CS6.** `withContext` consumes the context and merges its slot class; a
  consumer rendered with **no provider above it** must fail with a
  descriptive error naming the recipe and slot (react uses a safe-context
  wrapper; Qwik's `useContext` without default throws Q8 — wrap or map the
  error so the message stays actionable; note ARK-PLAN R3: any *default*
  passed to `useContext` gets serialized, so a sentinel default must be a
  plain serializable object, never one containing functions).
- **CS7.** Produced components forward everything else: refs (Qwik `ref`
  signal props flow through the ordinary prop spread — no forwardRef
  machinery), event QRLs, `aria-*`/`data-*`, and children (Qwik: project
  via `<Slot />` when the produced component is a `component$`).
- **CS8.** Types: generated `.d.ts` parity with the react one (Appendix A
  bottom) using Qwik types — `Component`/`FunctionComponent`/`PropsOf` from
  `@qwik.dev/core` instead of `ComponentType`/`ElementType`;
  `UnstyledProps`; `RecipeVariantProps<R>` merged into provider props;
  `InferSlot<R>` slot-name inference must keep working (it drives
  autocomplete in every downstream component file).
- **CS9.** SSR + resume correctness: classes present in SSR HTML; no
  serialization errors (Q3/Q8 class) with the devtools/dev-mode checks on;
  after resume, changing a variant prop client-side recomputes classes;
  interaction through a styled Ark part still drives `data-*` attribute
  styling (`_checked`, `_open` conditions style on data attributes emitted
  by Zag — no JS needed — but the click must still work, which is the R1
  interaction with Workstream B).

### 4.3 Qwik constraints that shape the design (why the react port won't transpile)

- **C1 (from ARK-PLAN R1).** Inline (non-`component$`) components cannot use
  `use*` hooks — so `useContextProvider`/`useContext` force the produced
  components to be `component$`s (or to delegate to one).
- **C2.** `component$` closures may capture, roughly: module-top-level
  symbols (re-imported on resume) and serializable runtime values (captured
  via lexical scope and **serialized at SSR pause**). A captured **recipe
  function** or arbitrary user **options object with functions** breaks
  serialization at SSR. A captured **component reference** is expected to be
  serializable (Qwik components are QRL-backed) — verify (V1).
- **C3.** Whether the optimizer accepts `component$(...)` call sites inside
  a regular factory function at all (HOC pattern) is **unverified on
  Qwik 2** and is the single biggest design risk. ARK-PLAN concluded a
  `component$`-based *proxy* factory was impossible for Ark's `ark.<tag>`;
  the createStyleContext case differs (static call sites in a generated
  artifact module, not a Proxy `get`). **Spike V1 answers this first.**
- **C4 (from ARK-PLAN R3).** Anything passed as a `useContext` default is
  serialized into the component's state. Defaults must be plain data; detect
  sentinels by marker property, not identity.
- **C5.** The `styled-system/` output is app source compiled by `qwikVite`,
  so generated artifact files ARE processed by the Qwik optimizer — the
  artifacts can therefore use `component$`, `$`, `Slot`, etc. This is an
  advantage no other Panda framework target has needed; use it.

### 4.4 Candidate designs (evaluate in this order; the plan should pick after V1)

**D1 — runtime `component$` HOC with serializable-only captures.**
Shape: `withProvider` calls `component$` directly (static call site in the
artifact module). Closure captures ONLY serializable data:
- the recipe identified by **name** (`recipe.__name__`, exists on config
  recipes) resolved at render time through a module-level registry the
  artifact imports (codegen emits `import * as recipes from
  '../recipes'` or a dedicated name→recipe map — codegen controls both
  sides, so this is easy to generate);
- for ad-hoc `sva()` recipes: capture `recipe.config` (a plain object,
  serializable) and rebuild with `sva(config)` at render;
- `slot` (string), `defaultProps` (serializable by CS4), and the wrapped
  `Component` reference (C2 verification).
Pros: closest to react artifact, one boundary per part. Cons: dies entirely
if V1 says the optimizer rejects function-scope `component$` (C3), and the
registry indirection only covers *config* recipes cleanly.

**D2 — single static `component$` per role, component-as-prop.**
The artifact defines exactly two (three) top-level `component$`s:
`StyleProvider` and `StyleConsumer` (+`RootProvider`), each taking
`{ Cmp, slot, contextId, recipeName | recipeConfig, defaultProps, ...rest }`
as **props** (all serializable; `Cmp` is a component reference).
`withProvider(Component, slot)` then returns a hook-free **inline** wrapper:
`(props) => <StyleProvider Cmp={Component} slot={slot} ctx={id} {...props}/>`
— legal because the inline layer uses no hooks and creates no closures the
optimizer must extract. `createStyleContext(recipe)` mints one
`createContextId` per call (verify a ContextId — `{id: string}` — passes
through props; if not, key a single shared context by recipe name).
Pros: zero runtime `component$` creation → sidesteps C3 entirely; all
capture problems become prop-serialization problems, which are testable.
Cons: one extra (inline, cheap) layer; slightly odd generated code.
**This is the recommended default if D1 fails V1.**

**D3 — per-recipe codegen (bail-out).**
Panda knows every config recipe at codegen time; emit a concrete
style-context module per slot recipe. Rejected as primary: doesn't serve
ad-hoc `sva` recipes, bloats codegen, and downstream call sites
(`createStyleContext(recipe)`) would need to change shape. Keep only as a
recorded fallback.

### 4.5 Spikes (run before writing the plan's implementation section)

- **V1:** Minimal repro of D1's mechanics on Qwik 2: a hand-written module
  with `const make = (Cmp, s) => component$((p) => {...})` capturing a
  component ref + string; SSR + resume + click. Answers C3 and the
  component-ref-serializability half of C2. ~1 hour, decides D1 vs D2.
  Include the F8 check: put the same code in a plain `.mjs` file imported
  from the app (simulating generated `styled-system` output) and confirm
  the optimizer still extracts the QRLs.
- **V2:** The Workstream B event spike (Part 3) — shared prerequisite.
- **V3:** Hand-write (no codegen yet) the chosen design as a static
  `create-style-context.tsx` in a Qwik 2 sandbox app and drive it with
  `@ark-ui/qwik`'s Checkbox (the only Ark part that exists — bootstrap per
  ARK-PLAN Part 1): (a) SSR classes on all slots, (b) click-to-check after
  resume with `data-state` styling, (c) missing-provider error, (d) JSX
  `defaultProps.children`, (e) `unstyled`, (f) variant recompute. Only after
  V3 passes green does the work move into Panda's generator as a template.

---

## Part 5 — Testing & acceptance

**In `chakra-ui/panda`:**
1. Artifact snapshot tests for every generated qwik file (mirror how other
   frameworks' artifacts are snapshot-tested in the generator package).
2. A Qwik 2 sandbox app (mirror the repo's existing per-framework sandboxes)
   exercising: `styled.*` elements with events, patterns, recipes,
   `createStyleContext` with a multi-slot recipe — run under real SSR.
3. Browser-mode interaction tests (vitest-browser-qwik or the sandbox +
   Playwright): every CS9 assertion, both SSR+resume and CSR. Headless
   jsdom/node tests are structurally unable to catch the event bugs
   (ARK-PLAN R5) — do not accept a test suite without a real-browser layer.

**Downstream validation (definition of done for the whole effort):**
4. In Park UI: point `components/qwik` (per `components/qwik/PLAN.md`
   Phase 0) at the patched Panda; the Park UI checkbox file written **in the
   react one-liner style** (`withProvider(Checkbox.Root, 'root')` …) works
   over SSR + resume against `@ark-ui/qwik`. That file replacing the
   hand-rolled pattern in PLAN.md Part 2.4 is the success criterion.
5. `panda codegen` output for qwik contains zero `@builder.io/*` imports;
   no `codegen:prepare` rewrite plugin needed anymore.

**Non-goals (state in the plan to prevent scope creep):**
- No Qwik 1 feature work beyond the A2 back-compat decision.
- No changes to Panda's core css/recipe engine — this is JSX-artifact-layer
  only.
- Svelte's parallel exclusion from `styleContextExclude` stays untouched.
- No Ark UI or Zag changes; if a blocker traces into `@zag-js/qwik` or
  `@ark-ui/qwik`, report it against ARK-PLAN rather than working around it
  in Panda.

---

## Part 6 — Sequencing & upstream strategy

1. Fork `chakra-ui/panda`; develop on a branch; keep every change inside
   the generator/types/docs surfaces listed above.
2. Order: Spikes V1/V2 → Workstream A (unblocks everything, trivially
   reviewable) → V3 → Workstream C template + tests → Workstream B redesign
   if V2 demands it (A and C are useful even while B's answer is pending,
   since `createStyleContext` wraps mostly Ark `component$`s, not bare
   styled elements).
3. Open a tracking issue on `chakra-ui/panda` early, presenting: the Qwik-1
   → Qwik-2 situation, the A2 options, and the D1/D2 design sketch — before
   the big PR. Panda maintainers may have opinions (e.g. waiting for Qwik 2
   stable); a fork consumed via Park UI's `codegen:prepare` plugin remains
   the interim path either way, so upstream latency does not block Park UI.
4. Versioning: land as a minor of Panda 1.x if A2=(a) is accepted as
   "fixing an unusable target" rather than a breaking change; otherwise
   behind the A2=(b) knob.

## Part 7 — Environment quick-start for the implementing agent

```bash
# clone the three reference repos as siblings
git clone https://github.com/chakra-ui/panda
git clone https://github.com/gabrielgrant/ark   && git -C ark checkout claude/busy-noether-lu8dvd
git clone https://github.com/gabrielgrant/zag   && git -C zag checkout qwik-adapter-f
# ark bootstrap (links zag, installs): see ark/packages/qwik/PLAN.md Part 1
# park-ui (this repo) branch with the downstream plan:
#   claude/park-ui-qwik-plan-42ayi3 → components/qwik/PLAN.md
```

Pin `@qwik.dev/core` to the exact version Ark uses (`2.0.0-beta.36` at time
of writing) in all spikes/sandboxes; Qwik 2 is beta and drifts.

---

## Appendix A — React `createStyleContext` artifact (behavioral reference)

Transcribed from `@pandacss/generator@1.8.1`
(`src/artifacts/react-jsx/create-style-context.ts` output, `jsxStyleProps:
'all'` branch shown at the marked line). This is the semantics contract for
Part 4.2; the Qwik implementation must match it observably, not textually.

```js
'use client'
import { cx, css, sva } from '../css/index'
import { styled } from './factory'
import { getDisplayName } from './factory-helper'
import { createContext, useContext, createElement, forwardRef } from 'react'

function createSafeContext(contextName) {
  const Context = createContext(undefined)
  const useStyleContext = (componentName, slot) => {
    const context = useContext(Context)
    if (context === undefined) {
      const componentInfo = componentName ? `Component "${componentName}"` : 'A component'
      const slotInfo = slot ? ` (slot: "${slot}")` : ''
      throw new Error(
        `${componentInfo}${slotInfo} cannot access ${contextName} because it's missing its Provider.`
      )
    }
    return context
  }
  return [Context, useStyleContext]
}

export function createStyleContext(recipe) {
  const isConfigRecipe = '__recipe__' in recipe
  const recipeName = isConfigRecipe && recipe.__name__ ? recipe.__name__ : undefined
  const contextName = recipeName ? `createStyleContext("${recipeName}")` : 'createStyleContext'

  const [StyleContext, useStyleContext] = createSafeContext(contextName)
  const svaFn = isConfigRecipe ? recipe : sva(recipe.config)

  const getResolvedProps = (props, slotStyles) => {
    const { unstyled, ...restProps } = props
    if (unstyled) return restProps
    if (isConfigRecipe) {
      return { ...restProps, className: cx(slotStyles, restProps.className) }
    }
    return { ...slotStyles, ...restProps }   // jsxStyleProps: 'all' mode
    // 'minimal': return { ...restProps, css: css.raw(slotStyles, restProps.css) }
    // 'none':    return { ...restProps, className: cx(css(slotStyles), restProps.className) }
  }

  const withRootProvider = (Component, options) => {
    const WithRootProvider = (props) => {
      const [variantProps, otherProps] = svaFn.splitVariantProps(props)
      const slotStyles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
      slotStyles._classNameMap = svaFn.classNameMap
      const mergedProps = options?.defaultProps
        ? { ...options.defaultProps, ...otherProps }
        : otherProps
      return createElement(StyleContext.Provider, {
        value: slotStyles,
        children: createElement(Component, mergedProps)
      })
    }
    return WithRootProvider
  }

  const withProvider = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)
    const WithProvider = forwardRef((props, ref) => {
      const [variantProps, restProps] = svaFn.splitVariantProps(props)
      const slotStyles = isConfigRecipe ? svaFn(variantProps) : svaFn.raw(variantProps)
      slotStyles._classNameMap = svaFn.classNameMap
      const propsWithClass = { ...restProps, className: restProps.className ?? options?.defaultProps?.className }
      const resolvedProps = getResolvedProps(propsWithClass, slotStyles[slot])
      return createElement(StyleContext.Provider, {
        value: slotStyles,
        children: createElement(StyledComponent, {
          ...resolvedProps,
          className: cx(resolvedProps.className, slotStyles._classNameMap[slot]),
          ref,
        })
      })
    })
    return WithProvider
  }

  const withContext = (Component, slot, options) => {
    const StyledComponent = styled(Component, {}, options)
    const componentName = getDisplayName(Component)
    const WithContext = forwardRef((props, ref) => {
      const slotStyles = useStyleContext(componentName, slot)
      const propsWithClass = { ...props, className: props.className ?? options?.defaultProps?.className }
      const resolvedProps = getResolvedProps(propsWithClass, slotStyles[slot])
      return createElement(StyledComponent, {
        ...resolvedProps,
        className: cx(resolvedProps.className, slotStyles._classNameMap[slot]),
        ref,
      })
    })
    return WithContext
  }

  return { withRootProvider, withProvider, withContext }
}
```

Notes for the Qwik port that fall out of this code:
- `withProvider`/`withContext` route through `styled(Component)` — on Qwik
  this couples Workstream C to Workstream B's factory verdict. If the
  factory redesign lags, an acceptable interim is for the qwik
  createStyleContext to merge classes directly (skip the `styled()` wrap;
  style props on context parts then follow whatever CS2 mode is chosen).
- `_classNameMap[slot]` (the recipe's static per-slot class, e.g.
  `checkbox__root`) is merged *in addition to* the variant classes; keep
  both or conditions/targeting in user CSS break.
- `forwardRef` disappears on Qwik (CS7); `getDisplayName` has no Qwik
  equivalent — drop or emulate for error messages only.

## Appendix B — Current qwik `styled` factory (excerpt, for Workstream B)

The generated component per element (inline function, Qwik-1 `h`):

```js
import { h } from '@builder.io/qwik'   // ← Qwik 1 import (F2)
// ...
const Component = function Component(props) {
  const { as: Element = __base__, unstyled, children, className, ...restProps } = props
  const combinedProps = Object.assign({}, defaultProps, restProps)
  const [htmlProps, forwardedProps, variantProps, styleProps, elementProps] =
    splitProps(combinedProps, normalizeHTMLProps.keys, __shouldForwardProps__, __cvaFn__.variantKeys, isCssProperty)
  // ...class computation (recipeClass/cvaClass/unstyled)...
  return h(Element, {
    ...forwardedProps,
    ...elementProps,
    ...normalizeHTMLProps(htmlProps),
    class: classes(),
  }, children ?? combinedProps.children)
}
```

The `styled` export is a Proxy caching `styledFn(el)` per tag. This is the
inline-wrapper shape ARK-PLAN R1 indicts; V2 tests it as-is on Qwik 2 before
any redesign. Note the A1 finding applies here directly: the `h(Element,
props, children)` call must become `jsx(Element, { ...props, children },
key)` on Qwik 2 — `h` runs but no longer typechecks against the public
surface, and children move into the props object.
