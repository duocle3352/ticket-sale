import classNames from 'classnames/bind'
import { useLayoutEffect } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '../Icons'
import useQueryParam from '~/hooks/useQueryParams'
import styles from './Pagination.module.scss'

const cx = classNames.bind(styles)

interface Props {
  setItemOffset: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  listLength: number
  itemsPerPage: number
}

const RANGE = 2
function Pagination({ pageSize, listLength, itemsPerPage, setItemOffset }: Props) {
  const queryParams = useQueryParam()
  const page = Number(queryParams.page) || 1

  const handlePageChange = (index: number) => {
    const newOffset = (index * itemsPerPage) % listLength
    setItemOffset(newOffset)
  }

  useLayoutEffect(() => {
    const newOffset = ((page - 1) * itemsPerPage) % listLength
    setItemOffset(newOffset)
  }, [page, setItemOffset, itemsPerPage, listLength])

  const renderPaginate = () => {
    let dotBefore = false
    let dotAfter = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className={cx('disable')}>
            ...
          </span>
        )
      }
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className={cx('disable')}>
            ...
          </span>
        )
      }
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: './',
              search: createSearchParams({
                ...queryParams,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={cx('btn', { active: pageNumber === page })}
            onClick={() => handlePageChange(index)}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className={cx('wrapper')}>
      {page === 1 ? (
        <span className={cx('btn', 'disable')}>
          <ChevronLeftIcon className={cx('icon')} />
        </span>
      ) : (
        <Link
          to={{
            pathname: './',
            search: createSearchParams({
              ...queryParams,
              page: (page - 1).toString()
            }).toString()
          }}
          className={cx('btn')}
          onClick={() => handlePageChange(page - 2)}
        >
          <ChevronLeftIcon className={cx('icon')} />
        </Link>
      )}
      {renderPaginate()}
      {page === pageSize ? (
        <span className={cx('btn', 'disable')}>
          <ChevronRightIcon className={cx('icon')} />
        </span>
      ) : (
        <Link
          to={{
            pathname: './',
            search: createSearchParams({
              ...queryParams,
              page: (page + 1).toString()
            }).toString()
          }}
          className={cx('btn')}
          onClick={() => handlePageChange(page)}
        >
          <ChevronRightIcon className={cx('icon')} />
        </Link>
      )}
    </div>
  )
}

export default Pagination
