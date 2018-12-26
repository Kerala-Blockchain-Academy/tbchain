'use strict'

const _ = require('lodash');

const {
    Message,
    EventFilter,
    EventSubscription,
    ClientEventsSubscribeRequest,
    ClientEventsSubscribeResponse
  } = require('sawtooth-sdk/protobuf');

const PREFIX = 'a4d219';
const NULL_BLOCK_ID = '0000000000000000';

// Subscriptions implementation
const subscribe = (stream) => {
    const blockSub = getBlockSubscription();
    const deltaSub = getStateDelataSubscription();
    const actionSub = getCookieJarActionSubscription();
    const clientSubscriptionRequest = 
      getClientSubscriptionRequest([blockSub, deltaSub, actionSub], [NULL_BLOCK_ID]);
  
    stream.send(
      Message.MessageType.CLIENT_EVENTS_SUBSCRIBE_REQUEST,
      clientSubscriptionRequest
    )
    .then(decodeSubscriptionResponse)
    .then(decodedMessage => {
      if (getSubscriptionStatus(decodedMessage) !== 'OK') {
        throw new Error(`Validator responded with status "${status}"`)
      }
    })
  }

  const getBlockSubscription = () => {
    return EventSubscription.create({
      eventType: 'sawtooth/block-commit'
    })
  }
  
  const getStateDelataSubscription = () => {
    return EventSubscription.create({
      eventType: 'sawtooth/state-delta',
      filters: [EventFilter.create({
        key: 'address',
        matchString: `^${PREFIX}.*`,
        filterType: EventFilter.FilterType.REGEX_ANY
      })]
    })
  }

  const getCookieJarActionSubscription = () => {
    return EventSubscription.create({
      eventType: 'cookiejar/cookiejar-action'
    })
  }
  
  const getClientSubscriptionRequest = (subscriptions, blockIds) => {
    return ClientEventsSubscribeRequest.encode({
      lastKnownBlockIds: blockIds,
      subscriptions: subscriptions
    }).finish()
  }
  
  const decodeSubscriptionResponse = (response) => {
    return ClientEventsSubscribeResponse.decode(response);
  }
  
  const getSubscriptionStatus = (decodedResponse) => {
    const status = _.findKey(ClientEventsSubscribeResponse.Status,
      val => val === decodedResponse.status);
  
      return status;
  }

  module.exports = subscribe;