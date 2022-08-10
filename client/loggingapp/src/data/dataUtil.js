/**
 * Misc. Utility functions for data populated across all areas of Dashboard
 */
 import { outdoorLogo, indoorLogo, emaneLogo, demoLogo, newLogo, mapLogo } from './dashLogos'
/**
 * Get time until or time since a certain date
 * @param {*} date - the date we are calculating from
 * @returns closest time until + interval increment
 */
 export function timeCalc(date) {

    var seconds = Math.floor(
        (new Date() - date) / 1000
    );
    // if negative num is calculated, this is instead a future time
    // and should be calculated according to that...
    if (seconds < 0)
        seconds = Math.floor(
            (date - new Date()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
}

export function getTestType(testType) {
    return testType === 'demo' ? { ...demoLogo }
            : testType === 'outdoor' ? { ...outdoorLogo }
                : testType === 'indoor' ? { ...indoorLogo }
                    : testType === 'emane' ? { ...emaneLogo }
                        : { ...newLogo }
}

export function getMapLogo() {
    return { ...mapLogo }
}