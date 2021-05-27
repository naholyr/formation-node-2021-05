const fibo = (n) => (n === 0 ? 0 : n === 1 ? 1 : fibo(n - 1) + fibo(n - 2));

// Public oAPI
module.exports = { fibo };
