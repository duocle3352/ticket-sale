import classNames from 'classnames/bind'
import { InputHTMLAttributes } from 'react'
import styles from './CheckInput.module.scss'

const cx = classNames.bind(styles)

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checkedValue: string | string[]
  label: string
  value: string
  className?: string
  type: 'radio' | 'checkbox'
}

function CheckInput({
  checkedValue,
  label,
  name,
  type,
  value,
  className,
  onChange,
  ...passProps
}: Props) {
  return (
    <div className={cx('wrapper', className)}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        checked={type === 'radio' ? checkedValue === value : checkedValue.includes(value)}
        onChange={onChange}
        {...passProps}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default CheckInput
