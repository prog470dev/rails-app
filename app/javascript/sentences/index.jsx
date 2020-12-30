import React, {useEffect, useState} from 'react';
import List from './list';

const handleFetchSentences = () => {
    return fetch(`/api/sentences`, {
        method: 'GET'
    })
        .then(response => response.json())
}

const Index = () => {
    const [sentences, setSentences] = useState([]);

    useEffect(async () => {
        try{
            const result = await handleFetchSentences();
            setSentences(result.sentences);
        } catch(error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <h1>Sentences</h1>
            <List sentences={sentences} />
            <br /><br />
            <button onClick={() => { 
                // TODO: 適切なリダイレクト手段
                location.href = `${location.protocol}//${location.host}/sentences/new`;
             }}>New</button>
        </>
    );
}

export default Index;
