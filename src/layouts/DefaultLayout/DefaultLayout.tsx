import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

interface Props {
  children: JSX.Element
}

function DefaultLayout({ children }: Props) {
  return (
    <div className={cx('wrapper')}>
      DefaultLayout
      {children}
    </div>
  )
}

export default DefaultLayout
