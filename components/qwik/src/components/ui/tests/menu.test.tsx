import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import * as Menu from '../menu'
import { ComponentUnderTest } from './menu.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Menu (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest open />, { qwikLoader: true })

    expect(getClasses(document, '[data-testid="trigger"]')).toContain('menu__trigger')
    expect(getClasses(document, '[data-testid="indicator"]')).toContain('menu__indicator')
    expect(getClasses(document, '[data-testid="positioner"]')).toContain('menu__positioner')
    expect(getClasses(document, '[data-testid="content"]')).toContain('menu__content')
    expect(getClasses(document, '[data-testid="item-group"]')).toContain('menu__itemGroup')
    expect(getClasses(document, '[data-testid="item-group-label"]')).toContain(
      'menu__itemGroupLabel',
    )
    expect(getClasses(document, '[data-testid="item-open"]')).toContain('menu__item')
    expect(getClasses(document, '[data-testid="separator"]')).toContain('menu__separator')
  })

  it('applies default and explicit size variant classes', async () => {
    const md = await ssrRenderToDom(<ComponentUnderTest open />, { qwikLoader: true })
    expect(getClasses(md.document, '[data-testid="content"]')).toContain('menu__content--size_md')

    const sm = await ssrRenderToDom(<ComponentUnderTest open size="sm" />, { qwikLoader: true })
    expect(getClasses(sm.document, '[data-testid="content"]')).toContain('menu__content--size_sm')
    expect(getClasses(sm.document, '[data-testid="item-open"]')).toContain('menu__item--size_sm')
  })

  it('lazily mounts the content by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="trigger"]')?.getAttribute('aria-expanded')).toBe(
      'false',
    )
    expect(document.querySelector('[data-testid="content"]')).toBeFalsy()
  })

  it('renders the chevron icon as the default indicator', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="indicator"] svg')).toBeTruthy()
  })

  it('renders the check icon only for checked items', async () => {
    const { document } = await ssrRenderToDom(
      <Menu.Root open>
        <Menu.Trigger>Settings</Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.CheckboxItem value="a" checked data-testid="item-a">
              A
              <Menu.ItemIndicator data-testid="indicator-a" />
            </Menu.CheckboxItem>
            <Menu.CheckboxItem value="b" checked={false} data-testid="item-b">
              B
              <Menu.ItemIndicator data-testid="indicator-b" />
            </Menu.CheckboxItem>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>,
      { qwikLoader: true },
    )

    const indicatorA = document.querySelector('[data-testid="indicator-a"]')
    expect(indicatorA?.getAttribute('class')).toContain('menu__itemIndicator')
    expect(indicatorA?.querySelector('svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="indicator-b"]')).toBeFalsy()
    expect(document.querySelector('[data-testid="item-b"] svg[aria-hidden="true"]')).toBeTruthy()
  })
})
