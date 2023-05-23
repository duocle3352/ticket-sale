import classNames from 'classnames/bind'
import { DotIcon } from '../Icons'
import styles from './StatusTag.module.scss'

const cx = classNames.bind(styles)

export interface StatusProps {
  statusMessage: 'Đang áp dụng' | 'Chưa sử dụng' | 'Đã sử dụng' | 'Hết hạn' | 'Tắt'
}

function StatusTag({ statusMessage }: StatusProps) {
  let color
  let bgColor
  if (statusMessage === 'Đang áp dụng' || statusMessage === 'Chưa sử dụng') {
    color = '#03AC00'
    bgColor = '#DEF7E0'
  }
  if (statusMessage === 'Đã sử dụng') {
    color = '#919DBA'
    bgColor = '#EAF1F8'
  }
  if (statusMessage === 'Hết hạn' || statusMessage === 'Tắt') {
    color = '#FD5959'
    bgColor = '#F8EBE8'
  }

  return (
    <div className={cx('wrapper')} style={{ color: color, backgroundColor: bgColor }}>
      <DotIcon />
      {statusMessage}
    </div>
  )
}

export default StatusTag
