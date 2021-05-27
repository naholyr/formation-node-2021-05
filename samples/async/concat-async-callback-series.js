const fs = require("fs");

console.log("before");

fs.readFile("1.txt", (err, content1) => {
  process.stdout.write(content1);
  fs.readFile("2.txt", (err, content2) => {
    process.stdout.write(content2);
    fs.readFile("3.txt", (err, content3) => {
      process.stdout.write(content3);
    });
  });
});

console.log("after");
