import merge from 'lodash/merge';

import {RECEIVE_TOPIC, UPDATE_TOPIC} from '../actions/topic_actions.js'

const defaultState = {};

const DetailTopicReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TOPIC:
      return merge({},state,{[action.topic.id]: action.topic});
    case UPDATE_TOPIC:
      let oldState = merge({}, state);
      oldState[action.topic.id] = action.topic;
      return oldState;
    default:
      return state;
  }
};

export default DetailTopicReducer
