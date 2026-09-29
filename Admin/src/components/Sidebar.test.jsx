import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from '@jest/globals'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

afterEach(() => {
  cleanup()
})

test('renders links to the Admin sections', () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: 'Add Items' })).toHaveAttribute('href', '/add')
  expect(screen.getByRole('link', { name: 'List Items' })).toHaveAttribute('href', '/list')
  expect(screen.getByRole('link', { name: 'Orders' })).toHaveAttribute('href', '/orders')
})