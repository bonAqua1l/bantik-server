export namespace ProductsItemsTypes {
  export interface Item {
    slug?: string
    title: string
    price: string
    color?: Color[]
    first_image?: {
      id: number,
      image: string | null
    }
    expiration_date?: string
    characteristics?: string
    barcode?: string
    warehouse?: number
  }

  export interface Table {
    slug?: string
    title: string
    price: string
    color?: Color[]
    image?: string | null
    expiration_date?: string
    characteristics?: string
    barcode?: string
    warehouse?: number
    purchase_price?: number
    quantity?: number
  }

  export interface Form {
    title: string
    price: string
    color: Color
    images?: string
    expiration_date?: string
    characteristics?: string
    warehouse?: number
  }

  export interface FormEdit {
    images: string
    title: string
    price: string
    description?: string | null
    expiration_date?: string | null
    characteristics?: string | null
    color?: number[]
  }

  export interface DelteImages {
    image_ids: number[]
  }

  export interface Color {
    id: number;
    name: string;
    hash_code: string;
    images: Images[]
  }

  export interface Images {
    id: number
    image: string
    images: Images[]
  }

  export interface Images {
    id: number
    image: string
  }

  export interface ItemDetail {
    slug: string;
    title: string;
    price: string;
    colors: Color[];
    description: string;
    expiration_date: string;
    characteristics: string;
    first_image?: {
      id: number,
      image: string | null
    }
    images: Images[]
    barcode: string;
    warehouse: number;
  }

  export interface ItemCategories {
    slug: string;
    title: string;
  }

  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Item[];
  }

  export interface IncomingTable {
    product: ProductsItemsTypes.Item
    product_title: string,
    quantity: number,
    purchase_price: string,
    total_price: number
  }
}
