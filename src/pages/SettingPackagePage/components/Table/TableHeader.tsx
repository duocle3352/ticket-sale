import classNames from 'classnames/bind'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function TableHeader() {
  return (
    <tr className='table-row'>
      <th className='table-col'>STT</th>
      <th className='table-col'>Mã gói</th>
      <th className={cx('event-name', 'table-col')}>Tên gói vé</th>
      <th className='table-col'>Ngày áp dụng</th>
      <th className='table-col'>Ngày hết hạn</th>
      <th className='table-col'>Giá vé</th>
      <th className='table-col'>Giá Combo</th>
      <th className='table-col'>Tình trạng</th>
      <th className='table-col' />
    </tr>
  )
}

export default TableHeader
