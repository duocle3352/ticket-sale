import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

import routes from '~/configs/routes'
import { DefaultLayout } from '~/layouts/DefaultLayout'
import { NoneLayout } from '~/layouts/NoneLayout'
import { HomePage } from '~/pages/HomePage'
import { LoginPage } from '~/pages/LoginPage'
import { ProfilePage } from '~/pages/ProfilePage'
import { ManagePage } from '~/pages/ManagePage'
import { CheckPage } from '~/pages/CheckPage'
import { SettingPackagePage } from '~/pages/SettingPackagePage'
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
          index: true,
          element: (
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          )
        },
        {
          path: routes.profile,
          element: (
            <DefaultLayout>
              <ProfilePage />
            </DefaultLayout>
          )
        },
        {
          path: routes.manage,
          element: (
            <DefaultLayout>
              <ManagePage />
            </DefaultLayout>
          )
        },
        {
          path: routes.check,
          element: (
            <DefaultLayout>
              <CheckPage />
            </DefaultLayout>
          )
        },
        {
          path: routes.setting,
          element: (
            <DefaultLayout>
              <SettingPackagePage />
            </DefaultLayout>
          )
        },
        {
          path: routes.setting_package,
          element: (
            <DefaultLayout>
              <SettingPackagePage />
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
