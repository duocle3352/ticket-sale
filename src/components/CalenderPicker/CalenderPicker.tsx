import classNames from 'classnames/bind'
import { useId, useState } from 'react'
import { DayPicker, ClassNames } from 'react-day-picker'
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  FloatingPortal,
  useInteractions,
  type Placement
} from '@floating-ui/react'
import { format } from 'date-fns'

import { CalendarIcon } from '../Icons'
import styles from './CalenderPicker.module.scss'
import 'react-day-picker/dist/style.css'

const cx = classNames.bind(styles)

interface Props {
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  formatDate?: string
  placement?: Placement
}

function CalenderPicker({
  formatDate = 'dd/MM/yyy',
  placement = 'bottom-start',
  selectedDate,
  setSelectedDate
}: Props) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement
  })
  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown'
  })
  const role = useRole(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const classNames: ClassNames = {
    ...styles,
    caption_label: cx('custom-caption-label'),
    nav_icon: cx('custom-nav-icon'),
    head_cell: cx('custom-head'),
    day: cx('custom-day'),
    day_today: cx('custom-today'),
    day_range_middle: cx('custom-day-range-middle'),
    day_selected: cx('custom-day-selected'),
    day_outside: cx('custom-day-outside')
  }

  return (
    <div>
      <div className={cx('date-display-content')} ref={refs.setReference} {...getReferenceProps()}>
        <div className={cx('date-display')}>
          <CalendarIcon className={cx('calendar_icon')} />
          {selectedDate ? format(selectedDate, formatDate) : 'dd/MM/yyy'}
        </div>
      </div>
      {isOpen && (
        <FloatingPortal id={id}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={cx('wrapper')}
            {...getFloatingProps()}
          >
            <DayPicker
              mode='single'
              defaultMonth={new Date()}
              selected={selectedDate}
              onSelect={setSelectedDate}
              showOutsideDays
              fixedWeeks
              classNames={classNames}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  )
}

export default CalenderPicker
