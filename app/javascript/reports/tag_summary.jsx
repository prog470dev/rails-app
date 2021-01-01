import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import * as ApiUtil from "../api_util";

const buildData = (summary) => {
  return {
    labels: Object.keys(summary),
    datasets: [
      {
        label: "Tags",
        data: Object.keys(summary).map((key) => summary[key]),
        backgroundColor: "blue",
      },
    ],
  };
};

const TagSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(async () => {
    try {
      const result = await ApiUtil.fetchTagSummary();
      setSummary(result.summary);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1>Tag Summary</h1>
      <Bar data={buildData(summary)} />
      <button
        onClick={() => {
          // TODO: 適切なリダイレクト手段
          location.href = `${location.protocol}//${location.host}/sentences`;
        }}
      >
        To Sentences
      </button>
    </>
  );
};

export default TagSummary;
