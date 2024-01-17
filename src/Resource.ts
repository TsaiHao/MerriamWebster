async function requestWordList(): Promise<string[]> {
    return fetch("http://localhost:5678/list", {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).then((json) => {
        return json;
    });
}

interface DatabaseItem {
    word: string;
    definition: string;
    date: string;
}

async function requestWord(word: string): Promise<DatabaseItem> {
    return fetch(`http://localhost:5678/word/${word}`, {
        method: "GET",
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    }).then((json) => {
        return json;
    });
}

async function removeWord(word: string): Promise<void> {
    fetch(`http://localhost:5678/word/${word}`, {
        method: "DELETE"
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

export {
    requestWordList,
    requestWord,
    removeWord,
}