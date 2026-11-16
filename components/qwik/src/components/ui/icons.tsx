import type { PropsOf } from '@qwik.dev/core'

// Icon paths from lucide (https://lucide.dev), ISC license. lucide has no Qwik
// build, so the icons Park UI components need are inlined here.

export type IconProps = PropsOf<'svg'>

const svgDefaults = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

export const CheckIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const ChevronDownIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ChevronRightIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export const ChevronUpIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="m18 15-6-6-6 6" />
  </svg>
)

export const ChevronsUpDownIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
)

export const CopyIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

export const EllipsisIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

export const FileIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  </svg>
)

export const InfoIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

export const StarIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
)

export const UserIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

export const XIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

export const CheckCircleIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const CircleAlertIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)

export const CircleXIcon = (props: IconProps) => (
  <svg aria-hidden="true" {...svgDefaults} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
)
