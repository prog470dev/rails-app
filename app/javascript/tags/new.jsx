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

const New = () => {
  const [options, setOptions] = useState([]);

  useEffect(async () => {
    try {
      const result = await ApiUtil.fetchTags();
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
      tag={null}
      options={options}
      onCreate={handleCreate}
      onSave={() => {}}
    />
  );
};

export default New;
