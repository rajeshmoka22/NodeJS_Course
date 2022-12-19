import {csv} from 'csvtojson';
import {createWriteStream, createReadStream} from 'fs';
import path from 'path';

// Windows
// const inputFile = __dirname+'..\\csv\\csvFile.csv';
// const outputFile = __dirname+'..\\csv\\output.txt';

//mac or linux
const inputFile = path.join(__dirname, '../csv/csvFile.csv');
const outputFile = path.join(__dirname, '../csv/output.txt');

const writeStream = createWriteStream(outputFile, {flags: 'r+'});
const readStream = createReadStream(inputFile);

const writeIntoFile = (json) => {
  try {
    // fs.appendFileSync(outputFile, `${JSON.stringify(json)}\n`);
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

csv()
.fromStream(readStream)
.subscribe(writeIntoFile, onError, onComplete);
