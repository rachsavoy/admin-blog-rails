import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMessages, appendMessage } from '../actions';
import Message from '../components/message';
import MessageForm from '../containers/message_form';

class MessageList extends Component {
  componentWillMount() {
    this.fetchMessage();
  }

  componentDidMount() {
    this.subscribeActionCable(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedChannel != nextProps.selcetedChannel) {
      this.subscribeActionCable(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  componentDidUpdate() {
    this.list.scrollTop = this.list.scrollHeight;
  }

  fethMessages = () => {
    this.props.fetchMessages(this.props.selectedChannel);
  }

  subscribeActionCable = (props) => {
    App[`channel_${props.selectedChannel}`] = App.cable.subscriptions.create(
      { channel: 'ChannelsChannel', name: props.selectedChannel },
      {
        received: (message) => {
          if (message.channel === props.selectedChannel) {
            props.appendMessage(message);
          }
        }
      }
    );
  }

  render () {
    return (
      <div className="channel-container">
        <div className="channel-title">
          <span>Channel #{this.props.selectedChannel}</span>
        </div>
        <div className="channel-content" ref={list => this.list = list}>
          {
            this.props.messages.map((message) => {

            })
          }
    )
  }
  }


}
