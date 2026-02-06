const { ApiClient } = require('../labAssignment-lab4');

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
