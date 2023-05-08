import React, { FunctionComponent } from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'
import RequireAuth from '../hocs/RequireAuth'
import RequireUnAuth from '../hocs/RequireUnAuth'

export const Index = () => {
  return (
    <Routes>
      {routes.map(route => {
        const { loader: _, withAuth, ...rest } = route

        let AuthComponent: FunctionComponent | null = null

        switch (withAuth) {
          case 'require':
            AuthComponent = RequireAuth
            break
          case 'redirect':
            AuthComponent = RequireUnAuth
        }

        if (AuthComponent) {
          return (
            <Route key={rest.path} element={<AuthComponent />}>
              <Route {...rest} />
            </Route>
          )
        }

        return <Route key={rest.path} {...rest} />
      })}
    </Routes>
  )
}
