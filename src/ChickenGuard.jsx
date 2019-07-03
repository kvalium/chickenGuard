import React from 'react';
import PropTypes from 'prop-types';

import {
  Text, View, Button, ActivityIndicator, Image,
} from 'react-native';

import Slider from 'react-native-slider';

import { styles } from './styles';

/**
 * Chicken Guard main screen.
 *
 * @param {*} props see proptypes validation.
 */
export default function ChickenGuard({
  loading,
  twilight,
  onGetTwilight,
  timeBeforeTwilight,
  setTimeBeforeTwilight,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="cover"
          style={styles.image}
          // eslint-disable-next-line global-require
          source={require('../assets/chicken.png')}
        />
        <Text style={{ fontSize: 35 }}>Chicken Guard</Text>
      </View>
      <>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>{`Today's twilight is ${twilight.getUTCHours()}:${twilight.getUTCMinutes()}`}</Text>
            <Button
              onPress={onGetTwilight}
              title="Reload twilight"
              color="#841584"
              accessibilityLabel="Reload the twilight hour"
            />
          </>
        )}
        <Slider
          style={{ width: '100%' }}
          value={timeBeforeTwilight}
          minimumValue={0}
          maximumValue={90}
          step={15}
          onValueChange={setTimeBeforeTwilight}
        />
        <Text>{`${timeBeforeTwilight} min.`}</Text>
      </>
    </View>
  );
}

ChickenGuard.propTypes = {
  loading: PropTypes.bool.isRequired,
  twilight: PropTypes.instanceOf(Date),
  onGetTwilight: PropTypes.func.isRequired,
  timeBeforeTwilight: PropTypes.number.isRequired,
  setTimeBeforeTwilight: PropTypes.func.isRequired,
};

ChickenGuard.defaultProps = {
  twilight: undefined,
};
