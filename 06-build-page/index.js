const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathTextReade = path.resolve(__dirname);
const pathTextWrite = path.resolve(__dirname, 'project-dist');


fsPromises.mkdir(pathTextWrite, { recursive: true }).then(function() {
  //create style.css file
  const pathCssReade = `${pathTextReade}\\styles`;
  const pathCssWrite = `${pathTextWrite}\\style.css`;
  const output = fs.createWriteStream(pathCssWrite);
  fs.readdir(pathCssReade, {withFileTypes: true}, (_, files) => {
    files.forEach(file => {
      const fileArr = file.name.split('.');
      if (file.isFile() && fileArr[fileArr.length - 1] === 'css') {
        const input = fs.createReadStream(`${pathCssReade}\\${file.name}`, 'utf-8');
        input.on('data', slice => output.write(slice));
      }
    });
  });
});

//copy assets

function copyDir(pathReade, pathWrite) {
  fsPromises.mkdir(pathWrite, { recursive: true }).then(function() {
    fs.readdir(pathReade, {withFileTypes: true}, (_, files) => {
      files.forEach(file => {
        if (file.isFile()) {
          const pathR = `${pathReade}\\${file.name}`;
          const pathW = `${pathWrite}\\${file.name}`;
          const input = fs.createReadStream(pathR, 'utf-8');
          const output = fs.createWriteStream(pathW);
          input.on('data', slice => output.write(slice));
        }else {
          const pathR = `${pathReade}\\${file.name}`;
          const pathW = `${pathWrite}\\${file.name}`;
          copyDir(pathR, pathW);
        }
      });
    });
  });
}

const pathAssetsWrite = `${pathTextWrite}\\assets`;
const pathAssetsReade = `${pathTextReade}\\assets`;
copyDir(pathAssetsReade, pathAssetsWrite);




