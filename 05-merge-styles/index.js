const path = require('path');
const fs = require('fs');

const pathTextReade = path.resolve(__dirname, 'styles');
const pathTextWrite = path.resolve(__dirname, 'project-dist\\bundle.css');

const output = fs.createWriteStream(pathTextWrite);
fs.readdir(pathTextReade, {withFileTypes: true}, (_, files) => {
  files.forEach(file => {
    if (file.isFile() && file.name.includes('.css')) {
      const input = fs.createReadStream(`${pathTextReade}\\${file.name}`, 'utf-8');
      input.on('data', chunk => output.write(chunk));
    }
  });
});