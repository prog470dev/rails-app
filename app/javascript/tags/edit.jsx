import React, {useState, useEffect} from 'react';
import Editor from "./editor";

const handleFetch = (id) => {
    return fetch(`/api/tags/${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
}

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

const handleSave = async (id, name, parent_id) => {
    const data = {
        name: name,
        parent_id: parent_id === 0 ? null : parent_id
    }
    console.log(data);
    return fetch(`/api/tags/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
}

const Edit = () => {
    const [tag, setTag] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(async () => {
        try {
            // TODO: いい感じのID設定
            const id = location.pathname.split("/")[2];
            if(id){
                const result = await handleFetch(id);
                setTag(result.tag);
            }
        } catch (error) {
            console.log(error);
        }
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

    return (<Editor tag={tag} options={options} onCreate={handleCreate} onSave={handleSave}/>);
}

export default Edit;
