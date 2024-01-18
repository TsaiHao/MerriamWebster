import { useState, useEffect } from "react";

import WordCard from "./Card";
import * as Resource from "./Resource"

import "./App.css"

function WordListItem({word, setFocus, isFocused}: {word: string, setFocus: (word: string) => void, isFocused: boolean}) {
    return (
        <li className={`WordListItem ${isFocused ? "WordListItemFocused" : ""}`} onClick={ () => {
            setFocus(word);
        }}>
            {word}
        </li>
    )
}

function WordList({focusWord, setFocus, wordList, setWordList}: {
        focusWord: string, 
        setFocus: (word: string) => void,
        wordList: string[],
        setWordList: (wordList: string[]) => void
    }) {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Resource.requestWordList();
                response.sort();
                setWordList(response);
                setFocus(response[0]);
            } catch (error) {
                setError(error instanceof Error ? error : new Error("Unknown error"));
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [setWordList, setFocus]);

    return (
        <>
            { isLoading ? (
                <p>Loading word list</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : (
                <ul className="WordList"> 
                    { wordList.map((word) => {
                        return <WordListItem 
                                word={word} 
                                setFocus={setFocus}  
                                key={word}
                                isFocused={word === focusWord}
                                />
                    }) }
                </ul>
            ) }
        </>
    )
}

function WordOperation({word, onDeleteItem}: {word: string, onDeleteItem: (word: string) => void}) {
    return (
        <div className="OperationContainer">
            <button className="RemoveButton" onClick={() => {
                Resource.removeWord(word).then(() => onDeleteItem(word));
            }}>
                Remove
            </button>
        </div>
    )
}

function App() {
    const [focusWord, setFocusWord] = useState<string>("");
    const [wordList, setWordList] = useState<string[]>([]);

    return (
        <div className="App">
            <WordList 
                focusWord={focusWord} 
                setFocus={setFocusWord} 
                wordList={wordList}
                setWordList={setWordList}
            />
            <div className="WordDetails">
                <WordCard word={focusWord} />
                <WordOperation word={focusWord} onDeleteItem={(word: string) => {
                    const index = wordList.indexOf(word);
                    setWordList(wordList.filter((item) => item !== word));
                    setFocusWord(wordList[index + 1 === wordList.length ? index - 1 : index + 1]);
                }}/>
            </div>
        </div>
    )
}

export default App;
