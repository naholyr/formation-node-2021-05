export const fibo = (n) => {
  if (typeof n !== 'number' || isNaN(n)) return NaN;
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibo(n - 1) + fibo(n - 2);
}
