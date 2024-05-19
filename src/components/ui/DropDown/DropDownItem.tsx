import Typography from '@/components/ui/Typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

type DropDownItemProps = {
  icon: string
  text: string
}

const DropDownItem = (props: DropDownItemProps) => {
  const { icon, text } = props

  return (
    <div className={'DropdownMenuItemBox'}>
      <DropdownMenu.Item className={'DropdownMenuItem'}>
        <img alt={''} src={icon} />
        <Typography className={'dropdownText'} variant={'caption'}>
          {text}
        </Typography>
      </DropdownMenu.Item>
    </div>
  )
}

export default DropDownItem
