const fs = require("fs");

let content1, content2, content3;

fs.readFile("1.txt", (err, content) => {
  if (err) {
    onError(new Error(err));
    return; // early return
  }
  content1 = content;
  maybeFinished();
});

fs.readFile("2.txt", (err, content) => {
  if (err) {
    onError(new Error(err));
    return; // early return
  }
  content2 = content;
  maybeFinished();
});

fs.readFile("3.txt", (err, content) => {
  if (err) {
    onError(new Error(err));
    return; // early return
  }
  content3 = content;
  maybeFinished();
});

const onError = (err) => {
  console.error(err.message);
  console.error("Stack:", err.stack);
};

const maybeFinished = () => {
  if (content1 && content2 && content3) {
    writeAll();
  }
};

const writeAll = () => {
  const buffer = Buffer.concat([content1, content2, content3]);
  process.stdout.write(buffer);
};

console.log("after");
