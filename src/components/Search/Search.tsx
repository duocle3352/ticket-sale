import classNames from 'classnames/bind'
import { SearchIcon } from '../Icons'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

interface Props {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  className?: string
}

function Search({ className, placeholder = 'Nhập từ khóa', setSearchValue }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)

  return (
    <div className={cx('wrapper', className)}>
      <input placeholder={placeholder} className={cx('input')} onChange={handleChange} />
      <SearchIcon className={cx('icon')} />
    </div>
  )
}

export default Search
