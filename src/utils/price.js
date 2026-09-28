// ✏️ Edit shipping rules here
export const SHIPPING_FEE = 5
export const FREE_SHIPPING_ABOVE = 100

// Price of one unit after discount
export const unitPrice = (item) => {
  const price = Number(item.price) || 0
  const discount = Number(item.discount) || 0
  return discount > 0 ? price - (price * discount) / 100 : price
}

export const calcTotals = (items) => {
  const original = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0)
  const subtotal = items.reduce((sum, i) => sum + unitPrice(i) * (Number(i.quantity) || 1), 0)
  const savings = original - subtotal
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE
  const total = subtotal + shipping
  return { original, subtotal, savings, shipping, total }
}