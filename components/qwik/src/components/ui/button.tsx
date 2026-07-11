import { ark } from '@ark-ui/qwik/factory'
import { Slot, component$, createContextId, useContext, useContextProvider } from '@qwik.dev/core'
import { styled } from 'styled-system/jsx'
import { type ButtonVariantProps, button } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { Group, type GroupProps } from './group'
import { Spinner } from './spinner'

const BaseButton = styled(ark.button, button)
type BaseButtonProps = ComponentProps<typeof BaseButton>

export interface ButtonLoadingProps {
  /**
   * If `true`, the button will show a loading spinner.
   * @default false
   */
  loading?: boolean | undefined
  /**
   * The text to show while loading.
   */
  loadingText?: string | undefined
  /**
   * The placement of the spinner
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end' | undefined
}

export interface ButtonProps extends BaseButtonProps, ButtonLoadingProps {}

const ButtonPropsContext = createContextId<ButtonVariantProps>('park-ui.button.props')

export const Button = component$<ButtonProps>((props) => {
  const propsContext = useContext(ButtonPropsContext, {})
  const { loading, loadingText, spinnerPlacement = 'start', ...rest } = props
  const buttonProps = { ...propsContext, ...rest }
  const hideChildren = Boolean(loading && loadingText)

  return (
    <BaseButton
      type="button"
      {...buttonProps}
      data-loading={loading ? '' : undefined}
      disabled={loading || rest.disabled}
    >
      {loading && spinnerPlacement === 'start' && (
        <Spinner size="inherit" borderWidth="0.125em" color="inherit" />
      )}
      {hideChildren && loadingText}
      <styled.span display="contents" hidden={hideChildren}>
        <Slot />
      </styled.span>
      {loading && spinnerPlacement === 'end' && (
        <Spinner size="inherit" borderWidth="0.125em" color="inherit" />
      )}
    </BaseButton>
  )
})

export interface ButtonGroupProps extends GroupProps, ButtonVariantProps {}

export const ButtonGroup = component$<ButtonGroupProps>((props) => {
  const [variantProps, restProps] = button.splitVariantProps(props)
  useContextProvider(ButtonPropsContext, variantProps)

  return (
    <Group {...restProps}>
      <Slot />
    </Group>
  )
})
