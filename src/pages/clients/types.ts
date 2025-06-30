
export namespace ClientsTypes {
  export interface Item {
    id: number;
    name: string;
    phone: string;
    created_at: string;
    visits_count: number;
    total_sum: number;
  }

  export interface ItemResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Item[];
  }

  export interface ItemForm {
    name: string
    phone: string
  }
}
