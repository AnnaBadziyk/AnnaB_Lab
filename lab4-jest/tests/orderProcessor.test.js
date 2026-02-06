const { OrderProcessor } = require('../labAssignment-lab4');

describe('Task 8: OrderProcessor.processOrder', () => {
  test('returns converted price when converter works', async () => {
    const converterMock = jest.fn().mockResolvedValue(200);
    const processor = new OrderProcessor(converterMock);

    const order = {
      items: [{ price: 100, quantity: 1 }],
      taxRate: 0,
      currency: 'USD'
    };

    const result = await processor.processOrder(order, 'EUR');

    expect(result).toBe(200);
    expect(converterMock).toHaveBeenCalled();
  });

  test('returns original price when converter throws error', async () => {
    const converterMock = jest.fn().mockRejectedValue(new Error('Conversion failed'));
    const processor = new OrderProcessor(converterMock);

    const order = {
      items: [{ price: 100, quantity: 1 }],
      taxRate: 0,
      currency: 'USD'
    };

    const result = await processor.processOrder(order, 'EUR');

    expect(result).toBe(100);
  });
});
