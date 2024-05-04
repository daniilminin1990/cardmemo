import { PaginationWithSelectDemo } from '@/components/ui/Pagination/PaginationWithSelectDemo'
import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Button>123 </Button>
      <PaginationWithSelectDemo />
    </div>
  )
}
