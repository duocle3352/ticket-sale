import classNames from 'classnames/bind'
import { ButtonHTMLAttributes } from 'react'
import style from './Button.module.scss'

const cx = classNames.bind(style)

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean
  large?: boolean
  disabled?: boolean
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

function Button({
  children,
  leftIcon,
  rightIcon,
  outline,
  disabled,
  large,
  className,
  onClick,
  ...rest
}: Props) {
  const classes = cx('wrapper', { outline, large, disabled }, className)

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {leftIcon && <div className={cx('icon')}>{leftIcon}</div>}
      <span>{children}</span>
      {rightIcon && <div className={cx('icon', 'right')}>{rightIcon}</div>}
    </button>
  )
}

export default Button
