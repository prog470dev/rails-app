import React, { useState, useEffect } from "react";
import Editor from "./editor";
import * as ApiUtil from "../api_util";

const handleSave = async (id, content, tags) => {
  const data = {
    content: content,
    tags: tags.map((tag) => tag.id),
  };
  return ApiUtil.updateSentence(id, data);
};

const Edit = () => {
  const [sentence, setSentence] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    try {
      // TODO: いい感じのID設定
      const id = location.pathname.split("/")[2];
      if (id) {
        const result = await ApiUtil.fetchSentence(id);
        setSentence(result.sentence);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await ApiUtil.fetchTags();
      setOptions([...result.tags.map((e) => ({ id: e.id, name: e.name }))]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>{sentence?.id}</h1>
      <Editor sentence={sentence} options={options} onSave={handleSave} />
    </>
  );
};

export default Edit;
