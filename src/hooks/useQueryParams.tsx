import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const useQueryParams = () => {
  const [getSearchParams] = useSearchParams()
  const searchParams = useMemo(() => {
    return Object.fromEntries([...getSearchParams])
  }, [getSearchParams])

  return searchParams
}

export default useQueryParams
