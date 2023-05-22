import { signOut } from 'firebase/auth'

import { useAppDispatch } from '~/redux/store'
import { setProfile } from '~/redux/authenticateSlice'
import { clearAuthInLS } from '~/util/auth'
import { auth } from '~/firebaseConfig'
import { CopyIcon, LogoutIcon } from '~/components/Icons'
import { Menubar } from '../components/Menubar'
import { Button } from '~/components/Button'
import { Header } from '../components/Header'
import { setIsAuthenticated } from '~/redux/authenticateSlice'

interface Props {
  children: JSX.Element
}

function DefaultLayout({ children }: Props) {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        clearAuthInLS()
        dispatch(setProfile(null))
        dispatch(setIsAuthenticated(false))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='layout-wrapper'>
      <div className='layout-container'>
        <div className='layout-menubar'>
          <Menubar />
          <div>
            <Button leftIcon={<LogoutIcon />} large onClick={handleLogout}>
              Đăng xuất
            </Button>
            <div className='layout-copy-right'>
              <span>Copyright</span>
              <CopyIcon />
              <span>2023 DuocLe</span>
            </div>
          </div>
        </div>
        <div className='layout-content'>
          <Header />
          <div className='layout-child'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
