const { ApiHelper } = require('../labAssignment-lab4');

describe('Task 6: ApiHelper.fetchViaHelper', () => {
  test('returns data from mocked apiCallFunction', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ success: true });
    const apiHelper = new ApiHelper();

    const result = await apiHelper.fetchViaHelper(mockApiCall);

    expect(result).toEqual({ success: true });
    expect(mockApiCall).toHaveBeenCalled();
  });
});
