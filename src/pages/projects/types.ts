export namespace ProjectsType {
    export interface Service {
        id: number;
        name: string;
        duration: number;
        price: string;
        image: string
      }

    export interface ServiceResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: Service[];
    }
    export interface Form {
        name: string;
        duration: number;
        price: string;
        image: string
    }

    export interface FormEdit {
        name: string;
        duration: number;
        price: string;
        image: string
    }
    export interface ServiceDetail {
        id: number;
        name: string;
        duration: number;
        price: string;
        image: string
    }
}
