import { IExternalCompany, IExternalMake, IExternalModel, IListResponse } from "../models/Models";
import { getRequestService } from "../Utils";

/**
 * Context path to API
 */
export const API_CONTEXT: string = 'https://vpic.nhtsa.dot.gov/api/vehicles'

/**
 * Get Manufacturers by ID
 */
export const fetchManufacturer = async (id: number) => {
  return doRequest<IExternalCompany[]>({ url: `${API_CONTEXT}/getmanufacturerdetails/${id}?format=json` })
}

/**
 * Get All Manufacturers List
 */
export const fetchAllManufacturerList = async () => {
  return doRequest<IExternalCompany[]>({ url: `${API_CONTEXT}/getallmanufacturers?format=json` })
}

/**
 * Get all Makes by Manufacturer's ID
 */
export const fetchAllMakesListByManufacturerId = async (id: number) => {
  return doRequest<IExternalMake[]>({ url: `${API_CONTEXT}/GetMakeForManufacturer/${id}?format=json` }, id)
}

/**
 * Get all Makes by Manufacturer's ID
 */
export const fetchAllModelsByMakeId = async (id: number) => {
  return doRequest<IExternalModel[]>({ url: `${API_CONTEXT}/GetModelsForMakeId/${id}?format=json` }, id)
}

/**
 * Method to perform Get Requests
 */
const doRequest = async <T>(requestParams: {url: string}, id?: number) => {
  const { data }: IListResponse<T> = await getRequestService().get(
    requestParams
  )
  return data
}
