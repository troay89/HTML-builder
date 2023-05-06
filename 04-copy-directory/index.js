const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathTextReade = path.resolve(__dirname, 'files');
const pathTextWrite = path.resolve(__dirname, 'files-copy');

function copyDir(pathReade, pathWrite) {
  fsPromises.mkdir(pathWrite, { recursive: true }).then(function() {
    fs.readdir(pathReade, {withFileTypes: true}, (_, files) => {
      files.forEach(file => {
        if (file.isFile()) {
          const pathR = `${pathReade}\\${file.name}`;
          const pathW = `${pathWrite}\\${file.name}`;
          const input = fs.createReadStream(pathR, 'utf-8');
          const output = fs.createWriteStream(pathW);
          input.on('data', chunk => output.write(chunk));
        }else {
          const pathR = `${pathReade}\\${file.name}`;
          const pathW = `${pathWrite}\\${file.name}`;
          copyDir(pathR, pathW);
        }
      });
    });
  });
}

copyDir(pathTextReade, pathTextWrite);



