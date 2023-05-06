const fs = require('fs');
const path = require('path');

const { stdout } = process;

const pathText = path.resolve(__dirname, 'text.txt');
const steam = fs.createReadStream(pathText, 'utf-8');
steam.on('data', piece => stdout.write(piece));
