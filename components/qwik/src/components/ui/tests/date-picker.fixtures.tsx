import { useDatePickerContext } from '@ark-ui/qwik/date-picker'
import { component$ } from '@qwik.dev/core'
import * as DatePicker from '../date-picker'

const DayTable = component$(() => {
  const api = useDatePickerContext()

  return (
    <DatePicker.Table>
      <DatePicker.TableHead>
        <DatePicker.TableRow>
          {api?.weekDays.map((weekDay) => (
            <DatePicker.TableHeader key={weekDay.long}>{weekDay.short}</DatePicker.TableHeader>
          ))}
        </DatePicker.TableRow>
      </DatePicker.TableHead>
      <DatePicker.TableBody>
        {api?.weeks.map((week, index) => (
          <DatePicker.TableRow key={index}>
            {week.map((day) => (
              <DatePicker.TableCell key={day.toString()} value={day}>
                <DatePicker.TableCellTrigger data-testid={`day-${day.toString()}`}>
                  {day.day}
                </DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            ))}
          </DatePicker.TableRow>
        ))}
      </DatePicker.TableBody>
    </DatePicker.Table>
  )
})

export const ComponentUnderTest = (props: Partial<DatePicker.RootProps>) => (
  <DatePicker.Root {...props}>
    <DatePicker.Label>Select Date</DatePicker.Label>
    <DatePicker.Control>
      <DatePicker.Input placeholder="Select a date" data-testid="input" />
      <DatePicker.Trigger data-testid="trigger">📅</DatePicker.Trigger>
      <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content data-testid="content">
        <DatePicker.View view="day">
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger>‹</DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger>
              <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger>›</DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <DayTable />
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
)
