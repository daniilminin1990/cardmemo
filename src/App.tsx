import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'

import icon from '../src/assets/icons/person.svg'

export function App() {
  return (
    <div>
      <Typography as={'h1'} variant={'caption'}>
        Typography-caption
      </Typography>
      <Typography as={'h1'} variant={'link2'}>
        Typography-link2
      </Typography>
      <Typography as={'h2'} variant={'error'}>
        Typography-error
      </Typography>
      <Typography as={'p'} variant={'link1'}>
        Typography-link1
      </Typography>
      <Typography as={'p'} variant={'subtitle1'}>
        Typography-subtitle1
      </Typography>
      <div style={{ marginTop: '80px' }}>Убрать "Eye" при нажитии на пустое место</div>
      <Input disabled={false} label={'Pochta'} placeholder={'Input'} type={'search'} />
      <Input disabled={false} label={'HZ'} placeholder={'Input'} type={'text'} />
      <Input disabled={false} label={'Mail'} placeholder={'Input'} type={'password'} />
      <Input
        disabled={false}
        error={'Error!'}
        label={'Input'}
        placeholder={'Input'}
        type={'search'}
      />
      <Input disabled={false} error={'Error!'} label={'123'} placeholder={'Input'} type={'text'} />
      <Input
        disabled={false}
        error={'Error!'}
        label={'Errooorrrr'}
        placeholder={'Input'}
        type={'password'}
      />
      <div style={{ display: 'flex' }}>
        <div>Не понятно как убрать сепоратор сверху когда type={'menu'} в Dropdown</div>
        <div style={{ marginRight: '20px', marginTop: '50px' }}>
          {/* ........................Не понятно как убрать сепоратор сверху................................*/}

          <DropdownMenuDemo type={'head'}>
            <DropDownItem icon={icon} text={'123'} />
            <DropDownItem icon={icon} text={'222'} />
            <DropDownItem icon={icon} text={'33'} />
            <DropDownItem icon={icon} text={'444'} />
          </DropdownMenuDemo>
        </div>
        <div style={{ marginBottom: '200px', marginTop: '50px' }}>
          <DropdownMenuDemo type={'menu'}>
            <DropDownItem icon={icon} text={'123'} />
            <DropDownItem icon={icon} text={'222'} />
            <DropDownItem icon={icon} text={'33'} />
            <DropDownItem icon={icon} text={'444'} />
          </DropdownMenuDemo>
        </div>
      </div>
    </div>
  )
}
