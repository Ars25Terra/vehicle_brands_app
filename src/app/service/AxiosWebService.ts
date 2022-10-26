import axios, { AxiosRequestConfig } from 'axios'
import { IRequestService } from './IRequestService'

/**
 * Request Service Axios Implementation
 */
const AxiosWebService = (): IRequestService<AxiosRequestConfig> => ({
  get: async (request) => axios.get(request.url, request.config),
})

export default AxiosWebService
