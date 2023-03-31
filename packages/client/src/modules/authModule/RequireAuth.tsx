import { FC, PropsWithChildren } from 'react'
import { useLocation, Navigate } from "react-router";

const RequireAuth: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const location = useLocation();
  const isAuth = false;// нужно брать из стора

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
    </>
  )
}

export default RequireAuth
