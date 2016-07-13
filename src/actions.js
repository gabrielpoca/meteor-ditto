export const setReady = (name, state) => {
  return dispatch => {
    dispatch({
      type: 'MONGO_COLLECTION_READY_STATE',
      name,
      state,
    });
  };
};
