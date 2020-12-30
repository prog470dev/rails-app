import React from 'react';
import ReactDom from "react-dom";
import New from "tags/new";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <New/>,
        document.getElementById('tags__new')
    );
})