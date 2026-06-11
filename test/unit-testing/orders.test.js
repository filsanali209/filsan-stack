var orders

describe('addOrder', () => {

    beforeAll(() => {
        orders = require('./orders');
    });

    test('creates a valid order', () => {
      const order = orders.addOrder({
        customerId: 1,
        items: [{ productId: 101, quantity: 2 }],
        total: 49.99,
        shippingAddress: '123 Main St',
    });

    expect(order.id).toBe(1);
    expect(order.customerId).toBe(1);
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(49.99);
    expect(order.shippingAddress).toBe('123 Main St');
    expect(order.status).toBe('pending');
    expect(order.createdAt).toBeDefined();
    });



})
