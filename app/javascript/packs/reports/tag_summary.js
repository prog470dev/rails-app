import React from 'react';
import ReactDom from "react-dom";
import TagSummary from "reports/tag_summary";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <TagSummary />,
        document.getElementById('reports__tag_summary')
    );
})