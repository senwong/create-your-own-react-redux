import * as React from 'react';
import { connect } from './react-redux'
// import { connect } from "react-redux";


function Counter({ count, increment, decrement }) {
  return (
    <div>
      <h1>count: {count}</h1>
      <p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </p>
    </div>
  );
}

function increment() {
  return { type: "increment" };
}
function decrement() {
  return { type: "decrement" };
}

const mapStateToProps = (state) => {
  return { count: state.count };
};

export default connect(mapStateToProps, { increment, decrement })(Counter);
