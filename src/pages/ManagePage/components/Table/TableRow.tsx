import classNames from 'classnames/bind'
import { useId, useState } from 'react'
import { useFloating, FloatingPortal, useInteractions, useHover } from '@floating-ui/react'

import formatDate from '~/util/formatDate'
import { useAppDispatch } from '~/redux/store'
import { startUpdate } from '~/redux/manageTicketSlice'
import { StatusTag } from '~/components/StatusTag'
import { MoreIcon } from '~/components/Icons'
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

  const handleStartUpdateTicket = () => {
    dispatch(startUpdate(ticket))
  }

  return (
    <tr className='table-row'>
      <td className={cx('NO', 'table-col')}>{index + 1}</td>
      <td className='table-col'>{ticket.id.slice(0, 8)}</td>
      <td className='table-col'>{ticket.id.slice(0, 8)}</td>
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
      <td className='table-col'>
        <StatusTag statusMessage={ticket.statusMessage} />
      </td>
      <td className='table-col'>{formatDate(ticket.useDate)}</td>
      <td className='table-col'>{formatDate(ticket.applyDate)}</td>
      <td className='table-col'>{ticket.gate}</td>
      <td className={cx('update', 'table-col')} onClick={() => handleStartUpdateTicket()}>
        <MoreIcon />
      </td>
    </tr>
  )
}

export default TableRow
