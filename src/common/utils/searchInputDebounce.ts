import { ChangeEvent } from 'react'
type Props = {
  debounceTimer: { current: NodeJS.Timeout | null }
  e: ChangeEvent<HTMLInputElement>
  name: string
  searchParams: URLSearchParams
  setSearchParams: (searchParams: URLSearchParams) => void
}
export const searchInputDebounce = ({
  debounceTimer,
  e,
  name,
  searchParams,
  setSearchParams,
}: Props) => {
  const value = e.currentTarget.value

  clearTimeout(debounceTimer.current as NodeJS.Timeout)
  debounceTimer.current = setTimeout(() => {
    if (value === '') {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }
    setSearchParams(searchParams)
  }, 500)
}
