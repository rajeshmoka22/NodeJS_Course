const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Windows
// const inputFile = __dirname+'\\csv\\csvFile.csv';
// const outputFile = __dirname+'\\csv\\output.txt';

//mac or linux
const inputFile = path.join(__dirname, '/csv/csvFile.csv');
const outputFile = path.join(__dirname, '/csv/output.txt');

const writeStream = fs.createWriteStream(outputFile, {flags: 'r+'});
const readStream = fs.createReadStream(inputFile);

const writeIntoFile = function(json) {
  try {
    writeStream.write(`${JSON.stringify(json)}\n`);
  } catch(err){
    console.log('unable to append', err?.message || '');
  }
};

const onError = err => {
  console.log('error reading line', err);
}

const onComplete = () => {
  console.log('writing complete');
}

const performConversion = () => {
  csv()
    .fromStream(readStream)
    .subscribe(writeIntoFile, onError, onComplete);
};

performConversion();
