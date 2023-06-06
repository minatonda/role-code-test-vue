export interface ApiSwapiPaginationResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}