const fs = require("fs/promises");

const main = async () => {
  try {
    /* series:
    const buffer1 = await fs.readFile("1.txt");
    const buffer2 = await fs.readFile("2.txt");
    const buffer3 = await fs.readFile("3.txt");
    const buffers = [buffer1, buffer2, buffer3];
    */

    /* parallel:
    const buffer1P = fs.readFile("1.txt");
    const buffer2P = fs.readFile("2.txt");
    const buffer3P = fs.readFile("3.txt");
    const buffers = await Promise.all([buffer1P, buffer2P, buffer3P]);
    */

    // WTF
    const buffer1P = fs.readFile("1.txt"); // 2s
    const buffer2P = fs.readFile("2.txt"); // 3s
    const buffer3P = fs.readFile("3.txt"); // 1s
    const buffer1 = await buffer1P; // T+2s
    const buffer2 = await buffer2P; // T+1s
    const buffer3 = await buffer3P; // T+0s
    const buffers = [buffer1, buffer2, buffer3];

    // Write
    const buffer = Buffer.concat(buffers);
    process.stdout.write(buffer);
  } catch (err) {
    console.log(err);
  }
};

main();
