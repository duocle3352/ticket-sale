import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function TableHeader() {
  return (
    <tr className='table-row'>
      <th className='table-col'>STT</th>
      <th className='table-col'>Booking code</th>
      <th className='table-col'>Số vé</th>
      <th className={cx('event-name', 'table-col')}>Tên sự kiện</th>
      <th className='table-col'>Tình trạng sử dụng</th>
      <th className='table-col'>Hạn sử dụng</th>
      <th className='table-col'>Ngày xuất vé</th>
      <th className='table-col'>Cổng check - in</th>
      <th className='table-col' />
    </tr>
  )
}

export default TableHeader
