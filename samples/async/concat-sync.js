const fs = require("fs");

const content1 = fs.readFileSync("1.txt");
const content2 = fs.readFileSync("2.txt");
const content3 = fs.readFileSync("3.txt");

const buffer = Buffer.concat([content1, content2, content3]);

process.stdout.write(buffer);
