import { useState } from 'react'

function usePagination(listItem: [], itemsPerPage: number) {
  const [itemOffset, setItemOffset] = useState<number>(0)
  const endOffset = itemOffset + itemsPerPage
  const currentData = listItem.slice(itemOffset, endOffset)
  const pageSize = Math.ceil(listItem.length / itemsPerPage)

  return { itemsPerPage, currentData, pageSize, setItemOffset }
}

export default usePagination
