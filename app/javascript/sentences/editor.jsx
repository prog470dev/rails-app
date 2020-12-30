import React, {useState, useEffect} from "react";

const Editor = (props) => {
    const [content, setContent] = useState(props.sentence?.content);

    useEffect(() => {
      setContent(props.sentence?.content);
    }, [props.sentence])

    return (
      <div>
        <textarea onChange={() => { setContent(event.target.value) }} value={content} />
        <br/>
        <button onClick={() => {
          if (props.sentence) {
            props.onSave(props.sentence.id, content)
          } else {
            props.onCreate(content)
          }
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/sentences`;
        }}>Save</button>
      </div>
    );
};

export default Editor;