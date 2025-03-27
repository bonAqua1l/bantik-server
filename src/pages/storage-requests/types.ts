import { ProductsItemsTypes } from '../products/items/types'

export namespace ProductsStorageRequestTypes {
  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }
  export interface Table {
    id: number
    files: string[]
    status: string
    act: string
    supplier: string
    message: string | null
    barcode: string | null
    warehouse: number
    date: number
    items: {product: ProductsItemsTypes.Item}[]
    project: number
    responsible: string
    total_quantity: number
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
