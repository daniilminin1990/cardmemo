import img from '../../../assets/img/Loading.svg'

type LoadingProps = {
  isShow: boolean
}
const Loading = (props: LoadingProps) => {
  const { isShow } = props

  return <div>{isShow && <img alt={''} src={img} />}</div>
}

export default Loading
