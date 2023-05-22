import classNames from 'classnames/bind'
import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { ErrorIcon, HiddenIcon } from '~/components/Icons'
import styles from './Input.module.scss'

const cx = classNames.bind(styles)

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  register?: UseFormRegister<any>
}

function Input({
  name,
  type,
  value,
  placeholder,
  rules,
  errorMessage,
  className,
  register,
  ...passProps
}: Props) {
  const [currentType, setCurrentType] = useState<string>(type || 'text')
  const registerResult = register && name ? register(name, { ...rules, value }) : {}

  const handleShowPassword = () => {
    setCurrentType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  return (
    <>
      <div className={cx('wrapper', className)}>
        <input
          type={currentType}
          placeholder={placeholder}
          className={cx('input')}
          {...registerResult}
          {...passProps}
        />
        {type === 'password' && (
          <span className={cx('input-icon')} onClick={handleShowPassword}>
            <HiddenIcon />
          </span>
        )}
      </div>
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

export default Input
