import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '~/redux/store'
import { collection, getDocs } from 'firebase/firestore'
import { ticketSchema } from '~/util/getRules'
import { db } from '~/firebaseConfig'
import { addTicket, cancelAdd } from '~/redux/manageTicketSlice'
import { Modal } from '~/components/Modal'
import { Button } from '~/components/Button'
import { CalenderPicker } from '~/components/CalenderPicker'
import { Label } from '~/components/Label'
import { RequireTag } from '~/components/RequireTag'
import { Select } from '~/components/Select'
import TicketType from '~/types/TicketType'
import styles from './AddTicket.module.scss'

const cx = classNames.bind(styles)

const gates = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5']
const ticketType = ['Vé cổng', 'Vé trọn gói']
const status = ['Chưa sử dụng', 'Đã sử dụng', 'Hết hạn']

function AddTicket() {
  const today = new Date()
  const dispatch = useAppDispatch()
  const [listPackage, setListPackage] = useState<string[]>([])
  const [applyDate, setApplyDate] = useState<Date | undefined>(today)
  const [useDate, setUseDate] = useState<Date | undefined>(today)
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TicketType>({
    resolver: yupResolver(ticketSchema)
  })
  const onSubmit = handleSubmit(async (data) => {
    const formData: TicketType = {
      ...data,
      id: today.getTime().toString(),
      checkStatus: 'Chưa đối soát',
      applyDate: (applyDate as Date).getTime(),
      useDate: (useDate as Date).getTime()
    }
    setIsPending(true)
    await dispatch(addTicket(formData))
    setIsPending(false)
    dispatch(cancelAdd())
  })

  const handleCancel = () => {
    dispatch(cancelAdd())
  }

  // get list package name
  useEffect(() => {
    const fetchApi = async () => {
      const listPackageName: string[] = []
      const querySnapshot = await getDocs(collection(db, 'packages'))
      querySnapshot.forEach((doc) => {
        const packageName: string = doc.data().name
        const isHaveName = listPackageName.includes(packageName)
        if (!isHaveName) {
          listPackageName.push(packageName)
        }
      })
      setListPackage(listPackageName)
    }

    fetchApi()
  }, [])

  return (
    <Modal title='Thêm vé'>
      <form className={cx('container')} onSubmit={onSubmit}>
        <div>
          <Label require label='Tên gói vé' />
          <Select
            name='packageName'
            options={listPackage}
            placeholder='Chọn gói vé'
            className={cx('select-package')}
            register={register}
            errorMessage={errors.packageName?.message}
          />
        </div>

        <div className={cx('group')}>
          <div className={cx('item')}>
            <Label require label='Loại vé' />
            <Select
              name='type'
              options={ticketType}
              placeholder='Chọn loại vé'
              register={register}
              errorMessage={errors.type?.message}
            />
          </div>
          <div className={cx('item')}>
            <Label require label='Cổng check - in' />
            <Select
              name='gate'
              options={gates}
              placeholder='Chọn cổng vào'
              register={register}
              errorMessage={errors.gate?.message}
            />
          </div>
        </div>
        {/* use status */}
        <div className={cx('single-ele')}>
          <Label require label='Tình trạng sử dụng' />
          <Select
            name='statusMessage'
            options={status}
            placeholder='Trang thái'
            register={register}
            errorMessage={errors.statusMessage?.message}
          />
        </div>
        {/* date */}
        <div className={cx('group')}>
          <div className={cx('item')}>
            <Label require label='Ngày sử dụng' />
            <CalenderPicker
              formatDate='dd/MM/yyy'
              selectedDate={applyDate}
              setSelectedDate={setApplyDate}
              placement='top-start'
            />
          </div>
          <div className={cx('item')}>
            <Label require label='Ngày xuất vé' />
            <CalenderPicker
              formatDate='dd/MM/yyy'
              selectedDate={useDate}
              setSelectedDate={setUseDate}
              placement='top-start'
            />
          </div>
        </div>
        {/* note */}
        <RequireTag />
        {/* btn */}
        <div className={cx('form-btn')}>
          <Button large outline onClick={handleCancel}>
            Huỷ
          </Button>
          <Button large disabled={isPending} type='submit'>
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTicket
