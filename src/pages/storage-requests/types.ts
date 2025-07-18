
export namespace ProductsStorageRequestTypes {
  export interface Client {
    id: number;
    phone: string;
    name: string;
  }

  export interface Service {
    id: number;
    name: string;
    duration: number;
    price: string;
    additional_services: AdditionService[];
    is_additional: boolean
  }

  export interface AdditionService{
    id: number;
    name: string;
    duration: number;
    price: string;
    is_additional: boolean
    parent_service: number
  }

  export interface Master {
    uuid: string;
    avatar: string | null;
    first_name: string;
    last_name: string;
    surname: string | null;
    email: string;
  }

  export interface Table {
    id: number;
    client_name: string | null;
    phone: string | null;
    date_time: string;
    prepayment: string;
    is_confirmed: boolean;
    created_at: string;
    client: Client;
    services: Service[];
    master: Master;
  }

  export interface AppointmentResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }

}
