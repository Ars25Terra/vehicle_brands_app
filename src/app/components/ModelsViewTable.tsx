import React from 'react'
import TableComponent from "./TableComponent";
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { fetchAllModelsByMakeId } from "../service/ReuqestUtils";
import { IModel } from "../models/Models";
import { mapExternalModel, sortNamed } from "../Utils";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
  /**
   * List of Make ids to request models
   */
  makeIdList: number[]
}

/**
 * Car Models Table Columns
 */
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
]

/**
 * Car Models Table Component
 */
const ModelsViewTable = (props: IProps): JSX.Element => {

  /**
   * Preparing promises for all makes id to be sent into useQuery
   */
  const promiseAll = props.makeIdList.map((id) => fetchAllModelsByMakeId(id))
  /**
   * Get models for Makes
   */
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

  /**
   * Show spinner while loading
   */
  if (results.isLoading) {
    return <div style={{display: 'flex', alignSelf: 'center'}}>
      <CircularProgress/>
    </div>
  }

  return <div>
    <TableComponent columns={columns} rows={getRows()} pageSize={10} sorting={sortNamed}/>
  </div>
}

export default ModelsViewTable
