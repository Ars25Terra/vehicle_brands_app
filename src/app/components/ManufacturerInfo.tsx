import React from "react";
import { useQuery } from "react-query";
import ManufacturerCard from "./ManufacturerCard";
import { mapExternalManufacturer } from "../Utils";
import { fetchAllMakesListByManufacturerId, fetchManufacturer } from "../service/ReuqestUtils";
import ModelsView from "./ModelsView";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
  companyId: number
}

interface IActions {

}

const ManufacturerInfo = (props: IProps & IActions): JSX.Element => {

  const manufacturerQueryData = useQuery(['company_cache', props.companyId], () => fetchManufacturer(props.companyId), {})
  const makesQueryData = useQuery(['makes_cache', props.companyId], () => fetchAllMakesListByManufacturerId(props.companyId), {})

  return <div>
    {manufacturerQueryData?.isLoading && <div>
      <CircularProgress/>
    </div>}
    {manufacturerQueryData.data?.Results[0] &&
      <ManufacturerCard company={mapExternalManufacturer(manufacturerQueryData.data?.Results[0])}/>}
    {makesQueryData?.isLoading && <div>
      <CircularProgress/>
    </div>}
    {makesQueryData?.data && <ModelsView makeIdList={makesQueryData?.data.Results.map(res => res.Make_ID)}/>}
  </div>
}

export default ManufacturerInfo
