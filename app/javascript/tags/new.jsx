import React, {useState, useEffect} from 'react';
import Editor from "./editor";

const handleFetchTags = () => {
    return fetch(`/api/tags`, {
        method: 'GET'
    })
        .then(response => response.json())
}

const handleCreate = async (name, parent_id) => {
    const data = {
        name: name,
        parent_id: parent_id === 0 ? null : parent_id
    }
    return fetch(`/api/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}

const New = () => {
    const [options, setOptions] = useState([]);

    useEffect(async () => {
        try {
            const result = await handleFetchTags();
            setOptions([
                { id: 0, name: "none" }, 
                ...(result.tags.map((e) => ({ id: e.id, name: e.name })))
            ]);
        } catch(error) {
            console.log(error);
        }
    }, []);

    return (<Editor tag={null} options={options} onCreate={handleCreate} onSave={() => {}}/>);
}

export default New;
