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

export const routes = [
  {
    path: Routes.SIGNIN,
    exact: true,
    element: <AuthPage />,
  },
  {
    path: Routes.SIGNUP,
    exact: true,
    element: <RegistrationPage />,
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
  },
  {
    path: Routes.FORUM,
    exact: true,
    element: <ForumPage />,
  },
  {
    path: `${Routes.FORUM}/:forumId`,
    element: <TopicPage />,
  },
  {
    path: Routes.GAME,
    exact: true,
    element: <GameLoaderPage />,
  },
  {
    path: Routes.LEADERBOARD,
    exact: true,
    element: <LeaderBoardPage />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <NotFoundPage />,
  },
]
