import React, { Component } from 'react';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
import config from  '../config';

import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TimeLine extends Component {
  
  state = {
    tweets: [],
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Inicio',
    headerRight: (
      <TouchableOpacity onPress={ () => navigation.navigate('New') }>
        <Icon name="add-circle-outline" size={24} color="#4BB0EE" style={{ marginRight: 20 }} />
      </TouchableOpacity>
    )
  });

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get(config.apiRouters.tweets);
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket(config.socketIO.endPoint);
    io.on(config.socketIO.queeTweets, data => {
      //Spread operator
      this.setState({ tweets: [ data, ...this.state.tweets] });
    });

    io.on(config.socketIO.queeLikes, data => {
      const refreshedTweets = this.state.tweets.map(tweet => {
        console.log(tweet._id, data._id);
        return tweet._id === data._id ? data: tweet
      });
      this.setState({tweets: refreshedTweets });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.tweets} 
          keyExtractor={tweet => tweet._id} 
          renderItem={ ({item}) => <Tweet tweet={item} />  } 
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
