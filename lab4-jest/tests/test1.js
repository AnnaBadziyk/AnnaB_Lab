const { UserService } = require('../labAssignment-lab4');

describe('Task 1: UserService', () => {
  test('greet() calls getFullName with correct arguments and returns uppercase greeting', () => {
    const getFullNameMock = jest.fn().mockReturnValue('John Doe');
    const userService = new UserService(getFullNameMock);

    const result = userService.greet();

    expect(getFullNameMock).toHaveBeenCalledWith('John', 'Doe');
    expect(result).toBe('HELLO, JOHN DOE!');
  });
});
