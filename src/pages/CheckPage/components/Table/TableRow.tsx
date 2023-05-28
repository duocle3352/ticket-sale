import classNames from 'classnames/bind'
import { useId, useState } from 'react'
import { useFloating, FloatingPortal, useInteractions, useHover } from '@floating-ui/react'

import formatDate from '~/util/formatDate'
import { useAppDispatch } from '~/redux/store'
import { startCheck } from '~/redux/manageTicketSlice'
import TicketType from '~/types/TicketType'
import styles from './Table.module.scss'

const cx = classNames.bind(styles)

function TableRow({ ticket, index }: { ticket: TicketType; index: number }) {
  const id = useId()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start'
  })
  const hover = useHover(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const handleCheckTicket = () => {
    dispatch(startCheck(ticket))
  }

  return (
    <tr className='table-row'>
      <td className='table-col center-row'>{index + 1}</td>
      <td className='table-col'>{ticket.id}</td>
      <td
        className={cx('event-name', 'table-col')}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {ticket.packageName}
        {isOpen && (
          <FloatingPortal id={id}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={cx('popup')}
              {...getFloatingProps()}
            >
              {ticket.packageName}
            </div>
          </FloatingPortal>
        )}
      </td>
      <td className='table-col'>{formatDate(ticket.applyDate)}</td>
      <td className='table-col'>{ticket.type}</td>
      <td className='table-col center-row'>{ticket.gate}</td>
      <td
        className={cx('table-col', 'table-btn', { checked: ticket.checkStatus === 'Đã đối soát' })}
        onClick={handleCheckTicket}
      >
        {ticket.checkStatus}
      </td>
    </tr>
  )
}

export default TableRow
