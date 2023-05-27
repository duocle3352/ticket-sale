import classNames from 'classnames/bind'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'

import useQueryParams from '~/hooks/useQueryParams'
import { PageWrapper } from '~/components/PageWrapper'
import routes from '~/configs/routes'
import { Label } from '~/components/Label'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'
import { CalenderPicker } from '~/components/CalenderPicker'
import { CheckInput } from '~/components/CheckInput'
import TicketType from '~/types/TicketType'
import styles from './Filter.module.scss'

const cx = classNames.bind(styles)

function Filter() {
  const today = new Date()
  const navigate = useNavigate()
  const searchParams = useQueryParams()
  const selectStartDate = searchParams.startDate ? new Date(Number(searchParams.startDate)) : today
  const selectEndDate = searchParams.endDate ? new Date(Number(searchParams.endDate)) : today

  const [startDate, setStartDate] = useState<Date | undefined>(selectStartDate)
  const [endDate, setEndDate] = useState<Date | undefined>(selectEndDate)
  const [checkStatus, setCheckStatus] = useState<string>('Tất cả')

  const { register, handleSubmit } = useForm<TicketType>()

  const handleCheckStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckStatus(e.target.value)
  }

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: routes.check,
      search: createSearchParams({
        type: data.type,
        checkStatus: checkStatus,
        startDate: new Date(startDate || 0).getTime().toString(),
        endDate: new Date(endDate as Date).getTime().toString()
      }).toString()
    })
  })

  return (
    <PageWrapper className={cx('wrapper')}>
      <div className={cx('title')}>Lọc vé</div>
      <form onSubmit={onSubmit}>
        <div>
          <Label label='Loại vé:' className={cx('label')} />
          <Select
            name='type'
            options={['Tất cả', 'Vé trọn gói', 'Vé cổng']}
            placeholder='Chọn loại vé'
            className={cx('select-package')}
            register={register}
          />
        </div>
        <div className={cx('item')}>
          <Label label='Tình trạng đối soát:' className={cx('label')} />
          <div className={cx('check')}>
            <CheckInput
              label='Tất cả'
              value='Tất cả'
              type='radio'
              checkedValue={checkStatus}
              name='checkStatus'
              onChange={handleCheckStatusChange}
            />
            <CheckInput
              label='Đã đối soát'
              value='Đã đối soát'
              type='radio'
              checkedValue={checkStatus}
              name='checkStatus'
              onChange={handleCheckStatusChange}
            />
            <CheckInput
              label='Chưa đối soát'
              value='Chưa đối soát'
              type='radio'
              checkedValue={checkStatus}
              name='checkStatus'
              onChange={handleCheckStatusChange}
            />
          </div>
        </div>
        <div className={cx('item', 'item_inline')}>
          <Label label='Từ ngày:' />
          <CalenderPicker
            selectedDate={startDate}
            setSelectedDate={setStartDate}
            placement='top-end'
          />
        </div>
        <div className={cx('item', 'item_inline')}>
          <Label label='Đến ngày:' />
          <CalenderPicker selectedDate={endDate} setSelectedDate={setEndDate} placement='top-end' />
        </div>
        <div className={cx('submit-btn')}>
          <Button large>Lọc</Button>
        </div>
      </form>
    </PageWrapper>
  )
}

export default Filter
