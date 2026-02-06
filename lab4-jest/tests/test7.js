const { calculateFinalPrice } = require('../labAssignment-lab4');

describe('Task 7: calculateFinalPrice', () => {
  test('calculates final price correctly for valid order', () => {
    const order = {
      items: [
        { price: 50, quantity: 2 }, // 100
        { price: 30, quantity: 1 }  // 30
      ],
      taxRate: 0.2,
      discountService: {
        getDiscount: () => 0.6 // should be limited to 0.5
      }
    };

    const result = calculateFinalPrice(order, order.discountService);

    // subtotal = 130
    // discount capped at 50% → 65
    // tax 20% → 78
    expect(result).toBe(78);
  });

  test('throws error for invalid order', () => {
    expect(() => calculateFinalPrice({ items: [] })).toThrow('Invalid order');
  });
});
