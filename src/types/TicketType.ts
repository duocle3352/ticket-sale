export default interface TicketType {
  id: number
  applyDate: number
  useDate: number
  packageName: string
  type: string
  checkStatus: 'Đã đối soát' | 'Chưa đối soát'
  gate: 'Cổng 1' | 'Cổng 2' | 'Cổng 3' | 'Cổng 4' | 'Cổng 5'
  statusMessage: 'Chưa sử dụng' | 'Đã sử dụng' | 'Hết hạn'
}
