import CarLogos from '@avto-dev/vehicle-logotypes/src/vehicle-logotypes.json'
import {
  IExternalCompany,
  IExternalModel,
  IManufacturer,
  IModel,
  INamed
} from './models/Models'
import { IRequestService } from './service/IRequestService'
import AxiosWebService from './service/AxiosWebService'

/**
 * Get Make Logo if possible
 */
export const getMakeLogoUri = (makeName: string): string => {
  let name = makeName.replaceAll(' ', '-').toLowerCase()
  return JSON.parse(JSON.stringify(CarLogos))[name]?.logotype?.uri
}

/**
 * Map External Manufacturer object to local object
 */
export const mapExternalManufacturer = (
  company: IExternalCompany
): IManufacturer => {
  return {
    name: company.Mfr_Name,
    country: company.Country,
    commonName: company.Mfr_CommonName ?? company.Mfr_Name,
    id: company.Mfr_ID
  }
}

/**
 * Map External Car Model object to local object
 */
export const mapExternalModel = (model: IExternalModel): IModel => {
  return {
    id: model.Model_ID,
    name: model.Model_Name,
    makeName: model.Make_Name
  }
}

/**
 * Method to sort objects, implementing INamed
 */
export const sortNamed = (a: INamed, b: INamed): number => {
  if (a.name === b.name) {
    return 0
  }
  return a.name < b.name ? -1 : 1
}

/**
 * Get Current Implementation of external API Request Service
 */
export const getRequestService = (): IRequestService<any> => AxiosWebService()
