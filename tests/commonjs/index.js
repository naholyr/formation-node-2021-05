const { fibo } = require('./fibo.js');

const routeFibo = (req, res) => {
  const input = Number(req.params.number);
  const output = fibo(input);
  res.send({ input, output });
}

module.exports = { routeFibo };
