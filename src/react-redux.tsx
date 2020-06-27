import * as React from "react";

const StoreContext = React.createContext(null);

export function Provider({ store, children }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function connect(mapState, mapDispatch) {
  return function (ChildComponent) {
    return function ConnectWrapper(props) {
      const store = React.useContext(StoreContext);

      const [state, setState] = React.useState(store.getState());
      React.useEffect(() => {
        store.subscribe(() => {
          setState(store.getState());
        });
      }, []);
  
      const propsFromState = mapState(state);
      let functions = {};
      if (mapDispatch) {
        functions = Object.keys(mapDispatch).reduce((acc, functionName) => {
          return {
            ...acc,
            [functionName]: function (...args) {
              const actionGenerator = mapDispatch[functionName];
              store.dispatch(actionGenerator(...args));
            },
          };
        }, {});
      } else {
        functions = { dispatch: store.dispatch };
      }
      return <ChildComponent {...props} {...propsFromState} {...functions} />;
    }
  };
}
