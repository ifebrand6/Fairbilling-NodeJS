#! /usr/bin/env node

const processData = require('../src/commands/fblogpulse-cli');

const args = process.argv.slice(2);

// Ensure a file path is provided
if (args.length !== 1) {
  console.error('Usage: fblogpulse-cli  <dataFilePath>');
  console.error('Please provide the path to the data file.');
  process.exit(1);
}

// Extract the data file path from the command-line argument
const dataFilePath = args[0];

// Run the data processing logic
processData(dataFilePath);
