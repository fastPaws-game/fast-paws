import ProfilePage from '../pages/ProfilePage'
import ForumPage from '../pages/ForumPage'
import TopicPage from '../pages/TopicPage'
import LeaderBoardPage from '../pages/LeaderBoardPage'
import RegistrationPage from '../pages/RegistrationPage'
import AuthPage from '../pages/AuthPage'
import NotFoundPage from '../pages/NotFoundPage'
import MainPage from '../pages/MainPage'
import { AppDispatch } from '../hooks/store'
import { getUser } from '../store/auth/AuthActions'
import { Routes } from '../constants/routes'
import GameLoaderPage from '../pages/GameLoaderPage'

type AuthOption = 'require' | 'redirect' | 'default'
export const routes = [
  {
    path: Routes.SIGNIN,
    exact: true,
    element: <AuthPage />,
    withAuth: 'redirect',
  },
  {
    path: Routes.SIGNUP,
    exact: true,
    element: <RegistrationPage />,
    withAuth: 'redirect',
  },
  {
    path: Routes.HOME,
    exact: true,
    element: <MainPage />,
    loader: (dispatch: AppDispatch) => {
      return dispatch(getUser())
    },
  },
  {
    path: Routes.SETTINGS,
    exact: true,
    element: <ProfilePage />,
    withAuth: 'require',
  },
  {
    path: Routes.FORUM,
    exact: true,
    element: <ForumPage />,
    withAuth: 'require',
  },
  {
    path: `${Routes.FORUM}/:forumId`,
    element: <TopicPage />,
    withAuth: 'require',
  },
  {
    path: 'game',
    exact: true,
    element: <GameLoaderPage />,
  },
  {
    path: Routes.LEADERBOARD,
    exact: true,
    element: <LeaderBoardPage />,
    withAuth: 'require',
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
