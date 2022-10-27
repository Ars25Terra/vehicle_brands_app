import React from 'react'
import { render, screen } from '@testing-library/react'
import ButtonComponent from './app/components/ButtonComponent'
import ManufacturerCard from './app/components/ManufacturerCard'
import { IManufacturer } from './app/models/Models'

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
