import { component$ } from '@qwik.dev/core'
import { QwikRouterProvider, RouterOutlet } from '@qwik.dev/router'

import './global.css'

export default component$(() => {
  return (
    <QwikRouterProvider>
      <head>
        <meta charset="utf-8" />
        <title>Park UI Qwik playground</title>
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikRouterProvider>
  )
})
