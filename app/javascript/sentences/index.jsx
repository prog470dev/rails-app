import React, { useEffect, useState } from "react";
import List from "./list";

const handleFetchSentences = (tags) => {
  console.log(`/api/sentences?tags=${tags.join("+")}`);
  return fetch(`/api/sentences?tags=${tags.join("+")}`, {
    method: "GET",
  }).then((response) => response.json());
};

const handleFetchTags = () => {
  return fetch(`/api/tags`, {
    method: "GET",
  }).then((response) => response.json());
};

const Index = () => {
  const [sentences, setSentences] = useState([]);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(async () => {
    try {
      const result = await handleFetchTags();
      setTags(result.tags);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const result = await handleFetchSentences(selected);
      setSentences(result.sentences);
    } catch (error) {
      console.log(error);
    }
  }, [selected]);

  return (
    <>
      <h1>Sentences</h1>
      <List sentences={sentences} />
      <br />
      <br />
      <button
        onClick={() => {
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/sentences/new`;
        }}
      >
        New Sentence
      </button>
      <h1>Tags</h1>
      {tags.map((tag) => {
        return (
          <label key={tag.id} htmlFor={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              name={tag.name}
              id={tag.id}
              checked={selected.includes(tag.id)}
              onChange={() => {
                if (selected.includes(tag.id)) {
                  setSelected(selected.filter((s) => s != tag.id));
                } else {
                  setSelected([...selected, tag.id]);
                }
              }}
            />
            {tag.name}
          </label>
        );
      })}
      <br />
      <br />
      <button
        onClick={() => {
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/tags/new`;
        }}
      >
        New Tag
      </button>
    </>
  );
};

export default Index;
