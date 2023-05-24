import classNames from 'classnames/bind'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

import useQueryParams from '~/hooks/useQueryParams'
import routes from '~/configs/routes'
import { useAppDispatch } from '~/redux/store'
import { cancelFilter } from '~/redux/manageTicketSlice'
import { Modal } from '~/components/Modal'
import { CalenderPicker } from '~/components/CalenderPicker'
import { Label } from '~/components/Label'
import { Button } from '~/components/Button'
import { CheckInput } from '~/components/CheckInput'
import styles from './FilterTicket.module.scss'

const cx = classNames.bind(styles)

function FilterTicket() {
  const searchParams = useQueryParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const today = new Date()
  const selectStartDate = searchParams.startDate ? new Date(Number(searchParams.startDate)) : today
  const selectEndDate = searchParams.endDate ? new Date(Number(searchParams.endDate)) : today

  const [startDate, setStartDate] = useState<Date | undefined>(selectStartDate)
  const [endDate, setEndDate] = useState<Date | undefined>(selectEndDate)
  const [useStatus, setUseStatus] = useState<string>('Tất cả')
  const [gates, setGates] = useState<string[]>(['Tất cả'])

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseStatus(e.target.value)
  }
  const handleChoseAllGate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGates([e.target.value])
  }
  const handleGateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGates((prev) => {
      if (prev.includes('Tất cả')) {
        return [e.target.value]
      } else {
        if (prev.includes(e.target.value)) {
          const newGates = prev.filter((gate) => gate !== e.target.value)
          return newGates
        }
        return [...prev, e.target.value]
      }
    })
  }

  const handleCancel = () => {
    dispatch(cancelFilter())
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({
      pathname: routes.manage,
      search: createSearchParams({
        ...searchParams,
        status: useStatus,
        gates: gates.toString(),
        startDate: new Date(startDate || 0).getTime().toString(),
        endDate: new Date(endDate as Date).getTime().toString()
      }).toString()
    })
    dispatch(cancelFilter())
  }

  return (
    <Modal title='Lọc vé'>
      <form className={cx('container')} onSubmit={handleSubmit}>
        <div className={cx('group', 'group__2')}>
          <div className={cx('item')}>
            <Label label='Từ ngày' className={cx('label')} />
            <CalenderPicker
              formatDate='dd/MM/yyy'
              selectedDate={startDate}
              setSelectedDate={setStartDate}
            />
          </div>
          <div className={cx('item')}>
            <Label label='Đến ngày' className={cx('label')} />
            <CalenderPicker
              formatDate='dd/MM/yyy'
              selectedDate={endDate}
              setSelectedDate={setEndDate}
            />
          </div>
        </div>
        <div>
          <Label label='Tình trạng sử dụng' className={cx('label')} />
          <div className={cx('group', 'group__4')}>
            <CheckInput
              label='Tất cả'
              value='Tất cả'
              type='radio'
              checkedValue={useStatus}
              name='useStatus'
              onChange={handleStatusChange}
            />
            <CheckInput
              label='Đã sử dụng'
              value='Đã sử dụng'
              type='radio'
              checkedValue={useStatus}
              name='useStatus'
              onChange={handleStatusChange}
            />
            <CheckInput
              label='Chưa sử dụng'
              value='Chưa sử dụng'
              type='radio'
              checkedValue={useStatus}
              name='useStatus'
              onChange={handleStatusChange}
            />
            <CheckInput
              label='Hết hạn'
              value='Hết hạn'
              type='radio'
              checkedValue={useStatus}
              name='useStatus'
              onChange={handleStatusChange}
            />
          </div>
        </div>
        <div>
          <Label label='Cổng Check - in' />
          <div className={cx('group', 'group__6')}>
            <CheckInput
              className={cx('item')}
              label='Tất cả'
              value='Tất cả'
              type='checkbox'
              checkedValue={gates[0]}
              name='gate'
              onChange={handleChoseAllGate}
            />
            <CheckInput
              className={cx('item')}
              label='Cổng 1'
              value='Cổng 1'
              type='checkbox'
              checkedValue={gates}
              name='gate'
              onChange={handleGateChange}
            />
            <CheckInput
              className={cx('item')}
              label='Cổng 2'
              value='Cổng 2'
              type='checkbox'
              checkedValue={gates}
              name='gate'
              onChange={handleGateChange}
            />
            <CheckInput
              className={cx('item')}
              label='Cổng 3'
              value='Cổng 3'
              type='checkbox'
              checkedValue={gates}
              name='gate'
              onChange={handleGateChange}
            />
            <CheckInput
              className={cx('item')}
              label='Cổng 4'
              value='Cổng 4'
              type='checkbox'
              checkedValue={gates}
              name='gate'
              onChange={handleGateChange}
            />
            <CheckInput
              className={cx('item')}
              label='Cổng 5'
              value='Cổng 5'
              type='checkbox'
              checkedValue={gates}
              name='gate'
              onChange={handleGateChange}
            />
          </div>
        </div>
        <div className={cx('form-btn')}>
          <Button large outline onClick={handleCancel}>
            Huỷ
          </Button>
          <Button large type='submit'>
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FilterTicket
