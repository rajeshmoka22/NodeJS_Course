import {createInterface} from 'readline';

const readInput = createInterface({
  input: process.stdin,
  output: process.stdout
});

const requestInput = () => {
  readInput.question("Enter a string \n", (str) => {
    console.log(str.split('').reverse().join(''));
    requestInput();
  });
};

requestInput();
