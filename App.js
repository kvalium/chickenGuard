/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import { Alert } from 'react-native';

import { getTwilight, getAsyncData, getPosition, setAsyncData } from './src/services';

import ChickenGuard from "./src/ChickenGuard";

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
    return <ChickenGuard {...this.state} onGetTwilight={this.onGetTwilight} setTimeBeforeTwilight={this.setTimeBeforeTwilight} />;
  }
}
