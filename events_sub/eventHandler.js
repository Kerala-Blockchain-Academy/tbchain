'use strict'

const _ = require('lodash');

const {
    Message,
    EventList,
    StateChangeList
  } = require('sawtooth-sdk/protobuf')

// Handle event message received by stream
const handleEvent = (msg) => {
    // Check if the message is an event message
    if (isEventMessage(msg)) {
      // Get the list of events
      const events = getEventsFromMessage(msg);
      // Iterate over each event and process
      let blockNum;
      events.forEach(event => {
        if (isBlockCommitEvent(event)) {
          blockNum = sendBlockUpdate(event);
        } 
        else if (isStateDeltaEvent(event)) {
          //deltas.handle(getBlock(events), getChanges(events));
        } else if (isTbDotsAction(event)) {
          sendTbDotsAction(blockNum, event);
        }
      });    
    } else {
      console.warn('Received message of unknown type:', msg.messageType)
    }
  }

  const isEventMessage = (msg) => {
    return msg.messageType === Message.MessageType.CLIENT_EVENTS;
  }
  
  const getEventsFromMessage = (msg) => {
    return EventList.decode(msg.content).events;
  }
  
  const isBlockCommitEvent = (event) => {
    return event.eventType === 'sawtooth/block-commit';
  }
  
  const isStateDeltaEvent = (event) => {
    return event.eventType === 'sawtooth/state-delta';
  }

  const isTbDotsAction = (event) => {
    return event.eventType === 'tbdots/tbdots-action';
  }

/*----------------------------------------------------*/
const sendBlockUpdate = event => {
    const blockData = getBlock(event);
    this.socket.emit('block-commit', blockData);
    return blockData.blockNum;
}

   // Parse Block Commit Event
const getBlock = events => {
    const block = _.chain(events)
        //.find(e => e.eventType === 'sawtooth/block-commit')
        .get('attributes')
        .map(a => [a.key, a.value])
        .fromPairs()
        .value()
    return {
        blockNum: parseInt(block.block_num),
        blockId: block.block_id,
        stateRootHash: block.state_root_hash
    }
}
/*
// Parse State Delta Event
const getChanges = event => {
    //const event = events.find(e => e.eventType === 'sawtooth/state-delta')
    if (!event) return []
  
    const changeList = StateChangeList.decode(event.data)
    return changeList.stateChanges
      //.filter(change => change.address.slice(0, 6) === PREFIX)
}


*/

const getTbDotsActionData = (blockNum, event) => {
  return {
    blockNum: blockNum,
    action: _.chain(event).get('attributes').map(a=>[a.key, a.value]).fromPairs().value().action,
    actionText: _.chain(event).get('attributes').map(a=>[a.key, a.value]).fromPairs().value().actionText,
    PK: _.chain(event).get('attributes').map(a=>[a.key, a.value]).fromPairs().value().user,
    message: event.data.toString('utf8')
  }
}

const sendTbDotsAction = (blockNum, event) => {
  const tbDotsActionData = getTbDotsActionData(blockNum, event);
  this.socket.emit("tbdots-action", tbDotsActionData);
}

this.socket = null;
const setSocket = socketConnection => {
    this.socket = socketConnection;
}
  
module.exports = { handleEvent, setSocket };