const fs = require("fs/promises");

const buffer1P = fs.readFile("1.txt");
const buffer2P = fs.readFile("2.txt");
const buffer3P = fs.readFile("3.txt");

Promise.all([buffer1P, buffer2P, buffer3P])
  .then((buffers) => {
    const buffer = Buffer.concat(buffers);
    process.stdout.write(buffer);
  })
  .catch((error) => {
    console.log(error);
  });
