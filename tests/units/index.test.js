const dataSanitizer = require("../../src/modules/data_sanitizer");
const generateUsersReport = require("../../src/modules/user_data_processor");
const dataFactory = require("../factories/dataFactory");



describe('DataSanitizer', () => {
  test('should process data correctly', () => {
    const data = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.sampleData);

    // Assert that user sessions occur in pairs (a basic way to check if the length is even)
    expect(data.length % 2).toBe(0);

    // assert that it contains '14:00:01 ALICE99 End' as the last element
    const lastElement = data[data.length - 1];
    expect(lastElement).toBe('14:00:02 ALICE99 End');
  });

  test('should return empty response for no valid data', () => {
    const data = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.emptySampleData);

    // Assert that it returns an empty array
    expect(data.length).toBe(0);
  });
});


describe('UserDataProcessor', () => {
  test('should compute user data correctly', () => {
    const sanitizeData = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.sampleData);
    const processedUsersSessionData = generateUsersReport(sanitizeData)

    expect(Array.isArray(processedUsersSessionData)).toBe(true);

    expect(processedUsersSessionData[0].name).toBe('ALICE99');
    expect(processedUsersSessionData[0].sessionCount).toBe(4);
    expect(processedUsersSessionData[0].duration).toBe(240);
  });
});

describe('ReportDataHandler', () => {
  describe('generateCLIReport', () => {
    test('should correctly format data for CLI', () => {
      const sampleData = [
        { name: 'ALICE99', sessionCount: 3, durationInSeconds: 300 },
        { name: 'BOB123', sessionCount: 2, durationInSeconds: 180 }
      ];

      // Create a mock for console.log
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

      // Call the function
      ReportDataHandler.generateCLIReport(sampleData);

      // Add assertions based on the expected console.log calls
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ALICE99'),
        expect.stringContaining('BOB123')
      );

      // Restore the original console.log after the test
      consoleSpy.mockRestore();
    });
  });
});



