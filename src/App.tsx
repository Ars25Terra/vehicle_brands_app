import React, { useState } from "react";
import { useQuery } from 'react-query'
import TableComponent from "./app/components/TableComponent";
import { IExternalCompany, IManufacturer } from "./app/models/Models";
import { GridColDef } from "@mui/x-data-grid";
import ManufacturerInfo from "./app/components/ManufacturerInfo";
import { mapExternalManufacturer, sortNamed } from "./app/Utils";
import { fetchAllManufacturerList } from "./app/service/RequestUtils";
import CircularProgress from '@mui/material/CircularProgress';
import './app/styles/_app.scss'

/**
 * Static Columns List for Manufacturers Table
 */
const columns: GridColDef[] = [
  {headerName: 'Id', width: 100, field: 'id'},
  {headerName: 'Name', width: 400, field: 'commonName'},
  {headerName: 'Country', width: 200, field: 'country'},
  {headerName: '', width: 300, field: 'button', disableColumnMenu: true, sortable: false, align: 'right'},
]

/**
 * Main Application Component
 */
function App() {

  /**
   * Launch Manufacturers list request
   */
  const { data, isError, isLoading } = useQuery('data_cache', fetchAllManufacturerList, {})
  /**
   * Selected Company Id state
   */
  const [currentCompanyId, setCurrentCompanyId] = useState<number | undefined>(undefined)

  /** Show Error **/
  if (isError) {
    return (
      <div>
        An Error occurred.
      </div>
    )
  }

  /**
   * Clear Current Company Id and return to Companies Table
   */
  const handleManufacturerInfoBackButtonClick = () => {
    setCurrentCompanyId(undefined)
  }

  /**
   * Map External API response to local models for Table rows
   */
  const getManufacturers = (): IManufacturer[] => {
    return data
      ? data.Results?.map((item: IExternalCompany) => {
      return mapExternalManufacturer(item)
    })
      : []
  }

  /**
   * Set Company Id to View its info
   */
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
        title={'Vehicle Manufacturers'}
        sorting={sortNamed}
        onRowButtonClick={handleTableRowButtonClick}
      />}
      {currentCompanyId && <ManufacturerInfo companyId={currentCompanyId}
                                             onBackButtonClick={handleManufacturerInfoBackButtonClick}/>}
    </div>
  )
}

export default App
