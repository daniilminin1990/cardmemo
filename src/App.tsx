import { Pagination } from '@/components/ui/Pagination/ui/Pagination'
import { Button } from '@/components/ui/button'

export function App() {
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
      <Pagination initPage={1} lastPage={lastPage} maxLength={maxLength} />
      <span>Показать </span>
      <div> ... тут Select ...</div>
      <span>на странице</span>
    </div>
  )
}
