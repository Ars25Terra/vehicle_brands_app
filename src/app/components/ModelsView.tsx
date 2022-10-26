import React from 'react'
import TableComponent from "./TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { fetchAllModelsByMakeId } from "../service/ReuqestUtils";
import { IModel } from "../models/Models";
import { mapExternalModel, sortNamed } from "../Utils";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
  makeIdList: number[]
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 200
  },
  {
    field: "name",
    headerName: "Model Name",
    width: 600
  },
  {
    field: "makeName",
    headerName: "Make Name",
    width: 400
  }
];

const ModelsView = (props: IProps): JSX.Element => {

  /**
   * Preparing promises for all makes id to be sent into useQuery
   */
  const promiseAll = props.makeIdList.map((id) => fetchAllModelsByMakeId(id))
  const results = useQuery(['makes_cache', props.makeIdList], () => Promise.all(promiseAll))

  /**
   * Get Table Rows from query
   */
  const getRows = (): IModel[] => {
    const models: IModel[] = []
    results.data?.forEach(obj => {
      obj?.Results?.forEach(res => { models.push(mapExternalModel(res)) })
    })
    return models
  }

  if (results.isLoading) {
    return <div>
      <CircularProgress/>
    </div>
  }

  return <div>
    <TableComponent columns={columns} rows={getRows()} pageSize={10} sorting={sortNamed}/>
  </div>
}

export default ModelsView
