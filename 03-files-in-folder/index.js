const path = require('path');
const fs = require('fs');
const { stat } = require('fs');

const pathText = path.resolve(__dirname, 'secret-folder');

fs.readdir(pathText, {withFileTypes: true}, (_, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      stat(`${pathText}\\${file.name}`, (err, { size }) => {
        console.log(file.name.replace('.',' - ') + ' - ' + size/1024 + 'kb');
      });
    }
  });
});