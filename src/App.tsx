import {PaginationWithSelectDemo} from '@/components/ui/Pagination/PaginationWithSelectDemo'
import {Button} from '@/components/ui/button'
import LoginForm from "@/components/auth/sign-up/Sign-up";

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
        <LoginForm/>
    </div>
  )
}
