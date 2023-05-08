import React from 'react'
import { Route, Routes } from 'react-router'
import { routes } from './routes'

// const LazyAuth = React.lazy(() => import('./pages/AuthPage'))
// const LazyReg = React.lazy(() => import('./pages/RegistrationPage'))
// const LazyMain = React.lazy(() => import('./pages/MainPage'))
// const LazySettings = React.lazy(() => import('./pages/ProfilePage'))
// const LazyForum = React.lazy(() => import('./pages/ForumPage'))
// const LazyTopic = React.lazy(() => import('./pages/TopicPage'))
// const LazyBoard = React.lazy(() => import('./pages/LeaderBoardPage'))
// const LazyError = React.lazy(() => import('./pages/NotFoundPage'))
// const LazyGame = React.lazy(() => import('./pages/GameLoaderPage'))

export const Router = () => {
  // useRedirect()
  return (
    <Routes>
      {routes.map(route => {
        const { loader: _, ...rest } = route
        return <Route key={rest.path} {...rest} />
      })}
      {/*<Route element={<RequireAuth />}>*/}
      {/*  <Route path={routes.SETTINGS} element={<ProfilePage />} />*/}
      {/*  <Route path={routes.FORUM} element={<ForumPage />} />*/}
      {/*  <Route path={`${routes.FORUM}/:forumId`} element={<TopicPage />} />*/}
      {/*  <Route path={routes.LEADERBOARD} element={<LeaderBoardPage />} />*/}
      {/*</Route>*/}
      {/*<Route element={<RequireUnAuth />}>*/}
      {/*  <Route path={routes.SIGNUP} element={<RegistrationPage />} />*/}
      {/*  <Route path={routes.SIGNIN} element={<AuthPage />} />*/}
      {/*</Route>*/}
      {/*<Route path={routes.HOME} errorElement={<NotFoundPage />} element={<MainPage />} />*/}
      {/*/!*Тут не работает audio на сервере*!/*/}
      {/*/!*<Route path={routes.GAME} element={<GamePage />} />*!/*/}
      {/*<Route path={routes.NOT_FOUND} element={<NotFoundPage />} />*/}
    </Routes>
  )
}
