const { getEndOfSummer, getStartOfSummer, isSummer } = require("./summer.js");
const { refresh_rate } = require("./config.json");

// maybe todo??: support other holidays

/* 
If it's already summer getCountdownDate returns the date of the first Monday of September, signifying the end of the summer
If it's not over the summer this year, it returns the date of this year's start of the summer
If it's over the summer this year, it returns the date of next year's start of the summer
*/
function getCountdownDate() {
    const today = new Date();
    const year = today.getFullYear();

    // Check if it's already summer
    if (isSummer()) {
        return getEndOfSummer(year); // Return the end date of the current year's summer
    }
  
    const start = getStartOfSummer(year);
    // If the current date is before the calculated start date, consider it as the start date of the current year's summer
    if (today < start) {
        return getStartOfSummer(year);
    }
  
    // Return the start date of the next year's summer
    return getStartOfSummer(year + 1);
}

const _day = 1000 * 60 * 60 * 24;
const _hour = 1000 * 60 * 60;
const _minute = 1000 * 60;
const _second = 1000;

/*
getTimeRemaining calculates the remaining days, hours, minutes and days to a given date
*/
function getTimeRemaining() {
    const now = new Date();
    const target = getCountdownDate();

    const timeRemaining = target - now;

    const days = Math.floor(timeRemaining / _day);
    const hours = Math.floor((timeRemaining % _day) / _hour);
    const minutes = Math.floor((timeRemaining % _hour) / _minute);
    const seconds = Math.floor((timeRemaining % _minute) / _second);

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

/*
setupCountdown returns a interval being the countdown, that calls callback with an update every x milliseconds (specified by refresh_rate)
*/
function setupCountdown(callback) {
    const update = () => {
        const timeRemaining = getTimeRemaining();
        callback(timeRemaining);
    }
    return setInterval(update, refresh_rate);
}

module.exports = {
    setupCountdown,
};