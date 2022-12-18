const readLine = require('readline');
const readInput = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function requestInput(){
  readInput.question("Enter a string \n", (str) => {
    console.log(str.split('').reverse().join(''));
    requestInput();
  });
})();
