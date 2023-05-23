import classNames from 'classnames/bind'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { cancelUpdate, updateDateTicket } from '~/redux/manageTicketSlice'
import { RootState, useAppDispatch } from '~/redux/store'
import { Modal } from '~/components/Modal'
import { Label } from '~/components/Label'
import { CalenderPicker } from '~/components/CalenderPicker'
import { Button } from '~/components/Button'
import TicketType from '~/types/TicketType'
import styles from './UpdateUseDate.module.scss'

const cx = classNames.bind(styles)

function UpdateUseDate() {
  const dispatch = useAppDispatch()
  const updateItem: TicketType = useSelector(
    (state: RootState) => state.manage.updateItem
  ) as TicketType
  const [selectDate, setSelectDate] = useState<Date | undefined>(new Date(updateItem.useDate))
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleUpdate = async () => {
    const data: { id: string; updateDate: number } = {
      id: updateItem.id,
      updateDate: new Date(selectDate as Date).getTime()
    }
    setIsUpdating(true)
    await dispatch(updateDateTicket(data))
    setIsUpdating(false)
    dispatch(cancelUpdate())
  }

  const handleCancel = () => {
    dispatch(cancelUpdate())
  }

  return (
    <Modal title='Đổi hạn sử dụng vé'>
      <div className={cx('container')}>
        <div className={cx('block')}>
          <Label label='Số vé' className={cx('label')} />
          <p>{updateItem.id}</p>
        </div>
        <div className={cx('block')}>
          <Label label='Loại vé' className={cx('label')} />
          <p>{updateItem.type}</p>
        </div>
        <div className={cx('block')}>
          <Label label='Tên sự kiện' className={cx('label')} />
          <p>{updateItem.packageName}</p>
        </div>
        <div className={cx('block')}>
          <Label label='Hạn sử dụng' className={cx('label')} />
          <CalenderPicker selectedDate={selectDate} setSelectedDate={setSelectDate} />
        </div>
        <div className={cx('block__btn')}>
          <Button outline onClick={handleCancel}>
            Huỷ
          </Button>
          <Button onClick={handleUpdate} disabled={isUpdating}>
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateUseDate
