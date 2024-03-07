function fillMissingDays(data) {
    for (let i = 1; i < data.values.length; i++) {
        const currentDate = data.values[i].time;
        const previousDate = data.values[i - 1].time;

        // Calculate the difference in days
        const daysDifference = (currentDate - previousDate) / (24 * 60 * 60 * 1000);

        // If there's a gap, fill in missing days
        if (daysDifference > 1) {
            for (let j = 1; j < daysDifference; j++) {
                const missingDate = previousDate + j * (24 * 60 * 60 * 1000);
                data.values.splice(i, 0, {
                    time: missingDate,
                    close: data.values[i - 1].close, // Use previous day's close value
                    // Add other properties as needed
                });
            }
        }
    }
}

// Example usage:
const data = {
    // Your sample data here...
};

fillMissingDays(data);
console.log(data.values); // Updated data with missing days filled
