export default interface PackageType {
  id: number
  applyDate: number
  comboPrice?: string
  comboQuantity?: string
  expirationDate: number
  name: string
  price?: string
  statusMessage: 'Đang áp dụng' | 'Tắt'
}
