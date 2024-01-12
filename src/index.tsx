import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as Word from "./Word"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch("./resort.json").then((response) => {
  return response.json();
}).then((data) => {
  const wordEntries: Word.Entry[] = data;
  root.render(
    <React.StrictMode>
      <App word="resort" wordEntries={wordEntries} />
    </React.StrictMode>
  );
});
