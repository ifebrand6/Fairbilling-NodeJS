const readFile = require('../src/utils/file_reader');
const validFilePath = require('path').join(__dirname, '../sample/logger.txt');
const invalidFilePath = require('path').join(__dirname, '../sample/unsupported.rb');




describe('file_reader', () => {
  describe('readFile', () => {
    test('should read and process a valid file', async () => {
      const processedData = await readFile(validFilePath);
      expect(processedData).toBeDefined();
    });

    test('should throw an error for an invalid file', async () => {
      await expect(readFile(invalidFilePath)).rejects.toThrowError();
    });
  });
});
