#!/usr/bin/env node

const flgblogplusCli = require("../src/commands/fblogpulse-cli");

// Check if there is a single command-line argument
if (process.argv.length === 3) {
  // Assumed single argument provided is the file path
  const filePath = process.argv[2];
  flgblogplusCli(filePath);
} else if (process.argv.length === 2 || process.argv.includes('-h') || process.argv.includes('--help')) {
  displayHelp();
} else {
  console.error('Invalid usage. Run with -h or --help for usage information.');
}

function displayHelp() {
  console.log('Usage: flgblogplus-cli [file-path]');
  console.log('Options:');
  console.log('  -h, --help    Display help information');
}
