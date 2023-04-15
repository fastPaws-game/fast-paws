import React from 'react'
import { Route, Routes } from 'react-router'
import { Routes as routes } from './constants/routes'
import { useRedirect } from './hooks/useRedirect'

const LazyAuth = React.lazy(() => import('./pages/AuthPage'))
const LazyReg = React.lazy(() => import('./pages/RegistrationPage'))
const LazyMain = React.lazy(() => import('./pages/MainPage'))
const LazySettings = React.lazy(() => import('./pages/ProfilePage'))
const LazyForum = React.lazy(() => import('./pages/ForumPage'))
const LazyTopic = React.lazy(() => import('./pages/TopicPage'))
const LazyBoard = React.lazy(() => import('./pages/LeaderBoardPage'))
const LazyError = React.lazy(() => import('./pages/NotFoundPage'))
const LazyGame = React.lazy(() => import('./pages/GamePage'))

export const Router = () => {
  useRedirect()
  return (
    <Routes>
      <Route path={routes.HOME} errorElement={<LazyError />} element={<LazyAuth />} />
      <Route path={routes.SIGNUP} element={<LazyReg />} />
      <Route path={routes.MAIN} element={<LazyMain />} />
      <Route path={routes.SETTINGS} element={<LazySettings />} />
      <Route path={routes.FORUM} element={<LazyForum />} />
      <Route path={`${routes.FORUM}/:forumId`} element={<LazyTopic />} />
      <Route path={routes.GAME} element={<LazyGame />} />
      <Route path={routes.LEADERBOARD} element={<LazyBoard />} />
      <Route path={routes.NOT_FOUND} element={<LazyError />} />
    </Routes>
  )
}
