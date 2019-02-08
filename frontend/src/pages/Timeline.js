import React, { Component } from 'react';
import api from '../services/api.js';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css';

export default class TimeLine extends Component {
  
  state = {
    tweets: [],
    newTweet: "",
  }

  handleInputChange = (event) => {
    this.setState({ newTweet: event.target.value })
  }

  handleNewTweet = async (event) => {
    if (event.keyCode !== 13) return;
    const content = this.state.newTweet;
    const author = localStorage.getItem("@GoTwitter:username");
    
    await api.post("tweets", {content, author});
    
    this.setState({ newTweet: "" })
  }

  async componentDidMount() {
    console.log('componentDidMount');
    this.subscribeToEvents();
    const response = await api.get("tweets");
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket("http://localhost:3000");
    io.on("tweet", data => {
      //Spread operator
      this.setState({ tweets: [ data, ...this.state.tweets] });
    });

    io.on("like", data => {
      const refreshedTweets = this.state.tweets.map(tweet => {
        console.log(tweet._id, data._id);
        return tweet._id === data._id ? data: tweet
      });
      this.setState({tweets: refreshedTweets });
    });
  }
  
  render() {
    console.log('render');
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter" />
      
        <form>
            <textarea 
              value={this.state.newTweet}
              onChange={this.handleInputChange}
              onKeyDown={this.handleNewTweet}
              placeholder="O que está acontecendo?" />
        </form>

        {console.log(this.state)}

        <ul className="tweet-list">
            {this.state.tweets.map(tweet => {
              return <Tweet key={tweet._id} tweet={tweet} />
            })}
        </ul>

      </div>
    );
  }
}
