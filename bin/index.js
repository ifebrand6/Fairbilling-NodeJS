#! /usr/bin/env node

const fileReader = require('../src/utils/FileReader');
const displayUserDataInCLI = require('../src/modules/CLIPresentation');
const computeData = require('../src/modules/UserDataProcessor');

// Extract filePath from command line arguments
const filePath = process.argv[2];

function processFileAndDisplayOnCLI(filePath) {
  fileReader(filePath)
    .then((fileContents) => {
      processedUserData = computeData(fileContents)
      displayUserDataInCLI(processedUserData)
    })
    .catch((error) => {
      console.error('Error during processing:', error.message);
    });
}

// TODO optimized this: fileRead module should handle the exception when no file is specify
if (!filePath) {

  console.error('Please provide the path to the file as a command line argument.');
} else {
  processFileAndDisplayOnCLI(filePath);

}
