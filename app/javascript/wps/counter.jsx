import React, {useState} from "react";
import { render } from "react-dom";

const Counter = (props) => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <h1>{props.title}</h1>
        counter: {count} <br />
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    );
};

export default Counter;