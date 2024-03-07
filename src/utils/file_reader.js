/**
 * @fileOverview file_reader
 * @module FileReader
 * @description
 * The `file_reader` util provides functionality to read and process text and log files.
 * It includes promise-based functions for reading files and processing their contents.
 * Implements file type validation and enforces size limits for optimized resource
 * utilization and system performance.
 *
 */

const fs = require('fs');
const path = require('path');
const validExtensions = ['.txt', '.log'];

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      // Check if the file has a valid extension (.txt or .log)
      const fileExtension = path.extname(filePath);

      if (!validExtensions.includes(fileExtension)) {
        throw new Error('Invalid file extension. Only .txt or .log files are allowed.');
      }

      // Check if the file size is greater than 2MB
      const fileSize = fs.statSync(filePath).size;
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

      if (fileSize > maxSizeInBytes) {
        throw new Error('File size exceeds the maximum limit of 2MB.');
      }

      // Read file asynchronously
      readFileAsync(filePath)
        .then((fileContents) => resolve(fileContents))
        .catch((err) => reject(new Error(`Error reading file: ${err.message}`)));
    } catch (error) {
      reject(new Error(`Error processing file: ${error.message}`));
    }
  });
}

// Function to read file asynchronously
function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error(`Error reading file: ${err.message}`));
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = readFile;
