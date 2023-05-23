export default interface TicketType {
  checkStatus: 'Đã đối soát' | 'Chưa đối soát'
  packageName: string
  applyDate: number
  gate: 'Cổng 1' | 'Cổng 2' | 'Cổng 3' | 'Cổng 4' | 'Cổng 5'
  id: string
  statusMessage: 'Chưa sử dụng' | 'Đã sử dụng' | 'Hết hạn'
  type: string
  useDate: number
}
