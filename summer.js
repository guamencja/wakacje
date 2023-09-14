/*
getEndOfSummer returns the date for the first Monday of September of the year
*/
function getEndOfSummer(year) { // broken
    const end = new Date(year, 8, 1); // September is represented as 8
    if (end.getDay() !== 1) {
        // If the first day of September is not a Monday, calculate the date for the next Monday
        end.setDate(1 + ((8 - end.getDay() + 7) % 7));
    }
    return end
}

/*
getStartOfSummer returns the date for the second-to-last Saturday of June of the year
*/
function getStartOfSummer(year) { 
    const start = new Date(year, 5, 1); // June is represented as 5 because months are zero-indexed
    start.setDate(start.getDate() + (27 - start.getDay()));
    return start;
}

/*
isSummer returns whether today falls between the summer season
*/
function isSummer() { // broken
    const today = new Date();
    const year = today.getFullYear();
    const start = getStartOfSummer(year);
    const end = getEndOfSummer(year);

    // Check if the current date is within the summer date range
    return today >= start && today <= end;
}

module.exports = {
    getEndOfSummer,
    getStartOfSummer,
    isSummer,
};