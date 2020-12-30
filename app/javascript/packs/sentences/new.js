import React from 'react';
import ReactDom from "react-dom";
import New from "sentences/new";

document.addEventListener('DOMContentLoaded', () => {
    ReactDom.render(
        <New />,
        document.getElementById('sentences__new')
    );
})