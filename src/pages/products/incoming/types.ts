import { ProductsItemsTypes } from '../items/types'

export namespace ProductsIncomingTypes {
  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }
  export interface Table {
    id: number
    files: Files[]
    status: string
    act: string
    document: string
    supplier: string
    message: string | null
    barcode: string | null
    warehouse: number
    date: number
    items: {
      product: ProductsItemsTypes.Item
      product_title: string,
      quantity: number,
      purchase_price: string,
      total_price: number
    }[]
    project: number
    responsible: string
    total_quantity: number
    total_price: string
  }

  export interface SelectedItem {
    product: string
    product_title: string,
    quantity: number,
    purchase_price: string,
    total_price: number
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
    id: number
    files: Files[]
    status: string
    act: string
    supplier: string
    message: string | null
    barcode: string | null
    warehouse: number
    date: number
    items: Items[]
    project: number
    responsible: Responsible
    total_quantity: number
    total_price: string
  }

  export interface Items {
    product: ProductsItemsTypes.Item
    product_title: string,
    quantity: number,
    purchase_price: string,
    total_price: number
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
