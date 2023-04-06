import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import PageWrapper from './pages/PageWrapper'

const LazyAuth = React.lazy(() => import('./pages/AuthPage'))
const LazyReg = React.lazy(() => import('./pages/RegistrationPage'))
const LazySettings = React.lazy(() => import('./pages/ProfilePage'))
const LazyForum = React.lazy(() => import('./pages/ForumPage'))
const LazyTopic = React.lazy(() => import('./pages/TopicPage'))
const LazyBoard = React.lazy(() => import('./pages/LeaderBoardPage'))
const LazyError = React.lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageWrapper>
        <LazyAuth />
      </PageWrapper>
    ),
    errorElement: (
      <PageWrapper>
        <LazyError />
      </PageWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <PageWrapper>
        <LazyReg />
      </PageWrapper>
    ),
  },
  {
    path: '/settings',
    element: (
      <PageWrapper>
        <LazySettings />
      </PageWrapper>
    ),
  },
  {
    path: '/forum',
    element: (
      <PageWrapper>
        <LazyForum />
      </PageWrapper>
    ),
  },
  {
    path: '/forum/:forumId',
    element: (
      <PageWrapper>
        <LazyTopic />
      </PageWrapper>
    ),
  },
  {
    path: 'game',
    element: (
      <PageWrapper>
        <div>Game page</div>
      </PageWrapper>
    ),
  },
  {
    path: 'leaderboard',
    element: (
      <PageWrapper>
        <LazyBoard />
      </PageWrapper>
    ),
  },
])
