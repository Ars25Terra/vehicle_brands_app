import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IIIdentifiable } from '../models/Models'
import ButtonComponent from './ButtonComponent'

interface IProps {
  /**
   * Columns of the Table
   */
  columns: GridColDef[]
  /**
   * Rows with Data
   */
  rows: IIIdentifiable[] | undefined
  /**
   * Rows per page
   */
  pageSize: number
  /**
   * Table Title
   */
  title?: string
  /**
   * Sorting function
   */
  sorting?: (a: any, b: any) => number
}

interface IActions {
  /**
   * Row Button Click Event
   */
  onRowButtonClick?: (index: number) => void
}

/**
 * Table Component
 */
const TableComponent = (props: IProps & IActions): JSX.Element => {
  const columnsWithButtons = (): GridColDef[] => {
    return props.columns.map((col) => {
      if (col.field === 'button') {
        return {
          ...col,
          renderCell: (params) => (
            <ButtonComponent
              caption={'Details'}
              onClick={() =>
                props.onRowButtonClick && props.onRowButtonClick(params.row?.id)
              }
            />
          )
        }
      }
      return col
    })
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      {props.title && <h3>{props.title}</h3>}
      <DataGrid
        rows={
          props.sorting
            ? props.rows?.sort(props.sorting) ?? []
            : props.rows ?? []
        }
        columns={columnsWithButtons()}
        autoHeight={true}
        disableExtendRowFullWidth={false}
        pageSize={props.pageSize}
        checkboxSelection={false}
        disableColumnSelector={true}
        disableSelectionOnClick={true}
      />
    </div>
  )
}

export default TableComponent
