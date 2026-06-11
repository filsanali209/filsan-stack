let orders = []
let nextOrderId = 1

function addOrder({ customerId, items, total, shippingAddress }) {
  if (!customerId || !items || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
    throw new Error('Invalid order data')
  }

  const order = {
    id: nextOrderId++,
    customerId,
    items,
    total,
    shippingAddress: shippingAddress || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  orders.push(order)
  return order
}

function getOrderById(orderId) {
  return orders.find((order) => order.id === orderId) || null
}

function getOrders(filter = {}) {
  return orders.filter((order) => {
    if (filter.customerId && order.customerId !== filter.customerId) {
      return false
    }
    if (filter.status && order.status !== filter.status) {
      return false
    }
    return true
  })
}

function clearOrders() {
  orders = []
  nextOrderId = 1
}

module.exports = {
  addOrder,
  getOrderById,
  getOrders,
  clearOrders,
}
