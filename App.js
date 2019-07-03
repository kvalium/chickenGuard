/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Slider from "react-native-slider";

import {
  StyleSheet, Text, View, Alert, Button, ActivityIndicator, Image, AsyncStorage
// eslint-disable-next-line import/no-unresolved
} from 'react-native';

import { getTwilight } from './services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6d4',
    alignItems: 'center',
    padding: 50
  },
  header: {
    alignItems: 'center',
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
      timeBeforeTwilight: 0,
    };
  }

  componentDidMount() {
    getData = async () => {
      try {
        const asyncState = await AsyncStorage.getItem('CG_state')
        if(asyncState !== null) {
          console.log("get data from store", asyncState);
            const state = JSON.parse(asyncState);
          this.setState({...state, twilight: new Date(state.twilight), loading: false });
        } else {
          this.onGetTwilight();
        }
      } catch(e) {
        Alert.alert(error.message);
      }
    }
    getData();
  }

  /**
   * On get twilight button pressed, get current location,
   * fetch new tw from the API for the location
   * then persist new state to async store.
   */
  onGetTwilight = () => {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const { latitude, longitude } = coords;
        getTwilight(latitude, longitude).then(twilight => this.setState({
          twilight,
          loading: false,
        }));
        storeData = async () => {
          try {
            console.log("saving to store", JSON.stringify(this.state));
            await AsyncStorage.setItem('CG_state', JSON.stringify(this.state))
          } catch (e) {
            Alert.alert(e.message);
          }
        }
        storeData();
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 100000 }, 
    );
  }

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
          <Text style={{fontSize: 35}}>Chicken Guard</Text>
        </View>
        <>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Text style={{fontSize: 20, marginBottom: 20}}>{`Today's twilight is ${twilight.getUTCHours()}:${twilight.getUTCMinutes()}`}</Text>
              <Button
                onPress={this.onGetTwilight}
                title="Reload twilight"
                color="#841584"
                accessibilityLabel="Reload the twilight hour"
              />
            </>
          )}
          <Slider
            style={{width: "100%"}}
            value={timeBeforeTwilight}
            minimumValue={0}
            maximumValue={90}
            step={15}
            onValueChange={value => this.setState({timeBeforeTwilight: value})}
          />
          <Text>{`${timeBeforeTwilight} min.`}</Text>
        </>
      </View>
    );
  }
}
