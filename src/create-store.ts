
export default function createStore(reducer) {
  const _reducer = reducer;
  // get initial state
  let state = _reducer(undefined, {});
  const callbacks = [];
  return {
    dispatch(action) {
      state = _reducer(state, action);
      callbacks.forEach(fn => fn());
    },
    getState() {
      return state;
    },
    subscribe(fn) {
      callbacks.push(fn)
    }
  }
}
