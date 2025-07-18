import { Dayjs } from 'dayjs'

export namespace EmployeeTypes {
  export interface Item {
    uuid: string
    password: string
    last_login: string
    is_superuser: boolean
    email: string
    avatar: string | null
    first_name: string
    last_name: string | null
    surname: string | null
    role: string
    is_active: boolean
    is_staff: boolean
    groups: any[]
    user_permissions: string[]
    is_employee: boolean
    services: Services[]
    schedule: Schedule[]
  }
  export interface Services {
    id: number
    name: string
    duration: number
    price: string
    image: string | null
    is_long: boolean
  }
  export interface FireEmployeeForm {
    termination_reason: string
    termination_order_date: string | Dayjs
    termination_date: string | Dayjs
  }
  export interface Schedule {
    time?: any
    id: number | any
    weekday: number
    start_time: string
    end_time: string
    weekday_name: string
  }
  export interface ScheduleCreate {
    weekday: string
    start_time: string
    end_time: string
  }
  export interface UpdateSchedule {
    id: string
    start_time: string
  }
  export interface SchedulePayload {
    schedules: ScheduleCreate[]
    delete_schedules: number[]
    update_schedules: UpdateSchedule[]
  }
}
