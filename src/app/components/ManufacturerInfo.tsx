import React from "react";
import { useQuery } from "react-query";
import ManufacturerCard from "./ManufacturerCard";
import { mapExternalManufacturer } from "../Utils";
import { fetchAllMakesListByManufacturerId, fetchManufacturer } from "../service/RequestUtils";
import ModelsViewTable from "./ModelsViewTable";
import {CircularProgress} from "@mui/material/";
import './../styles/_manufacturerInfo.scss'
import ButtonComponent from "./ButtonComponent";

interface IProps {
  /**
   * Manufacturer Id
   */
  companyId: number
}

interface IActions {
  /**
   * On click 'Back' Button Event
   */
  onBackButtonClick: () => void
}

/**
 * Component to display Manufacturer Info with Models Table
 */
const ManufacturerInfo = (props: IProps & IActions): JSX.Element => {

  /**
   * Get Manufacturer Data
   */
  const manufacturerQueryData = useQuery(['company_cache', props.companyId], () => fetchManufacturer(props.companyId), {})
  /**
   * Get Manufacturer Makes
   */
  const makesQueryData = useQuery(['makes_cache', props.companyId], () => fetchAllMakesListByManufacturerId(props.companyId), {})

  return <div className={'manufacturer-info'}>
    {manufacturerQueryData?.isLoading && <div style={{display: 'flex', alignSelf: 'center'}}>
      <CircularProgress/>
    </div>}
    {manufacturerQueryData.data?.Results[0] && <div className={'panel'}>
      <ManufacturerCard company={mapExternalManufacturer(manufacturerQueryData.data?.Results[0])}/>
      <ButtonComponent caption={'Back'} onClick={props.onBackButtonClick}/>
    </div>}
    {makesQueryData?.isLoading && <div style={{display: 'flex', alignSelf: 'center'}}>
      <CircularProgress/>
    </div>}
    {makesQueryData?.data && <ModelsViewTable makeIdList={makesQueryData?.data.Results.map(res => res.Make_ID)}/>}
  </div>
}

export default ManufacturerInfo
