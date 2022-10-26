import React from 'react'
import { IManufacturer } from "../models/Models";
import { getMakeLogoUri } from "../Utils";

interface IProps {
  company: IManufacturer
}

const ManufacturerCard = (props: IProps): JSX.Element => {
  return <div>
    <div>
      <h1>{props.company.name}</h1>
    </div>
    <div>
      <img loading="lazy" style={{width: '100px'}} alt={'Logo not found'} src={getMakeLogoUri(props.company.commonName) ?? ''}/>
    </div>
    <div>{props.company.country}</div>
  </div>
}

export default ManufacturerCard
