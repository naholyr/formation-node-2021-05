const fs = require("fs");

const readableStream = fs.createReadStream("../slides/index.html");

readableStream.on("error", (err) => {
  console.error(new Error(err));
});

readableStream.on("data", (chunk) => {
  console.log("DATA:", chunk);
});

readableStream.on("end", () => {
  console.log("END.");
});

const writableStream = fs.createWriteStream("./stream.txt");

readableStream.pipe(writableStream);

//writableStream.write("coucou");
//writableStream.end();

console.log(process.memoryUsage());
