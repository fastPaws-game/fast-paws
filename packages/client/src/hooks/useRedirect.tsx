import { useLocation } from 'react-router'

export const useRedirect = () => {
  const location = useLocation()
  console.log(location)
}
