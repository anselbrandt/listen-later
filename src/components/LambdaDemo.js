import React from 'react';

export default function LambdaDemo(props) {
  return (
    <p>
      <button onClick={props.handleClick} value="hello">
        {props.loading ? 'Loading...' : 'Call Lambda'}
      </button>
      <button onClick={props.handleClick} value="async-chuck-norris">
        {props.loading ? 'Loading...' : 'Call Async Lambda'}
      </button>
      <br />
      <span>{props.message}</span>
    </p>
  );
}
