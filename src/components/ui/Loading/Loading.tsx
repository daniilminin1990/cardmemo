import s from './loading.module.scss'

import img from '../../../assets/img/Loading.svg'

// type LoadingProps = {
//   isShow: boolean
// }
const Loading = () => {
  return (
    <div className={s.loader}>
      <img alt={''} src={img} />
    </div>
  )
}

export default Loading
