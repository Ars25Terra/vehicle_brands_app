import React from "react";
import { useQuery } from "react-query";
import ManufacturerCard from "./ManufacturerCard";
import { mapExternalManufacturer } from "../Utils";
import { fetchAllMakesListByManufacturerId, fetchManufacturer } from "../service/ReuqestUtils";
import ModelsViewTable from "./ModelsViewTable";
import {CircularProgress} from "@mui/material/";
import './../styles/_manufacturerInfo.scss'
import ButtonComponent from "./ButtonComponent";

interface IProps {
  companyId: number
}

interface IActions {

}

const ManufacturerInfo = (props: IProps & IActions): JSX.Element => {

  const manufacturerQueryData = useQuery(['company_cache', props.companyId], () => fetchManufacturer(props.companyId), {})
  const makesQueryData = useQuery(['makes_cache', props.companyId], () => fetchAllMakesListByManufacturerId(props.companyId), {})

  return <div className={'manufacturer-info'}>
    {manufacturerQueryData?.isLoading && <div style={{display: 'flex', alignSelf: 'center'}}>
      <CircularProgress/>
    </div>}
    {manufacturerQueryData.data?.Results[0] && <div className={'panel'}>
      <ManufacturerCard company={mapExternalManufacturer(manufacturerQueryData.data?.Results[0])}/>
      <ButtonComponent caption={'Back'} onClick={() => {}}/>
    </div>}
    {makesQueryData?.isLoading && <div style={{display: 'flex', alignSelf: 'center'}}>
      <CircularProgress/>
    </div>}
    {makesQueryData?.data && <ModelsViewTable makeIdList={makesQueryData?.data.Results.map(res => res.Make_ID)}/>}
  </div>
}

export default ManufacturerInfo
