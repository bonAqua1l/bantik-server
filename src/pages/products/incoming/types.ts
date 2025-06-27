
export namespace ProductsIncomingTypes {
  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }
  export interface Table {
    id: number,
    client_name: string,
    client: {
      name: string,
      phone: string
    }
    phone: string,
    date_time: string,
    prepayment: string,
    service: {
      name: string
      id: number
    },
    master: string
  }

  export interface SelectedItem {
    product: string
    product_title: string,
    quantity: number,
    purchase_price: string,
    total_price: number
  }

  export interface Clients {
    id: number
    phone: string
    name: string
  }
  export interface Form {
    client: any,
    client_name?: string
    phone: string
    date_time: string
    prepayment?: string
    services: number[]
    master: string
  }

  export interface AvailableDatesResponse {
  month: number
  year: number
  service_id: number
  available_dates: string[]
}

  export interface EmployeeSlotMaster {
    uuid: string
    name: string
    avatar: string | null
    available_slots: string[]
  }

  export interface EmployeeSlotsResponse {
    date: string
    service_id: string
    is_long_service: boolean
    masters: EmployeeSlotMaster[]
  }

  export interface  FormProduct {
    title: string
    price: string
    color: Color
    images?: string
    expiration_date?: string
    characteristics?: string
    warehouse?: number
  }
  export interface Color {
    id: number;
    name: string;
    hash_code: string;
  }

  export interface ProductItems {
    product: string,
    quantity: number,
    purchase_price: string
    product_title?: string
    product_image?: string
  }
  export interface Product {
    color: string
    image: string
    price: string
    purchase_price: string
    slug: string
    title: string
  }
  export interface Responsible {
    uuid: string,
    last_login: string,
    email: string,
    phone_number: string,
    avatar: string | null,
    date_joined: string,
    date_of_birth: string,
    first_name: string,
    last_name: string,
    surname: string | null,
    gender: string,
    citizenship: string | null,
    role: string,
    is_fired: boolean,
    termination_reason: string,
    termination_order_date: string | null,
    termination_date: string | null,
    is_employee: boolean,
    schedule_start: string,
    schedule_end: string,
    services: any[]
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

  export interface Item {
      id: number,
      client_name: string,
      phone: string,
      date_time: string,
      prepayment: string,
      is_confirmed: boolean,
      created_at: string,
      client: {
          id: number,
          phone: string,
          name: string
      },
      services: Service[]
      master: {
          uuid: string,
          avatar: string | null,
          first_name: string,
          last_name: string,
          surname: string | null,
          email: string
      }
  }
  export interface Files {
    file: string
    name: string
  }

  export interface EditForm {
    files: File
    quantity: string
    purchase_price: string
    supplier: string
    message: string
    project: number
    responsible: string | undefined
    act: string
    total_cost: number
    items: ProductItems[]
    delete_items: string[]
    update_items: {
      product: string
      quantity: number
      purchase_price: number
    }[]
    delete_files: number[],
  }
}
