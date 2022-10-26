import React, { useState } from "react";
import { useQuery } from 'react-query'
import TableComponent from "./app/components/TableComponent";
import { IExternalCompany, IManufacturer } from "./app/models/Models";
import { GridColDef } from "@mui/x-data-grid";
import ManufacturerInfo from "./app/components/ManufacturerInfo";
import { mapExternalManufacturer, sortNamed } from "./app/Utils";
import { fetchAllManufacturerList } from "./app/service/ReuqestUtils";
import CircularProgress from '@mui/material/CircularProgress';
import './app/styles/_app.scss'

const columns: GridColDef[] = [
  {headerName: 'Id', width: 100, field: 'id'},
  {headerName: 'Name', width: 400, field: 'commonName'},
  {headerName: 'Country', width: 200, field: 'country'},
  {headerName: '', width: 300, field: 'button', disableColumnMenu: true, sortable: false, align: 'right'},
]

function App() {

  const { data, isError, isLoading } = useQuery('data_cache', fetchAllManufacturerList, {})
  const [currentCompanyId, setCurrentCompanyId] = useState<number | undefined>(undefined)

  if (isError) {
    return (
      <div>
        An Error occurred.
      </div>
    )
  }

  const getManufacturers = (): IManufacturer[] => {
    return data
      ? data.Results?.map((item: IExternalCompany) => {
      return mapExternalManufacturer(item)
    })
      : []
  }

  const handleTableRowButtonClick = (id: number) => {
    setCurrentCompanyId(id)
  }

  return (
    <div className="app">
      {isLoading && <CircularProgress/>}
      {!currentCompanyId &&!isLoading && <TableComponent
        rows={getManufacturers()}
        columns={columns}
        pageSize={10}
        sorting={sortNamed}
        onRowButtonClick={handleTableRowButtonClick}
      />}
      {currentCompanyId && <ManufacturerInfo companyId={currentCompanyId}/>}
    </div>
  )
}

export default App
