const { spawnSync } = require('child_process');
const { sampleData, invalidFilePath } = require('./factories/dataFactory');
const path = require('path').join(__dirname, 'src/commands/fblogpulse-cli.js');


describe('CLI App', () => {
  test('command is called with a file containing invalid input', () => {
    const result = spawnSync('node', [`${path}`, sampleData], { encoding: 'utf-8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('4');
    expect(result.stdout).toContain('ALICE99');
  });

  test('command is called without a file argument', () => {
    const result = spawnSync('node', [`${path}`], { encoding: 'utf-8' });
    expect(result.status).toBe(1); // Assuming exit code 1 for missing file argument
    expect(result.stderr).toContain('Specify file');
  });

  test('command is called with a file containing only invalid input', () => {
    const filePath = 'path/to/invalid/file.txt'; // Provide a file with invalid input
    const result = spawnSync('node', [`${path}`, `${invalidFilePath}`], { encoding: 'utf-8' });
    expect(result.status).toBe(0); // Assuming the app gracefully handles invalid input
    expect(result.stdout).toBe(''); // Adjust this based on your app's behavior
  });


  test('command is called with a non existence file path', () => {
    const command = `node ${path} nonexistentfile.txt`;
    const output = execSync(command).toString();
  });
});
