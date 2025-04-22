export interface PageResponse<T> {
    content: T[],
    pageNumber: number,
    pageSize: number,
    totalElement: number,
    totalPages: number,
    numberOfElements:number,
    last: boolean
}
