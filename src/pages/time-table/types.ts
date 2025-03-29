export namespace TimetableTypes {
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
      }

    export interface Master {
        uuid: string;
        avatar: string | null;
        first_name: string;
        last_name: string;
        surname: string | null;
        email: string;
      }

    export interface Lead {
        id: number;
        client_name: string | null;
        phone: string | null;
        date_time: string;
        prepayment: string;
        is_confirmed: boolean;
        created_at: string;
        client: Client;
        service: Service;
        master: Master;
      }

    export interface Day {
        date: string;
        day: string;
        leads: Lead[];
      }

    export interface Item {
        days: Day[];
    }

    export interface ItemDetail {
      date: string;
      day: string;
      leads: Lead[];
  }

}
