import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import styles from './MenuItem.module.scss'

const cx = classNames.bind(styles)

interface Props {
  route: string
  title: string
  module: 'parent' | 'child'
  icon?: React.ReactElement
  child?: React.ReactElement
}

function MenuItem({ route, title, icon, child, module }: Props) {
  return (
    <>
      <NavLink
        to={route}
        className={({ isActive }) =>
          cx(
            'wrapper',
            { active: isActive },
            { parent: module === 'parent' },
            { child: module === 'child' }
          )
        }
      >
        <span className={cx('icon')}>{icon}</span>
        <span className={cx('title')}>{title}</span>
      </NavLink>
      {child && <div className={cx('child')}>{child}</div>}
    </>
  )
}

export default MenuItem
