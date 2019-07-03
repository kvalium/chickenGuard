import { AsyncStorage } from 'react-native';

const sunsetApi = 'https://api.sunrise-sunset.org/json?formatted=0&';

/**
 * Get astronomical twilight end time for the given location.
 *
 * @param {String} lat latitude
 * @param {*} long longitude
 *
 * @returns ISO 8601 date string
 */
export const getTwilight = (lat, long) => fetch(`${sunsetApi}lat=${lat}&lng=${long}`).then(d => d.json()).then(({ results }) => new Date(results.astronomical_twilight_end));

/**
 * Retrieve data from the async storage
 */
export const getAsyncData = async () => {
  const asyncState = await AsyncStorage.getItem('CG_state');
  if (asyncState !== null) {
    const state = JSON.parse(asyncState);
    return { ...state, twilight: new Date(state.twilight), loading: false };
  }
  return null;
};

/**
 * Append data to the async storage
 *
 * @param {Object} data to store to the async storage
 */
export const setAsyncData = async (data) => {
  await AsyncStorage.setItem('CG_state', JSON.stringify(data));
};

/**
 * Returns current position
 */
export const getPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    resolve,
    reject,
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000 },
  );
});
