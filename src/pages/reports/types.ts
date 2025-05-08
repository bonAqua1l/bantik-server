export namespace ReportsTypes {
    export interface Leads {
        total_bookings: number,
        days_in_period: number,
        average_bookings_per_day: number
    }
    export interface Specials {
        total: number,
        approved: number,
        rejected: number,
        approval_rate_percent: number,
        rejection_rate_percent: number
    }

    export interface FinanciaPeriod {
        start_date: string;
        end_date: string;
        type: string;
    }

    export interface FinanciaDataItem {
        date: string;
        total_amount: number;
    }

    export interface FinancialReportItem {
        period: FinanciaPeriod;
        group_by: string;
        data: FinanciaDataItem[];
    }

    export interface ClientsPeriod {
        start_date: string;
        end_date: string;
        type: string;
    }

    export interface ClientsData {
        new_clients: number;
        returning_clients: number;
    }

    export interface ClientsItem {
        period: ClientsPeriod;
        data: ClientsData;
    }

    export interface LeadItem {
        period: {
            start_date: string;
            end_date: string;
            type: string;
        };
        data: {
            confirmed_leads: number;
            unconfirmed_leads: number;
        };
    }

    export interface TotalStatsItem {
        total_clients: number
    }

    export interface MasterList {
        uuid: string;
        full_name: string;
        avatar: string;
        total_clients: number;
        total_earnings: number;
        total_leads: number;
    }

}
