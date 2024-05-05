const User = require('../../models/user');
const bcrypt = require('bcrypt');

describe('User Registration', () => {
  test('Hashes password before saving', async () => {
    const username = "newuser";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create = jest.fn().mockResolvedValue({ id: 123, username, password: hashedPassword });

    await User.create(username, hashedPassword);

    expect(User.create).toHaveBeenCalledWith(username, expect.any(String));
    expect(bcrypt.compareSync(password, await User.create.mock.calls[0][1])).toBeTruthy();
  });
});
