import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'

import { db } from '~/firebaseConfig'
import useQueryParams from '~/hooks/useQueryParams'
import usePagination from '~/hooks/usePagination'
import { PageWrapper } from '~/components/PageWrapper'
import { PageTitle } from '~/components/PageTitle'
import { Button } from '~/components/Button'
import { Search } from '~/components/Search'
import { TableRow, TableHeader } from './components/Table'
import { Pagination } from '~/components/Pagination'
import TicketType from '~/types/TicketType'
import styles from './ManagePage.module.scss'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '~/redux/store'
import { UpdateUseDate } from './components/UpdateUseDate'
import { AddTicket } from './components/AddTicket'
import { startAdd } from '~/redux/manageTicketSlice'

const cx = classNames.bind(styles)

function ManagePage() {
  const searchParams = useQueryParams()
  const dispatch = useAppDispatch()
  const updateItem: TicketType | null = useSelector((state: RootState) => state.manage.updateItem)
  const isAddTicket: boolean = useSelector((state: RootState) => state.manage.isAddTicket)
  const [tickets, setTickets] = useState<TicketType[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState<string>('')
  const { currentData, itemsPerPage, pageSize, setItemOffset } = usePagination(tickets as [], 8)

  useEffect(() => {
    const q = query(collection(db, 'tickets'))
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
  }, [searchParams])

  const handleStartAdd = () => {
    dispatch(startAdd())
  }

  return (
    <PageWrapper className={cx('wrapper')}>
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
          <Button
            large
            outline
            // leftIcon={<FilterIcon />}
            // onClick={handleStartFilterTicket}
          >
            Lọc vé
          </Button>
          {/* <CSVLink data={data} filename={'my-file.csv'} target='_blank' className={cx('btn')}>
        <Button large outline>
          Xuất file (.csv)
        </Button>
      </CSVLink> */}
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
      {/* filter */}
      {/* {isFilterTicket && <FilterTicket />} */}
    </PageWrapper>
  )
}

export default ManagePage
