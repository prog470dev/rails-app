import React from "react";

const Card = (props) => {
    return (
      <>
        <p>
          {
          props.sentence.content.length < 30 ? 
            props.sentence.content : 
            `${props.sentence.content.substr(0, 30)} ...`
          }
        </p>
        <button onClick={() => { props.onDetail(props.sentence.id) }}>Detail</button>
      </>
    );
};

export default Card;