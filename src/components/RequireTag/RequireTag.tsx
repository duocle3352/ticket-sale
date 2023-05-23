import classNames from 'classnames/bind'
import styles from './RequireTag.module.scss'

const cx = classNames.bind(styles)

function RequireTag() {
  return (
    <div className={cx('wrapper')}>
      <span>*</span>
      Là trường thông tin bắt buộc
    </div>
  )
}

export default RequireTag
