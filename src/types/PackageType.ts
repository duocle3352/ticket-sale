export default interface PackageType {
  id: string
  applyDate: string
  applyTime: string
  comboPrice?: string
  comboQuantity?: string
  expirationDate: string
  expirationTime: string
  name: string
  price: string
  statusMessage: 'Đang áp dụng' | 'Tắt'
}
