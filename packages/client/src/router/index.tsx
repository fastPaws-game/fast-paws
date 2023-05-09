import React from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'
import { useRedirect } from '../hooks/useRedirect'

export const Router = () => {
  useRedirect()
  return (
    <Routes>
      {routes.map(route => {
        const { loader: _, ...rest } = route
        return <Route key={rest.path} {...rest} />
      })}
    </Routes>
  )
}
