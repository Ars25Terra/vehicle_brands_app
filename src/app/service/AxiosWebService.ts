import axios, { AxiosRequestConfig } from 'axios'
import { IWebService } from './IWebService'

/**
 * Web Service Client Axios Implementation
 */
const AxiosWebService = (): IWebService<AxiosRequestConfig> => ({
  get: async (request) => axios.get(request.url, request.config),
})

export default AxiosWebService
