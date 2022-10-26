/**
 * Web Service Client Interface
 */

export interface IGetRequest<T> {
  url: string,
  config?: T,
}

export interface IWebService<T> {
  get: (data: IGetRequest<T>) => Promise<any>,
}
