const path = require('path');
const fs = require('fs');

const pathTextReade = path.resolve(__dirname, 'styles');
const pathTextWrite = path.resolve(__dirname, 'project-dist\\bundle.css');

const output = fs.createWriteStream(pathTextWrite);
fs.readdir(pathTextReade, {withFileTypes: true}, (_, files) => {
  files.forEach(file => {
    const fileArr = file.name.split('.');
    if (file.isFile() && fileArr[fileArr.length - 1] === 'css') {
      const input = fs.createReadStream(`${pathTextReade}\\${file.name}`, 'utf-8');
      input.on('data', slice => output.write(slice));
    }
  });
});