import CarLogos from '@avto-dev/vehicle-logotypes/src/vehicle-logotypes.json'
import { IExternalCompany, IExternalModel, IManufacturer, IModel, INamed } from "./models/Models";

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
export const mapExternalManufacturer = (company: IExternalCompany): IManufacturer => {
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

export const sortNamed = (a: INamed, b: INamed): number => {
  if (a.name === b.name) {
    return 0
  }
  return a.name < b.name ? -1 : 1
}


