import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, jest, test } from '@jest/globals'
import { applyTheme, getInitialTheme } from './theme'
import ThemeToggle from './components/ThemeToggle'

afterEach(() => {
  cleanup()
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

test('theme toggle requests the opposite theme', () => {
  const onToggle = jest.fn()
  render(<ThemeToggle theme='light' onToggle={onToggle} />)

  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

  expect(onToggle).toHaveBeenCalledTimes(1)
})

test('theme preference is applied and restored from local storage', () => {
  applyTheme('dark')

  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(getInitialTheme()).toBe('dark')
})