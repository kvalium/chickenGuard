/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Alert, Button,
// eslint-disable-next-line import/no-unresolved
} from 'react-native';

import { getTwilight } from './services';

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [location, setLocation] = useState();
  const [twilight, setTwilight] = useState();

  const onGetTwilight = () => {
    const { latitude, longitude } = location;
    Alert.alert(JSON.stringify(getTwilight(latitude, longitude)));
    getTwilight(latitude, longitude).then(setTwilight);
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation(position.coords);
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 100000 },
  );

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app !</Text>
      {location && (
        <>
          <Button
            onPress={onGetTwilight}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Text>{location.latitude}</Text>
          <Text>{location.longitude}</Text>
          <Text>{twilight}</Text>
        </>
      )}

    </View>
  );
}
