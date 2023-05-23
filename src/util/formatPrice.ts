export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('De-de').format(price)
}
