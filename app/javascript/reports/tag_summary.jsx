import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const handleFetchSummary = (tags) => {
  return fetch(`/api/tag_summary`, {
    method: "GET",
  }).then((response) => response.json());
};

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
      const result = await handleFetchSummary();
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
