/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Slider from "react-native-slider";

import {
  StyleSheet, Text, View, Alert, Button, ActivityIndicator, Image
// eslint-disable-next-line import/no-unresolved
} from 'react-native';

import { getTwilight } from './services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6d4',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    margin: 50,
  },
  image: {
    height: 125,
    width: 100,
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twilight: undefined,
      loading: true,
    };
  }

  componentDidMount() {
    this.onGetTwilight();
  }

  onGetTwilight = () => {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const { latitude, longitude } = coords;
        getTwilight(latitude, longitude).then(twilight => this.setState({
          twilight,
          loading: false,
        }));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000 },
    );
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => position,
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000 },
    );
  }


  render() {
    const { loading, twilight } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={require('./assets/chicken.png')}
          />
          <Text style={{fontSize: 35}}>Chicken Guard</Text>
        </View>
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button
                onPress={this.onGetTwilight}
                title="Reload twilight"
                color="#841584"
                accessibilityLabel="Reload the twilight hour"
              />
              <Text style={{fontSize: 20, marginTop: 20}}>{`Today's twilight is ${twilight.getUTCHours()}:${twilight.getUTCMinutes()}`}</Text>
            </>
          )}
          <Slider
            style={{width: 150}}
            value={15}
            minimumValue={0}
            maximumValue={90}
            onValueChange={value => console.log(value)}
          />
        </>
      </View>
    );
  }
}
