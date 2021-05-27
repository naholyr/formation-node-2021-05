import { routeFibo } from './index.mjs';

const mockFibo = jest.fn();

jest.mock('./fibo.mjs', () => {
  return {
    fibo: (n) => mockFibo(n),
  };
});

describe('Fibo (route)', () => {
  it('should call fibo', () => {
    mockFibo.mockImplementation(() => 42);
    const req = {
      params: {
        number: '10',
      }
    };
    const res = {
      send: jest.fn(),
    };
    routeFibo(req, res);
    expect(mockFibo).toHaveBeenCalledWith(10);
    expect(res.send).toHaveBeenCalledWith({ input: 10, output: 42 });
  });
});

