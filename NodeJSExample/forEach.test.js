const { forEach } = require('./forEach');

test('forEach calls callback', () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([1, 2], mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(1);
  expect(mockCallback.mock.calls[1][0]).toBe(2);
});
