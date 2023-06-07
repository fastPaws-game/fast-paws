import React from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'
import RequireUnAuth from '../hocs/RequireUnAuth'
import RequireAuth from '../hocs/RequireAuth'

export const Router = () => {
  return (
    <Routes>
      {routes.map(route => {
        const { loader: _, requireAuth, requireUnAuth, ...rest } = route

        if (requireAuth) {
          return (
            <Route key={rest.path} element={<RequireAuth />}>
              <Route {...rest} />
            </Route>
          )
        }
        if (requireUnAuth) {
          return (
            <Route key={rest.path} element={<RequireUnAuth />}>
              <Route {...rest} />
            </Route>
          )
        }
        return <Route key={rest.path} {...rest} />
      })}
    </Routes>
  )
}
