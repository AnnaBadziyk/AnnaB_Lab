const { asyncError } = require('../labAssignment-lab4');

describe('Task 4: asyncError', () => {
  test('promise rejects with error "Something went wrong"', async () => {
    await expect(asyncError()).rejects.toThrow('Something went wrong');
  });
});
