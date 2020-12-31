import React, { useState, useEffect } from "react";

const Editor = (props) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [additionalTag, setAdditionalTag] = useState(null);

  useEffect(() => {
    setContent(props.sentence?.content || "");
    setTags(props.sentence?.tags || []);
    setAdditionalTag(props.options.length ? props.options[0] : null);
  }, [props]);

  return (
    <div>
      <textarea
        onChange={() => {
          setContent(event.target.value);
        }}
        value={content}
      />
      <br />
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <select
        value={additionalTag?.id}
        onChange={() =>
          setAdditionalTag({
            id: Number(event.target.value),
            // name: additionalTag.name,
            name: props.options.filter(
              (e) => e.id === Number(event.target.value)
            )[0].name,
          })
        }
      >
        {props.options.map((e) => {
          return (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          if (
            additionalTag &&
            tags.filter((e) => e.id === additionalTag.id).length === 0
          ) {
            setTags([...tags, additionalTag]);
          }
        }}
      >
        Assign Tag
      </button>
      <br />
      <button
        onClick={async () => {
          if (props.sentence) {
            await props?.onSave(props.sentence.id, content, tags);
          } else {
            await props?.onCreate(content, tags);
          }
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/sentences`;
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Editor;
