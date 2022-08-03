/**
 * Utility Functions for Small top Widgets of Dashboard
 */
import { timeCalc } from './dataUtil'

/**
 * returns true if date is in the past, false if future
 * @param {*} date - date in question
 */
function pastOrPresent(date) {
    var now = new Date();
    return date < now
}

export function getTime(date, subtitleString, amountString = null) {
    const isPast = pastOrPresent(new Date(date));
    const timeInterval = timeCalc(new Date(date));
    // past date is Green, upcoming date is red
    const icon = isPast ?
        ({
            // past date
            iconColor: 'rgb(0, 194, 146)',
            iconBg: 'rgb(235, 250, 242)',
            pcColor: 'green-600',
        }) :
        ({
            // upcoming date
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            pcColor: 'red-600',
        })

    // past date is "___ ago", upcoming date is "in ___"
    const time = isPast ?
        (`${timeInterval} ago`) :
        (`in ${timeInterval}`)

    return {
        amount: amountString || date,
        time,
        title: `${pastOrPresent(new Date(date)) ? 'Latest' : 'Upcoming'} ${subtitleString}`,
        ...icon
    }
}