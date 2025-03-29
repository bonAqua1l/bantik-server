'use client'

import React from 'react'

import { Timetable } from '..'

interface Props {
    timetable_id: number
}

export const View = ({ timetable_id }: Props) => {
  const {
    actions: {
    },
  } = Timetable.Hooks.View.use()

  console.log(timetable_id)

  return (
    <div className={'main'}>
      <h1>Hello</h1>
    </div>
  )
}
