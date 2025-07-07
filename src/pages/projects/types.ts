export namespace ProjectsType {
    export interface AdditionalService {
        id: number;
        name: string;
        duration: number;
        price: string;
        image: string | null;
        is_long: boolean;
        is_additional: boolean;
        parent_service: {id: number, name: string}
    }

    export interface Service extends AdditionalService {
        additional_services: AdditionalService[]
    }

    export interface ServiceResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: Service[]
    }

    export interface Form {
        name: string;
        duration: number;
        price: string;
        image: File
        parent_service: number | null
        is_additional: boolean
    }

    export interface FormEdit {
        name: string;
        duration: number;
        price: string;
        image: File
    }

    export type ServiceDetail = Service
}
