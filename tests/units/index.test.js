const dataSanitizer = require("../../src/modules/data_sanitizer");
const { generateCLIReport } = require("../../src/modules/report_data_handler");
const generateUsersReport = require("../../src/modules/user_data_processor");
const dataFactory = require("../factories/dataFactory");



describe('DataSanitizer', () => {
  test('should process data correctly', () => {
    // console.log(dataFactory.sampleData)
    const data = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.sampleData);

    // Assert that user sessions occur in pairs (a basic way to check if the length is even)
    expect(data.length % 2).toBe(0);

    // assert that it contains '14:00:01 ALICE99 End' as the first element
    const lastElement = data[data.length - 1];
    expect(lastElement).toBe('14:04:41 CHARLIE End');
  });

  test('should return error for file with no valid data / empty file', () => {
    const data = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.emptySampleData);
    expect(data.length).toBe(0);
  });

  test('should filter out events that has different time format', () => {
    const data = dataSanitizer.sanitizeAndPrepareUserSessions(dataFactory.badTimeFormatData);
    expect(data.length).toBe(0);
  });
});


describe('UserDataProcessor', () => {
  test('should compute user data correctly', () => {
    const processedUsersSessionData = generateUsersReport(dataFactory.sampleData)
    expect(Array.isArray(processedUsersSessionData)).toBe(true);
    const first_user = processedUsersSessionData[0]

    expect(first_user.name).toBe('CHARLIE');
    expect(first_user.sessionCount).toBe(3);
    expect(first_user.duration).toBe(37);
  });
});

describe('ReportDataHandler', () => {
  describe('generateCLIReport', () => {
    test('should correctly format data for CLI', () => {
      const sampleData = [
        { name: 'ALICE99', sessionCount: 3, durationInSeconds: "300" },
        { name: 'BOB123', sessionCount: 2, durationInSeconds: "180" }
      ];

      // Create a mock for console.log
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

      // Call the function
      generateCLIReport(sampleData);

      // Add assertions based on the expected console.log calls
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ALICE99')
      );

      // Restore the original console.log after the test
      consoleSpy.mockRestore();
    });
  });
});



