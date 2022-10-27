/**
 * Model for GET request
 */
export interface IGetRequest<T> {
  /**
   * URL to external API
   */
  url: string
  /**
   * Configuration generic
   */
  config?: T
}

/**
 * Web Service Client Interface
 */
export interface IRequestService<T> {
  /** Get Request */
  get: (data: IGetRequest<T>) => Promise<any>
}
