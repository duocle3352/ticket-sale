import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'

import formatDate from '~/util/formatDate'
import { cancelCheck, checkTicket } from '~/redux/manageTicketSlice'
import { Button } from '~/components/Button'
import { Modal } from '~/components/Modal'
import { Label } from '~/components/Label'
import { RootState, useAppDispatch } from '~/redux/store'
import TicketType from '~/types/TicketType'
import styles from './UpdateChecked.module.scss'

const cx = classNames.bind(styles)

function UpdateChecked() {
  const dispatch = useAppDispatch()
  const ticket: TicketType = useSelector((state: RootState) => state.manage.checkItem as TicketType)

  const handleCheck = (status: string) => {
    const data = {
      id: ticket.id,
      checkStatus: status
    }
    dispatch(checkTicket(data))
    dispatch(cancelCheck())
  }

  return (
    <Modal title='Chốt đối soát'>
      <div className={cx('container')}>
        <div className={cx('item')}>
          <Label label='Số vé:' className={cx('label')} />
          {ticket.id}
        </div>
        <div className={cx('item')}>
          <Label label='Sự kiện:' className={cx('label')} />
          {ticket.packageName}
        </div>
        <div className={cx('item')}>
          <Label label='Ngày xuất:' className={cx('label')} />
          {formatDate(ticket.applyDate)}
        </div>
        <div className={cx('item')}>
          <Label label='Cổng:' className={cx('label')} />
          {ticket.gate}
        </div>
        <div className={cx('item')}>
          <Button outline large onClick={() => handleCheck('Chưa đối soát')}>
            Huỷ chốt
          </Button>
          <Button large onClick={() => handleCheck('Đã đối soát')}>
            Chốt vé
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateChecked
