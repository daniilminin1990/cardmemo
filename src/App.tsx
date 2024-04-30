import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination/ui/pagination'

export function App() {
  // State for Pagination
  const [currenPage, setCurrentPage] = useState(1)
  const lastPage = 10
  const maxLength = 7 // It is the maximum elements for pagination boxes in pagination component

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button>123 </Button>
      <Pagination
        currentPage={currenPage}
        lastPage={lastPage}
        maxLength={maxLength}
        setCurrentPage={setCurrentPage}
      />
      <span>Показать </span>
      <div> ... тут Select ...</div>
      <span>на странице</span>
    </div>
  )
}
