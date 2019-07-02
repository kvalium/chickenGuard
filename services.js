const sunsetApi = 'https://api.sunrise-sunset.org/json?formatted=0&';

/**
 * Get astronomical twilight end time for the given location.
 *
 * @param {String} lat latitude
 * @param {*} long longitude
 *
 * @returns ISO 8601 date string
 */
export const getTwilight = (lat, long) => fetch(`${sunsetApi}lat=${lat}&lng=${long}`).then(d => d.json());

export default getTwilight;
