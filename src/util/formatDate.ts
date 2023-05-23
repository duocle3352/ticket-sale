import { format } from 'date-fns'

const formatDate = (date: number, currentFormat = 'dd/MM/yyyy') => {
  return format(new Date(date), currentFormat)
}

export default formatDate
