import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'

import { BellIcon, MailIcon } from '~/components/Icons'
import { RootState } from '~/redux/store'
import User from '~/types/user.type'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'

const cx = classNames.bind(styles)

function Header() {
  const profile: User | null = useSelector((state: RootState) => state.authenticate.profile)

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tool-item')}>
        <MailIcon />
      </div>
      <div className={cx('tool-item')}>
        <BellIcon />
      </div>
      <Link to={routes.profile} className={cx('user')}>
        <img src={profile?.avatar} alt='avatar' className={cx('avatar')} />
      </Link>
    </div>
  )
}

export default Header
