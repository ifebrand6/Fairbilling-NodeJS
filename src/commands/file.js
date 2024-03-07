const readFile = require("../utils/file_reader");
const sampleFilePath = require('path').join(__dirname, '../../sample/sample_data.log');
const output = readFile(sampleFilePath)

output.then(output => {
  console.log('Output:', output.length);
}).catch(error => {
  console.error('Error reading file:', error);
});
