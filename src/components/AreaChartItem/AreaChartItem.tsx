import classNames from 'classnames/bind'
import styles from './AreaChartItem.module.scss'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const cx = classNames.bind(styles)

const data = [
  { name: 'Thứ 2', Total: 15 },
  { name: 'Thứ 3', Total: 17 },
  { name: 'Thứ 4', Total: 18 },
  { name: 'Thứ 5', Total: 20 },
  { name: 'Thứ 6', Total: 22 },
  { name: 'Thứ 7', Total: 20 },
  { name: 'CN', Total: 25 }
]

function AreaChartItem() {
  return (
    <ResponsiveContainer height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='26%' stopColor='#FAA05F' stopOpacity={0.2} />
            <stop offset='74%' stopColor='white' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' stroke='gray' padding={{ left: 40 }} />
        <YAxis tickMargin={20} unit='tr' width={70} axisLine={false} />
        <CartesianGrid vertical={false} className={cx('chartGrid')} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='Total'
          stroke='#FF993C'
          strokeWidth={4}
          fillOpacity={1}
          fill='url(#total)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartItem
