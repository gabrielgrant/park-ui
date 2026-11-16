import { Toaster as ArkToaster, createToaster, Toast, type ToastOptions } from '@ark-ui/qwik/toast'
import { createStyleContext, Stack, styled } from 'styled-system/jsx'
import { button, toast as toastRecipe } from 'styled-system/recipes'
import { Icon, type IconProps } from './icon'
import { CheckCircleIcon, CircleAlertIcon, CircleXIcon, XIcon } from './icons'
import { Spinner } from './spinner'

const { withProvider, withContext } = createStyleContext(toastRecipe)

const Root = withProvider(Toast.Root, 'root')
const Title = withContext(Toast.Title, 'title')
const Description = withContext(Toast.Description, 'description')
const ActionTrigger = withContext(Toast.ActionTrigger, 'actionTrigger')
const CloseTrigger = withContext(Toast.CloseTrigger, 'closeTrigger')
const StyledToaster = styled(ArkToaster)

const iconMap: Record<string, typeof CheckCircleIcon> = {
  warning: CircleAlertIcon,
  success: CheckCircleIcon,
  error: CircleXIcon,
}

interface IndicatorProps extends IconProps {
  type?: string | undefined
}

const Indicator = (props: IndicatorProps) => {
  const { type, ...rest } = props
  const StatusIcon = type ? iconMap[type] : undefined
  if (!StatusIcon) return null

  return <Icon as={StatusIcon} data-type={type} {...rest} />
}

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  overlap: true,
  max: 5,
})

const renderToast = (toast: ToastOptions) => (
  <Root>
    {toast.type === 'loading' ? (
      <Spinner color="colorPalette.plain.fg" />
    ) : (
      <Indicator type={toast.type} />
    )}

    <Stack gap="3" alignItems="start">
      <Stack gap="1">
        {toast.title && <Title>{toast.title}</Title>}
        {toast.description && <Description>{toast.description}</Description>}
      </Stack>
      {toast.action && <ActionTrigger>{toast.action.label}</ActionTrigger>}
    </Stack>
    {toast.closable && (
      <CloseTrigger
        class={button({ variant: 'plain', size: 'sm' })}
        colorPalette="gray"
        px="0"
        py="0"
        aria-label="Close"
      >
        <XIcon />
      </CloseTrigger>
    )}
  </Root>
)

export const Toaster = () => {
  return <StyledToaster toaster={toaster} renderToast={renderToast} insetInline={{ mdDown: '4' }} />
}
