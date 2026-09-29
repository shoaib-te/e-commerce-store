function ThemeToggle({ theme, onToggle }) {
  const targetTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type='button'
      onClick={onToggle}
      className='rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100'
      aria-label={`Switch to ${targetTheme} mode`}
      title={`Switch to ${targetTheme} mode`}
    >
      {targetTheme === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeToggle