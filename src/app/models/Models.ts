/**
 * Interface that allows it implementations to have ID
 */
export interface IIIdentifiable {
  id: number
}

/**
 * Implementations must have 'name' field
 */
export interface INamed extends IIIdentifiable {
  name: string
}

/**
 * Model for Manufacturer of the Make
 */
export interface IManufacturer extends INamed {
  commonName: string
  country: string
}

/**
 * Model for External Manufacturer, that is received from API
 */
export interface IExternalCompany {
  Country:	string
  Mfr_CommonName: string
  Mfr_ID: number
  Mfr_Name: string
}

/**
 * Generic List Response
 */
export interface IListResponse<T> {
  data: {
    Results: T
  }
}

/**
 * Model for External Make, that that is received from API
 */
export interface IExternalMake {
  Make_ID:	number
  Make_Name:	string
  Mfr_Name:	string
}

/**
 * Model for External Car Model, that that is received from API
 */
export interface IExternalModel {
  Make_ID: number
  Make_Name: string
  Model_ID: number
  Model_Name: string
}

/**
 * Car Model
 */
export interface IModel extends INamed {
  makeName: string
}
