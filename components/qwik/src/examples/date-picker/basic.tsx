import { useDatePickerContext } from '@ark-ui/qwik/date-picker'
import { component$ } from '@qwik.dev/core'
import { DatePicker } from '@/components/ui'

export const App = () => {
  return (
    <DatePicker.Root>
      <DatePicker.Label>Select Date</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input placeholder="Select a date" />
        <DatePicker.Trigger>📅</DatePicker.Trigger>
        <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <ViewControl />
            <DayTable />
          </DatePicker.View>
          <DatePicker.View view="month">
            <ViewControl />
            <MonthTable />
          </DatePicker.View>
          <DatePicker.View view="year">
            <ViewControl />
            <YearTable />
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}

const ViewControl = () => (
  <DatePicker.ViewControl>
    <DatePicker.PrevTrigger>‹</DatePicker.PrevTrigger>
    <DatePicker.ViewTrigger>
      <DatePicker.RangeText />
    </DatePicker.ViewTrigger>
    <DatePicker.NextTrigger>›</DatePicker.NextTrigger>
  </DatePicker.ViewControl>
)

const DayTable = component$(() => {
  const datePicker = useDatePickerContext()

  return (
    <DatePicker.Table>
      <DatePicker.TableHead>
        <DatePicker.TableRow>
          {datePicker?.weekDays.map((weekDay) => (
            <DatePicker.TableHeader key={weekDay.long}>{weekDay.short}</DatePicker.TableHeader>
          ))}
        </DatePicker.TableRow>
      </DatePicker.TableHead>
      <DatePicker.TableBody>
        {datePicker?.weeks.map((week, index) => (
          <DatePicker.TableRow key={index}>
            {week.map((day) => (
              <DatePicker.TableCell key={day.toString()} value={day}>
                <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            ))}
          </DatePicker.TableRow>
        ))}
      </DatePicker.TableBody>
    </DatePicker.Table>
  )
})

const MonthTable = component$(() => {
  const datePicker = useDatePickerContext()

  return (
    <DatePicker.Table>
      <DatePicker.TableBody>
        {datePicker?.getMonthsGrid({ columns: 4, format: 'short' }).map((months, index) => (
          <DatePicker.TableRow key={index}>
            {months.map((month) => (
              <DatePicker.TableCell key={month.value} value={month.value}>
                <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            ))}
          </DatePicker.TableRow>
        ))}
      </DatePicker.TableBody>
    </DatePicker.Table>
  )
})

const YearTable = component$(() => {
  const datePicker = useDatePickerContext()

  return (
    <DatePicker.Table>
      <DatePicker.TableBody>
        {datePicker?.getYearsGrid({ columns: 4 }).map((years, index) => (
          <DatePicker.TableRow key={index}>
            {years.map((year) => (
              <DatePicker.TableCell key={year.value} value={year.value}>
                <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
              </DatePicker.TableCell>
            ))}
          </DatePicker.TableRow>
        ))}
      </DatePicker.TableBody>
    </DatePicker.Table>
  )
})
