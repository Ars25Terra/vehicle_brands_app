import React from 'react'
import { render, screen } from '@testing-library/react'
import ButtonComponent from './app/components/ButtonComponent'
import ManufacturerCard from './app/components/ManufacturerCard'
import { IIIdentifiable, IManufacturer } from './app/models/Models'
import TableComponent from './app/components/TableComponent'
import { GridColDef } from '@mui/x-data-grid'

test('Test: Button Props', () => {
  render(<ButtonComponent caption={'Test'} onClick={() => {}} />)
  const captionElement = screen.getByText(/Test/i)
  expect(captionElement).toBeInTheDocument()
})

test('Test: ManufacturerCard Props', () => {
  const testCompany: IManufacturer = {
    name: 'Volkswagen',
    country: 'Germany',
    id: 1,
    commonName: 'VW'
  }
  render(<ManufacturerCard company={testCompany} />)
  const nameElement = screen.getByText(/Volkswagen/i)
  const countryElement = screen.getByText(/Germany/i)
  expect(nameElement).toBeInTheDocument()
  expect(countryElement).toBeInTheDocument()
})

test('Test: Table Component Props', () => {
  const columns: GridColDef[] = [{ field: 'id', headerName: 'id' }]

  const rows: IIIdentifiable[] = [{ id: 1 }]

  const { container } = render(
    <TableComponent columns={columns} rows={rows} pageSize={10} />
  )
  expect(container).toHaveTextContent('id')
  expect(container).toHaveTextContent('1 of 1')
})
