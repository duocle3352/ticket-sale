import classNames from 'classnames/bind'
import { doc, getDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import images from '~/assets/images'
import routes from '~/configs/routes'
import { setProfileToLS } from '~/util/auth'
import { auth, db } from '~/firebaseConfig'
import { useAppDispatch } from '~/redux/store'
import { setIsAuthenticated, setProfile } from '~/redux/authenticateSlice'
import { Logo } from '~/components/Logo'
import { LoginForm, loginSchema } from '~/util/getRules'
import { Label } from '~/components/Label'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'
import User from '~/types/user.type'
import styles from './LoginPage.module.scss'

const cx = classNames.bind(styles)

function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) })

  const onSubmit = handleSubmit(async (data) => {
    const result = await signInWithEmailAndPassword(auth, data.email, data.password)
    const uid = result.user.uid
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const user = docSnap.data()
      dispatch(setIsAuthenticated(true))
      dispatch(setProfile(user as User))
      setProfileToLS(user as User)
      navigate(routes.home)
    } else {
      console.log('No such document!')
    }
  })

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left-container')}>
        <Logo />
        <form className={cx('form-login')} onSubmit={onSubmit}>
          <div className={cx('form-item')}>
            <Label label='Tên đăng nhập' require className={cx('form-label')} />
            <Input
              name='email'
              type='email'
              placeholder='Email'
              errorMessage={errors.email?.message}
              register={register}
            />
          </div>
          <div className={cx('form-item')}>
            <Label label='Mật khẩu' require className={cx('form-label')} />
            <Input
              name='password'
              type='password'
              placeholder='Mật khẩu'
              errorMessage={errors.password?.message}
              register={register}
            />
          </div>
          {/* submit btn */}
          <Button large className={cx('form-submit')}>
            Đăng nhập
          </Button>
          <Link to={routes.login} className={cx('forgot-password')}>
            Quên mật khẩu?
          </Link>
        </form>
      </div>
      <div className={cx('right-container')}>
        <div>
          <div className={cx('bg-title__small')}>Hệ thống</div>
          <div className={cx('bg-title__large')}>Quản lý vé</div>
        </div>
        <div className={cx('bg-images')}>
          <img src={images.loginBg_2} alt='bg' />
          <img src={images.loginBg_1} alt='bg' />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
