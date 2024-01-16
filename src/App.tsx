import React, { useState, useEffect } from "react";

import WordCard from "./Card";
import * as Word from "./Word";
import * as Resource from "./Resource"

import "./App.css"

function WordListItem({word, setFocus}: {word: string, setFocus: (word: string) => void}) {
    return (
        <li className="WordListItem" onClick={ () => setFocus(word) }>
            {word}
        </li>
    )
}

function WordList({setFocus}: {setFocus: (word: string) => void}) {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [words, setWords] = useState<string[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Resource.requestWordList();
                response.sort();
                setWords(response);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            { isLoading ? (
                <p>Loading word list</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : (
                <ul className="WordList">
                    {words.map((word) => WordListItem({ word, setFocus }))}
                </ul>
            ) }
        </>
    )
}

function App() {
    const [focusWord, setFocusWord] = useState<string>("");

    return (
        <div className="App">
            <WordList setFocus={setFocusWord} />
            <WordCard word={focusWord} />
        </div>
    )
}

export default App;
