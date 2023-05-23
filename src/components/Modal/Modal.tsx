import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import React from 'react'

const cx = classNames.bind(styles)

interface Props {
  children: React.ReactElement
  title: string
}

function Modal({ children, title }: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('title')}>{title}</div>
        {children}
      </div>
    </div>
  )
}

export default Modal
