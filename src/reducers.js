import { combineReducers } from 'redux';

const collectionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MONGO_COLLECTION':
      return Object.assign({}, state, { [action.name]: action.items });
    default:
      return state;
  }
};

const readyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MONGO_COLLECTION_READY_STATE':
      return Object.assign({}, state, { [action.name]: action.state });
    default:
      return state;
  }
};

export default combineReducers({
  collections: collectionReducer,
  collectionsReady: readyReducer,
});
