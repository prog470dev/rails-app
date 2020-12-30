import React from 'react';
import Editor from "./editor";

const handleCreate = async (content) => {
    const data = {
        content: content
    }
    return fetch(`/api/sentences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}

const New = () => {
    return (<Editor sentence={null} onCreate={handleCreate} onSave={() => { }} />);
}

export default New;
