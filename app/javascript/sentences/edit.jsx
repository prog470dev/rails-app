import React, {useState, useEffect } from 'react';
import Editor from "./editor";


const handleFetch = (id) => {
    return fetch(`/api/sentences/${id}`, {
        method: 'GET'
    })
    .then(response => response.json())
}

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

const handleSave = async (id, content) => {
    const data = {
        content: content
    }
    return fetch(`/api/sentences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
}

const Edit = () => {
    const [sentence, setSentence] = useState(null);

    useEffect(async () => {
        try {
            // TODO: いい感じのID設定
            const id = location.pathname.split("/")[2];
            if (id) {
                const result = await handleFetch(id);
                setSentence(result.sentence);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <h1>{sentence?.id}</h1>
            <Editor sentence={sentence} onCreate={handleCreate} onSave={handleSave} />
        </>
    );
}

export default Edit;
