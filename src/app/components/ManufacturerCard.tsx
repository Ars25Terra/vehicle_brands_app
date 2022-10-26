import React from 'react'
import { IManufacturer } from "../models/Models";
import { getMakeLogoUri } from "../Utils";
import './../styles/_manufacturerCard.scss'

interface IProps {
  company: IManufacturer
}

const ManufacturerCard = (props: IProps): JSX.Element => {
  const logoUri = getMakeLogoUri(props.company.commonName)
  return <div className={'manufacturer-card'}>
    <div className={'header'}>
      {logoUri && <img loading="lazy"
           style={{width: '100px'}}
           alt={'Logo not found'}
           src={logoUri}/>}
      <h1>{props.company.name}</h1>
    </div>
    <h2>{props.company.country}</h2>
  </div>
}

export default ManufacturerCard
