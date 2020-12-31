import React from "react";
import Card from "./card";

const handleDetail = (id) => {
  location.href = `${location.protocol}//${location.host}/sentences/${id}/edit`;
};

const List = (props) => {
  return (
    <>
      {props.sentences.map((e) => {
        return <Card key={e.id} sentence={e} onDetail={handleDetail} />;
      })}
    </>
  );
};

export default List;
