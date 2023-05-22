import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import routes from '~/configs/routes'
import { DefaultLayout } from '~/layouts/DefaultLayout'
import { NoneLayout } from '~/layouts/NoneLayout'
import { HomePage } from '~/pages/HomePage'
import { LoginPage } from '~/pages/LoginPage'
import { RootState } from '~/redux/store'

const ProtectedRoute = () => {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.authenticate.isAuthenticated
  )
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

const RejectedRoute = () => {
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.authenticate.isAuthenticated
  )

  return !isAuthenticated ? <Outlet /> : <Navigate to={routes.home} />
}

const useRouteElement = () => {
  const routeElement = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: routes.home,
          element: (
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: routes.login,
          element: (
            <NoneLayout>
              <LoginPage />
            </NoneLayout>
          )
        }
      ]
    }
  ])

  return routeElement
}

export default useRouteElement
