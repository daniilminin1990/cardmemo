import { Button } from '@/common/components/button'
import Typography from '@/common/components/typography/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type DropDownItemProps = {
  icon?: string
  text: string
}

const DropDownItem = (props: DropDownItemProps) => {
  const { icon, text } = props

  return (
    <div className={'DropdownMenuItemBox'}>
      <DropdownMenu.Item className={'DropdownMenuItem'}>
        <Button as={'a'} className={'btn'}>
          <img alt={''} src={icon} />
          <Typography className={'dropdownText'} variant={'caption'}>
            {text}
          </Typography>
        </Button>
      </DropdownMenu.Item>
    </div>
  )
}

export default DropDownItem
