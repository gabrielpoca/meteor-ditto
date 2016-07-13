import { Tracker } from 'meteor/tracker';

export default (collection, store) => {
  Tracker.autorun(() => {
    store.dispatch({
      type: 'MONGO_COLLECTION',
      items: collection.find().fetch(),
      name: collection._name,
    });
  });
};
