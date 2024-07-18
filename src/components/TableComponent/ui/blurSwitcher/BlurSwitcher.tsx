import Eye from '@/assets/icons/svg/Eye'
import CloseEye from '@/assets/icons/svg/EyeOff'
import Typography from '@/components/ui/Typography/Typography'

import s from '@/components/TableComponent/ui/TableComponent.module.scss'

type Props = {
  blur: boolean
  onClickEyeHandler: (e: MouseEvent) => void
}

const BlurSwitcher = (props: Props) => {
  const { blur, onClickEyeHandler } = props

  return blur ? (
    <Typography as={'button'} className={s.boxEye} onClick={onClickEyeHandler}>
      <CloseEye height={'100%'} width={20} />
    </Typography>
  ) : (
    <Typography as={'button'} className={s.boxEye} onClick={onClickEyeHandler}>
      <Eye height={'100%'} width={20} />
    </Typography>
  )
}

export default BlurSwitcher
