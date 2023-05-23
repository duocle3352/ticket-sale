import classNames from 'classnames/bind'
import style from './PageTitle.module.scss'

const cx = classNames.bind(style)

interface Props {
  title: string
  className?: string
}

function PageTitle({ title, className }: Props) {
  return <div className={cx('title', className)}>{title}</div>
}

export default PageTitle
