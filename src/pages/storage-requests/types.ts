
export namespace ProductsStorageRequestTypes {

  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }
  export interface Client {
    id: number
    phone: string
    name: string
  }

  export interface Service {
    id: number
    name: string
    duration: number
    price: string
  }

  export interface Master {
    uuid: string
    avatar: string | null
    first_name: string
    last_name: string
    surname: string | null
    email: string
  }

  export interface Table {
    id: number
    client: Client | null
    client_name: string
    phone: string
    date_time: string
    prepayment: string
    is_confirmed: boolean
    created_at: string
    service: Service
    master: Master
  }
  export interface Form {
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
  }

  export interface FormProduct {
    title: string
    price: string
    color: Color
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
    product_title: string
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
    email: string
    first_name: string
    last_name: string
    surname: string
    uuid: string
    image: string
  }
  export interface Project {
    id: number
    image: string
    title: string
    description: string
    color: string
    warehouse: number
  }

  export interface Item {
    id: number;
    files: any[];
    quantity: number;
    purchase_price?: string | null;
    status?: string | null;
    act?: string | null;
    date: string;
    supplier?: string | null;
    message?: string | null;
    barcode?: string | null;
    product?: Product;
    project?: number | null;
    responsible?: string | null;
  }
}
