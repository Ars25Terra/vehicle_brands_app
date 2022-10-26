import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IIIdentifiable } from "../models/Models";

interface IProps {
  columns: GridColDef[];
  title?: string;
  rows: IIIdentifiable[] | undefined;
  pageSize: number;
  sorting?: (a: any, b: any) => number
}

interface IActions {
  onRowButtonClick?: (index: number) => void
}

const TableComponent = (props: IProps & IActions): JSX.Element => {
  const columnsWithButtons = (): GridColDef[] => {
    return props.columns.map((col) => {
      if (col.field === 'button') {
        return {...col,
          renderCell: (params) => <button onClick={() => props.onRowButtonClick && props.onRowButtonClick(params.row?.id)}>
            Test</button> }
      }
      return col
    })
  }

  return (<div style={{ display: 'flex', width: '100%'}}>
      <DataGrid
      rows={props.sorting ? props.rows?.sort(props.sorting) ?? [] : props.rows ?? []}
      columns={columnsWithButtons()}
      autoHeight={true}
      disableExtendRowFullWidth={false}
      pageSize={props.pageSize}
      checkboxSelection={false}
      disableColumnSelector={true}
      disableSelectionOnClick={true}
    />
  </div>);
};

export default TableComponent;
