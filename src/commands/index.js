const fileReader = require('../utils/FileReader');
const processLogData = require('../modules/UserDataProcessor');
const reportDataHandler = require('../modules/ReportDataHandler');

// Extract filePath from command line arguments
const filePath = process.argv[2];

function processFileAndDisplayOnCLI(filePath) {
  fileReader(filePath)
    .then((fileContents) => {
      processedUsersSessionData = processLogData(fileContents)
      reportDataHandler.generateCLIReport(processedUsersSessionData)
    })
    .catch((error) => {
      console.error('Error during processing:', error.message);
    });
}

if (!filePath) {

  console.error('Please provide the path to the file as a command line argument.');
} else {
  processFileAndDisplayOnCLI(filePath);

}


