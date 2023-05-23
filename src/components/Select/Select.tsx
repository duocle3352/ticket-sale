import classNames from 'classnames/bind'
import styles from './Select.module.scss'
import { SelectHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { ErrorIcon } from '../Icons'

const cx = classNames.bind(styles)

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string
  rules?: RegisterOptions
  register?: UseFormRegister<any>
  options: string[]
  placeholder: string
}

function Select({
  name,
  className,
  options,
  placeholder,
  errorMessage,
  rules,
  register,
  ...passProps
}: Props) {
  const registerResult = register && name ? register(name, { ...rules }) : {}

  return (
    <>
      <select
        defaultValue=''
        className={cx('wrapper', className)}
        {...registerResult}
        {...passProps}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <div className={cx('error')}>
        {errorMessage && (
          <>
            <ErrorIcon className={cx('error-icon')} />
            <span className={cx('error-massage')}>{errorMessage}</span>
          </>
        )}
      </div>
    </>
  )
}

export default Select
