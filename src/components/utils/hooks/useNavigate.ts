import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()

  const goTo = (path: string) => navigate(path)
  const goBack = () => navigate(-1)
  const goForward = () => navigate(1)

  return { goBack, goForward, goTo }
}
