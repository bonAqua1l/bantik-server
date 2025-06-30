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

  export interface ItemRecord {
  id: number;
  client_name: string;
  phone: string;
  date_time: string;
  prepayment: string;
  is_confirmed: boolean | null;
  date: string | null;
  reminder_minutes: number;
  created_at: string;
  client: Client;
  services: Service[];
  master: Master;
  weekday: number
}

export interface Client {
  id: number;
  phone: string;
  name: string;
  created_at: string;
  visits_count: number;
  total_sum: number;
}

    export interface AdditionalService {
        id: number;
        name: string;
        duration: number;
        price: string;
        image: string | null;
        is_long: boolean;
        is_additional: boolean;
        parent_service: number | null
    }

    export interface Service extends AdditionalService {
        additional_services: AdditionalService[]
    }

export interface Master {
  uuid: string;
  avatar: string | null;
  first_name: string;
  last_name: string;
  surname: string | null;
  email: string;
  about: string | null;
}

}
