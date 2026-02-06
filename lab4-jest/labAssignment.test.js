const {
  UserService,
  asyncHello,
  computeValue,
  asyncError,
  ApiClient,
  ApiHelper,
  calculateFinalPrice,
  OrderProcessor
} = require('./labAssignment');

describe('Task 1: UserService', () => {
  test('greet() calls getFullName with correct arguments and returns uppercase greeting', () => {
    const getFullNameMock = jest.fn().mockReturnValue('John Doe');
    const userService = new UserService(getFullNameMock);

    const result = userService.greet();

    expect(getFullNameMock).toHaveBeenCalledWith('John', 'Doe');
    expect(result).toBe('HELLO, JOHN DOE!');
  });
});

describe('Task 2: asyncHello', () => {
  test('promise resolves with "hello world"', async () => {
    await expect(asyncHello()).resolves.toBe('hello world');
  });
});

describe('Task 3: computeValue', () => {
  test('returns value equal to 94', async () => {
    const result = await computeValue();
    expect(result).toBe(94);
  });
});

describe('Task 4: asyncError', () => {
  test('promise rejects with error "Something went wrong"', async () => {
    await expect(asyncError()).rejects.toThrow('Something went wrong');
  });
});

describe('Task 5: ApiClient.fetchData', () => {
  test('returns fetched data with fetchedAt field', async () => {
    const mockData = { id: 1, name: 'Test' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    const apiClient = new ApiClient();
    const result = await apiClient.fetchData();

    expect(result).toMatchObject(mockData);
    expect(typeof result.fetchedAt).toBe('number');

    global.fetch.mockRestore();
  });
});

describe('Task 6: ApiHelper.fetchViaHelper', () => {
  test('returns data from mocked apiCallFunction', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    const apiHelper = new ApiHelper();

    const result = await apiHelper.fetchViaHelper(mockApiCall);

    expect(result).toEqual({ success: true });
    expect(mockApiCall).toHaveBeenCalled();
  });
});

describe('Task 7: calculateFinalPrice', () => {
  test('calculates final price correctly for valid order', () => {
    const order = {
      items: [
        { price: 50, quantity: 2 }, // 100
        { price: 30, quantity: 1 }  // 30
      ],
      taxRate: 0.2,
      discountService: {
        getDiscount: () => 0.6 // должно быть ограничено до 0.5
      }
    };

    const result = calculateFinalPrice(order, order.discountService);

    // subtotal = 130
    // discount = 50% → 65
    // tax 20% → 78
    expect(result).toBe(78);
  });

  test('throws error for invalid order', () => {
    expect(() => calculateFinalPrice({ items: [] })).toThrow('Invalid order');
  });
});

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
