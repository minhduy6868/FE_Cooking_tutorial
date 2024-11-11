export type BaseResponse<T> = {
  data: T
  status: number
  message: string
}
