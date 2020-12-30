import React from 'react';
import ReactDom from "react-dom";
import Edit from "sentences/edit";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <Edit />,
        document.getElementById('sentences__edit')
    );
})