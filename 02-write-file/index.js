const fs = require('fs');
const path = require('path');
const readline = require('node:readline');

const {
  stdin: input,
  stdout: output,
} = require('node:process');

const rl = readline.createInterface({ input, output });
const pathText = path.resolve(__dirname, 'text.txt');
const write = fs.createWriteStream(pathText);

console.log('Привет ввидите сообщение!');
rl.prompt();
rl.on('line', (input) => {
  if (input !== 'exit') {
    rl.prompt();
    write.write(`${input}\n`);
  }else {
    rl.close();
  }
});

process.on('exit', () => console.log('Пака!'));



