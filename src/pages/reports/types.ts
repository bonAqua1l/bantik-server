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
}
