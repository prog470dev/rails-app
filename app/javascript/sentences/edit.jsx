import React, { useState, useEffect } from "react";
import Editor from "./editor";

const handleFetch = (id) => {
  return fetch(`/api/sentences/${id}`, {
    method: "GET",
  }).then((response) => response.json());
};

const handleFetchTags = () => {
  return fetch(`/api/tags`, {
    method: "GET",
  }).then((response) => response.json());
};

const handleCreate = async (content, tags) => {
  const data = {
    content: content,
    tags: tags.map((tag) => tag.id),
  };
  return fetch(`/api/sentences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const handleSave = async (id, content, tags) => {
  const data = {
    content: content,
    tags: tags.map((tag) => tag.id),
  };
  return fetch(`/api/sentences/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const Edit = () => {
  const [sentence, setSentence] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    try {
      // TODO: いい感じのID設定
      const id = location.pathname.split("/")[2];
      if (id) {
        const result = await handleFetch(id);
        setSentence(result.sentence);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await handleFetchTags();
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
