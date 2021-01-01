import React, { useState, useEffect } from "react";
import Editor from "./editor";
import * as ApiUtil from "../api_util";

const handleCreate = async (content, tags) => {
  const data = {
    content: content,
    tags: tags.map((tag) => tag.id),
  };
  return ApiUtil.createSentence(data);
};

const New = () => {
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    try {
      const result = await ApiUtil.fetchTags();
      setOptions([...result.tags.map((e) => ({ id: e.id, name: e.name }))]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>New Sentence</h1>
      <Editor sentence={null} options={options} onCreate={handleCreate} />
    </>
  );
};

export default New;
