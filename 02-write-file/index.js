const fs = require('fs');
const path = require('path');
const readline = require('node:readline');

const {
  stdin: input,
  stdout: output,
} = require('node:process');

const rl = readline.createInterface({ input, output });
const pathText = path.join(__dirname, 'text.txt');
const write = fs.createWriteStream(pathText);

console.log('Hi');
rl.prompt();
rl.on('line', (input) => {
  if (input !== 'exit'.trim()) {
    rl.prompt();
    write.write(`${input}\n`);
  }else {
    rl.close();
  }
});

process.on('exit', () => console.log('have a good day!'));


