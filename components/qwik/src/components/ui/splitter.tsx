import { Splitter } from '@ark-ui/qwik/splitter'
import { createStyleContext } from 'styled-system/jsx'
import { splitter } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(splitter)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Splitter.Root, 'root')
export const Panel = withContext(Splitter.Panel, 'panel')
export const ResizeTrigger = withContext(Splitter.ResizeTrigger, 'resizeTrigger')
