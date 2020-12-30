import React from 'react';
import ReactDom from "react-dom";
import Edit from "tags/edit";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <Edit/>,
        document.getElementById('tags__edit')
    );
})