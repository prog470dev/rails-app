import React, {useState, useEffect} from "react";

const Editor = (props) => {
    const [content, setContent] = useState(props.sentence?.content);

    useEffect(() => {
      setContent(props.sentence?.content);
    }, [props.sentence])

    return (
      <div>
        <h1>{props.sentence?.id || "New Sentence"}</h1>
        <textarea onChange={() => { setContent(event.target.value) }} value={content} />
        <br/>
        <button onClick={() => {
          if (props.sentence) {
            props.onSave(props.sentence.id, content)
          } else {
            props.onCreate(content)
            // TODO: リダイレクト
          }
        }}>Save</button>
      </div>
    );
};

export default Editor;