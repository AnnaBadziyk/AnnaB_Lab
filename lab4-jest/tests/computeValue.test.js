const { computeValue } = require('../labAssignment-lab4');

describe('Task 3: computeValue', () => {
  test('returns value equal to 94', async () => {
    const result = await computeValue();
    expect(result).toBe(94);
  });
});
