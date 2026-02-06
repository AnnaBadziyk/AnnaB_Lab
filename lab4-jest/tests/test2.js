const { asyncHello } = require('../labAssignment-lab4');

describe('Task 2: asyncHello', () => {
  test('promise resolves with "hello world"', async () => {
    await expect(asyncHello()).resolves.toBe('hello world');
  });
});
