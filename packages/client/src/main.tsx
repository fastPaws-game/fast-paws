import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import AuthPage from './pages/AuthPage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: '/signup',
    element: <RegistrationPage />
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/forum',
    element: <div>Forum Page</div>
  }, 
  {
    path: '/forum/:forumId',
    element: <div>New games</div>
  },
  {
    path: 'game',
    element: <div>Game page</div>
  },

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
