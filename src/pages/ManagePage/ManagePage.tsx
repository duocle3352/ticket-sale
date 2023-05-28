import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'

import useQueryParams from '~/hooks/useQueryParams'
import usePagination from '~/hooks/usePagination'
import { RootState, useAppDispatch } from '~/redux/store'
import { db } from '~/firebaseConfig'
import { startAdd, startFilter } from '~/redux/manageTicketSlice'
import { PageWrapper } from '~/components/PageWrapper'
import { PageTitle } from '~/components/PageTitle'
import { Button } from '~/components/Button'
import { Search } from '~/components/Search'
import { TableRow, TableHeader } from './components/Table'
import { Pagination } from '~/components/Pagination'
import { AddTicket } from './components/AddTicket'
import { UpdateUseDate } from './components/UpdateUseDate'
import { FilterIcon } from '~/components/Icons'
import { FilterTicket } from './components/FilterTicket'
import TicketType from '~/types/TicketType'
import styles from './ManagePage.module.scss'

const cx = classNames.bind(styles)

function ManagePage() {
  const dispatch = useAppDispatch()
  const searchParams = useQueryParams()
  const { startDate, endDate, gates, status } = searchParams
  const updateItem: TicketType | null = useSelector((state: RootState) => state.manage.updateItem)
  const isAddTicket: boolean = useSelector((state: RootState) => state.manage.isAddTicket)
  const isFilterTicket: boolean = useSelector((state: RootState) => state.manage.isFilterTicket)
  const [tickets, setTickets] = useState<TicketType[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState<string>('')
  const { currentData, itemsPerPage, pageSize, setItemOffset } = usePagination(tickets as [], 8)

  useEffect(() => {
    const statusQuery = (status: string | undefined) => {
      if (status) {
        if (status === 'Tất cả') {
          const currentStatus = 'Chưa sử dụng,Đã sử dụng,Hết hạn'
          return where('statusMessage', 'in', currentStatus.split(','))
        } else {
          return where('statusMessage', '==', status)
        }
      } else {
        const currentStatus = 'Chưa sử dụng,Đã sử dụng,Hết hạn'
        return where('statusMessage', 'in', currentStatus.split(','))
      }
    }
    const gatesQuery = (gates: string | undefined) => {
      if (gates) {
        if (gates === 'Tất cả') {
          const currentGate = 'Cổng 1,Cổng 2,Cổng 3,Cổng 4,Cổng 5'
          return where('gate', 'in', currentGate.split(','))
        } else {
          return where('gate', 'in', gates.split(','))
        }
      } else {
        const currentGate = 'Cổng 1,Cổng 2,Cổng 3,Cổng 4,Cổng 5'
        return where('gate', 'in', currentGate.split(','))
      }
    }
    const startDateQuery = (date: string) => {
      return where('applyDate', '>=', Number(date || 0))
    }
    const endDateQuery = (date: string) => {
      if (date) {
        return where('applyDate', '<=', Number(date))
      } else {
        return where('applyDate', '<=', Infinity)
      }
    }

    const ticketRef = collection(db, 'tickets')
    const q = query(
      ticketRef,
      orderBy('applyDate', 'desc'),
      statusQuery(status),
      gatesQuery(gates),
      startDateQuery(startDate),
      endDateQuery(endDate)
    )
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listTicket: TicketType[] = []
      querySnapshot.forEach((doc) => {
        listTicket.push(doc.data() as TicketType)
      })
      setTickets(listTicket)
    })

    return () => {
      unsubscribe()
    }
  }, [endDate, gates, startDate, status])

  const handleStartAdd = () => {
    dispatch(startAdd())
  }

  const handleStartFiter = () => {
    dispatch(startFilter())
  }

  return (
    <PageWrapper>
      <PageTitle title='Danh sách vé' />
      <div className={cx('tool')}>
        <Search
          placeholder='Tìm bằng số vé'
          setSearchValue={setSearchValue}
          className={cx('tool__search')}
        />
        <div className={cx('tool__btn')}>
          <Button large onClick={handleStartAdd}>
            Thêm vé
          </Button>
          <Button large outline leftIcon={<FilterIcon />} onClick={handleStartFiter}>
            Lọc vé
          </Button>
          <CSVLink
            data={tickets}
            filename={'my-file.csv'}
            target='_blank'
            className={cx('tool__export')}
          >
            <Button large outline>
              Xuất file (.csv)
            </Button>
          </CSVLink>
        </div>
      </div>
      <div className={cx('content')}>
        <table className='table'>
          <tbody>
            <TableHeader />
            {(currentData as TicketType[]).map((ticket, index) => (
              <TableRow ticket={ticket} index={index} key={ticket.id} />
            ))}
          </tbody>
        </table>
        {/* paginate */}
        {pageSize > 1 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            listLength={tickets.length}
            pageSize={pageSize}
            setItemOffset={setItemOffset}
          />
        )}
      </div>

      {isAddTicket && <AddTicket />}
      {updateItem && <UpdateUseDate />}
      {isFilterTicket && <FilterTicket />}
    </PageWrapper>
  )
}

export default ManagePage
