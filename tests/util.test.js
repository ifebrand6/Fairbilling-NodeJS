const readFile = require('../src/utils/file_reader');
const dataFactory = require('./factories/dataFactory');

describe('file_reader', () => {
  describe('readFile', () => {
    test('should read and process a valid file', async () => {
      const processedData = await readFile(dataFactory.validFilePath);
      expect(processedData).toBeDefined();
    });

    test('should throw an error for an invalid file', async () => {
      await expect(readFile(dataFactory.invalidFilePath)).rejects.toThrowError();
    });
  });
});
