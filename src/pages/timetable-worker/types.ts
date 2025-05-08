export namespace TimetableWorkerTypes {
  export interface Service {
    id: number;
    name: string;
    duration: number;
    price: string;
    image: string | null;
    is_long: boolean;
  }

  export interface Schedule {
    id: number;
    weekday: number;
    start_time: string;
    end_time: string;
    weekday_name: string;
    weekday_name_russian: string
  }

  export interface User {
    uuid: string;
    email: string;
    last_login: string;
    phone_number: string | null;
    avatar: string | null;
    date_joined: string;
    date_of_birth: string | null;
    first_name: string;
    last_name: string;
    surname: string | null;
    gender: string | null;
    about: string | null;
    citizenship: string | null;
    role: string;
    is_fired: boolean;
    termination_reason: string;
    termination_order_date: string | null;
    termination_date: string | null;
    is_employee: boolean;
    schedule_start: string;
    schedule_end: string;
    services: Service[];
    schedule: Schedule[];
  }
}
