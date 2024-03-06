// dataProcessor.js

const fs = require('fs');

function processData(dataFilePath) {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    console.log(`Data file contents:\n${data}`);
    // Your logic for processing the data goes here
  } catch (error) {
    console.error(`Error reading the data file: ${error.message}`);
    process.exit(1);
  }
}

module.exports = processData;
