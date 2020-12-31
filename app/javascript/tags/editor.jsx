import React, { useState, useEffect } from "react";

const Editor = (props) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(props.tag?.parent_id);

  useEffect(() => {
    setName(props.tag?.name || "");
    setParentId(props.options.length ? props.options[0].id : 0);
  }, [props.tag]);

  return (
    <>
      <h1>{props.tag?.id || "New Tag"}</h1>
      <span>Name: </span>
      <input
        type="text"
        value={name}
        onChange={() => setName(event.target.value)}
      />
      <br />
      <span>Parent: </span>
      <select
        value={parentId}
        onChange={() => setParentId(Number(event.target.value))}
      >
        {props.options.map((e, index) => {
          return (
            <option key={index} value={e.id}>
              {e.name}
            </option>
          );
        })}
      </select>
      <br />
      <button
        onClick={() => {
          if (props.tag) {
            props.onSave(props.tag.id, name, parentId);
          } else {
            props.onCreate(name, parentId);
          }
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/sentences`;
        }}
      >
        Save
      </button>
    </>
  );
};

export default Editor;
