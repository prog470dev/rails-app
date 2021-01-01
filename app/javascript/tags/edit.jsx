import React, { useState, useEffect } from "react";
import Editor from "./editor";
import * as ApiUtil from "../api_util";

const handleCreate = async (name, parent_id) => {
  const data = {
    name: name,
    parent_id: parent_id === 0 ? null : parent_id,
  };
  return ApiUtil.createTag(data);
};

const handleSave = async (id, name, parent_id) => {
  const data = {
    name: name,
    parent_id: parent_id === 0 ? null : parent_id,
  };
  return ApiUtil.updateTag(id, data);
};

const Edit = () => {
  const [tag, setTag] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    try {
      // TODO: いい感じのID設定
      const id = location.pathname.split("/")[2];
      if (id) {
        const result = await ApiUtil.fetchTag(id);
        setTag(result.tag);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await ApiUtil.fetchTags(id);
      setOptions([
        { id: 0, name: "none" },
        ...result.tags.map((e) => ({ id: e.id, name: e.name })),
      ]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Editor
      tag={tag}
      options={options}
      onCreate={handleCreate}
      onSave={handleSave}
    />
  );
};

export default Edit;
