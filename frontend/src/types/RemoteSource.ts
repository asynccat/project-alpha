export default interface RemoteSource<T> {
  init: boolean
  isLoading: boolean
  error: string
  data: T
}