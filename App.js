/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Slider from 'react-native-slider';

import { Text, View, Alert, Button, ActivityIndicator, Image } from 'react-native';

import { Notifications } from 'expo';

import { getTwilight, getAsyncData, getPosition, setAsyncData } from './src/services';
import styles from "./src/styles";;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twilight: undefined,
      loading: true,
      timeBeforeTwilight: 0,
    };
  }

  componentDidMount() {
    getAsyncData()
      .then(asyncState => (asyncState ? this.setState(asyncState) : this.onGetTwilight()))
      .catch(e => Alert.alert(e.message));
  }

  /**
   * On get twilight button pressed, get current location,
   * fetch new tw from the API for the location
   * then persist new state to async store.
   */
  onGetTwilight = () => {
    this.setState({ loading: true });
    getPosition().then(({ coords }) => {
      const { latitude, longitude } = coords;
      getTwilight(latitude, longitude).then(twilight => this.setState({
        twilight,
        loading: false,
      }));
      setAsyncData(this.state);
    }).catch(e => Alert.alert(e.message));
  }

  setTimeBeforeTwilight = timeBeforeTwilight => this.setState({timeBeforeTwilight});

  render() {
    const { loading, twilight, timeBeforeTwilight } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require('./assets/chicken.png')}
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
                onPress={this.onGetTwilight}
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
            onValueChange={this.setTimeBeforeTwilight}
          />
          <Text>{`${timeBeforeTwilight} min.`}</Text>
        </>
      </View>
    );
  }
}
