export type ResponseType<T> = {
    description: string,
    isSuccess: boolean,
    status: 'success' | 'error',
    statusCode: number,
    data?: T
}
