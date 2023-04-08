import { createBrowserRouter } from 'react-router-dom'
import React from 'react'

const LazyAuth = React.lazy(() => import('./pages/AuthPage'))
const LazyReg = React.lazy(() => import('./pages/RegistrationPage'))
const LazyMain = React.lazy(() => import('./pages/MainPage'))
const LazySettings = React.lazy(() => import('./pages/ProfilePage'))
const LazyForum = React.lazy(() => import('./pages/ForumPage'))
const LazyTopic = React.lazy(() => import('./pages/TopicPage'))
const LazyBoard = React.lazy(() => import('./pages/LeaderBoardPage'))
const LazyError = React.lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyAuth />,
    errorElement: <LazyError />,
  },
  {
    path: '/signup',
    element: <LazyReg />,
  },
  {
    path: '/main',
    element: <LazyMain />,
  },
  {
    path: '/settings',
    element: <LazySettings />,
  },
  {
    path: '/forum',
    element: <LazyForum />,
  },
  {
    path: '/forum/:forumId',
    element: <LazyTopic />,
  },
  {
    path: 'game',
    element: <div>Game page</div>,
  },
  {
    path: 'leaderboard',
    element: <LazyBoard />,
  },
])
