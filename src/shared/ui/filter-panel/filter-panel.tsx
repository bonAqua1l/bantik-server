import React from 'react'

import { BaseOptionType } from 'antd/es/select'
import { SelectProps } from 'antd/lib'
import { Dayjs } from 'dayjs'

import { DatePickerField } from '../date-picker-field/date-picker-field'
// import { SelectField } from '../select-field/select-field'

interface Props extends SelectProps {
  options: BaseOptionType[]
}

export const FilterPanel: React.FC<Props> = (props) => {
  const [yearValue, setYearValue] = React.useState<Dayjs | null>(null)
  const [monthValue, setMonthValue] = React.useState<Dayjs | null>(null)
  const [dayValue, setDayValue] = React.useState<Dayjs | null>(null)
  const handleChangeYearDatePicker = React.useCallback((newYear: Dayjs | null) => {
    if (!newYear) {
      setYearValue(null)
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setYearValue(newYear)
    setMonthValue(prev => (prev ? prev.year(newYear.year()) : newYear))
    setDayValue(prev => (prev ? prev.year(newYear.year()) : newYear))
  }, [])

  const handleChangeMonthDatePicker = React.useCallback((newMonth: Dayjs | null) => {
    if (!newMonth) {
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setMonthValue(newMonth)
    setYearValue(prev => (prev ? prev.year(newMonth.year()) : newMonth))
    setDayValue(prev => {
      if (!prev) {
        return newMonth.date(1)
      }

      return prev.year(newMonth.year()).month(newMonth.month())
    })
  }, [])

  const handleChangeDayDatePicker = React.useCallback((newDay: Dayjs | null) => {
    setDayValue(newDay)

    if (!newDay) {
      return
    }

    setYearValue(prev => (prev ? prev.year(newDay.year()) : newDay))
    setMonthValue(prev => (prev ? prev.year(newDay.year()).month(newDay.month()) : newDay))
  }, [])

  return (
    <React.Fragment>
      {/* <SelectField
        style={{ width: 210 }}
        options={props.options}
        defaultValue={props.defaultValue}
      /> */}
      <DatePickerField
        pickerMode="year"
        placeholder="Выберите год"
        value={yearValue}
        onChange={handleChangeYearDatePicker}
      />

      <DatePickerField
        pickerMode="month"
        placeholder="Выберите месяц"
        value={monthValue}
        onChange={handleChangeMonthDatePicker}
      />

      <DatePickerField
        placeholder="Выберите день"
        value={dayValue}
        onChange={handleChangeDayDatePicker}
      />
    </React.Fragment>
  )
}
