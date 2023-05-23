import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface Props {
  data: object[]
}

const COLORS = ['#4F75FF', '#FF8A48']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
      {value}
    </text>
  )
}

function CircleChart({ data }: Props) {
  return (
    <ResponsiveContainer height={140}>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          cx='50%'
          cy='50%'
          startAngle={-270}
          innerRadius={20}
          outerRadius={60}
          stroke='none'
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CircleChart
