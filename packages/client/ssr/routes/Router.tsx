import React from 'react'
import { Route, Routes } from 'react-router'
import { Routes as PATH } from '../../src/constants/routes'
import RequireAuth from '../../src/hocs/RequireAuth'
import RequireUnAuth from '../../src/hocs/RequireUnAuth'
// import { useRedirect } from '../../src/hooks/useRedirect'

const LazyAuth = React.lazy(() => import('../../src/pages/AuthPage'))
const LazyReg = React.lazy(() => import('../../src/pages/RegistrationPage'))
const LazyMain = React.lazy(() => import('../../src/pages/MainPage'))
const LazySettings = React.lazy(() => import('../../src/pages/ProfilePage'))
const LazyForum = React.lazy(() => import('../../src/pages/ForumPage'))
const LazyTopic = React.lazy(() => import('../../src/pages/TopicPage'))
const LazyBoard = React.lazy(() => import('../../src/pages/LeaderBoardPage'))
const LazyError = React.lazy(() => import('../../src/pages/NotFoundPage'))
const LazyGame = React.lazy(() => import('../../src/pages/GameLoaderPage'))

const LazyMe = React.lazy(() => import('../pages/Me'))

export const Router = () => {
  // useRedirect()

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path={PATH.SETTINGS} element={<LazySettings />} />
        <Route path={PATH.FORUM} element={<LazyForum />} />
        <Route path={`${PATH.FORUM}/:forumId`} element={<LazyTopic />} />
        <Route path={PATH.LEADERBOARD} element={<LazyBoard />} />
      </Route>
      <Route element={<RequireUnAuth />}>
        <Route path={PATH.SIGNUP} element={<LazyReg />} />
        <Route path={PATH.SIGNIN} element={<LazyAuth />} />
      </Route>
      <Route path={PATH.HOME} errorElement={<LazyError />} element={<LazyMain />} />
      <Route path={PATH.GAME} element={<LazyGame />} />
      <Route path={PATH.NOT_FOUND} element={<LazyError />} />
			
      <Route path={'/me'} element={<LazyMe />} />
    </Routes>
  )
}
