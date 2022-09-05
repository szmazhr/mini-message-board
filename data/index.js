const fs = require('fs');
const path = require('path');

const { parse } = require('csv-parse')
const { stringify } = require("csv-stringify");

const filename = path.join(__dirname, 'messages.csv');
const writableStream = fs.createWriteStream(filename, {flags: 'a'});

const messages = [];

const stringifier = stringify({ header: false, columns: ["text","user","added"] });
stringifier.pipe(writableStream);

fs.createReadStream(filename)
  .pipe(parse({delimiter: ',', from_line: 2}))
  .on("data", function (row) {
    messages.push({text:row[0], user:row[1], added:row[2]});
  })
  .on("end", function () {
    console.log("data loaded");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

module.exports = messages;
module.exports.stringifier = stringifier;
