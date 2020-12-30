import React from 'react';
import ReactDom from "react-dom";
import Index from "sentences/index";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <Index />,
        document.getElementById('sentences__index')
    );
})