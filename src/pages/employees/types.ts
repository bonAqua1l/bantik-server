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
    }
    export interface FireEmployeeForm {
        termination_reason: string,
        termination_order_date: string | Dayjs,
        termination_date: string | Dayjs,
    }
}
