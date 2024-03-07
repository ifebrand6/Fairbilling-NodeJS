const validFilePath = require('path').join(__dirname, '../../sample/logger.txt');
const invalidFilePath = require('path').join(__dirname, '../../sample/unsupported.rb');
const sampleData = require('path').join(__dirname, '../../sample/sample_data.log');



module.exports = {
validFilePath,
invalidFilePath,
sampleData
};
