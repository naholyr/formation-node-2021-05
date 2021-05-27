import { fibo } from './fibo.mjs';

console.log(fibo);

export const routeFibo = (req, res) => {
  console.log(fibo);
  const input = Number(req.params.number);
  const output = fibo(input);
  res.send({ input, output });
}
