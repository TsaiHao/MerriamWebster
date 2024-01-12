import React from 'react';
import './App.css';

import * as Word from "./Word"
import * as Format from "./Format"

function DefinitionText({ dt }: { dt: Word.DefinitionText }) {
  if (dt[0] === "text") {
    return (
      <p className="DefinitionText" dangerouslySetInnerHTML={{ __html: Format.display(dt[1]) }}></p>
    );
  }

  console.log("unknown dt type " + dt[0]);
  return null;
}

function SenseEntry({ sense }: { sense: Word.SenseEntry }) {
  return (
    <div className="SenseEntry">
      { sense.sn && <p className="SenseNumber">{sense.sn}</p> }
      { sense.dt.map((dt) => (
        <DefinitionText dt={dt} />
      )) }
    </div>
  );
}

function SenseSequence({ senseGroup }: { senseGroup: Word.SenseSequenceItem }) {
  if (senseGroup[0] === "sense") {
    return (
      <SenseEntry sense={senseGroup[1]} />
    );
  }

  console.log("unknown sense group type " + senseGroup[0]);
  return null;
}

function Definition({ definition }: { definition: Word.Definition }) {
  return (
    <div className="Definition">
      { definition.sseq.map((sseq) => (
        <div className="SenseSequence">
          { sseq.map((senseGroup) => (
            <SenseSequence senseGroup={senseGroup}/>
          ))}
        </div>
      )) }
    </div>
  );
}

function DefinitionList({ def }: { def: Word.Definition[] }) {
  return (
    <div className="DefinitionList">
      { def.map((definition) => (
        <Definition definition={definition} />
      )) }
    </div>
  );
}

function Entry({ entry }: { entry: Word.Entry }) {
  return (
    <div className="Entry">
      <div className="WordInformation">
        <h2 className="HeadWord">{entry.hwi.hw}</h2>
        <p className="FunctionalLabel">[{entry.fl}]</p>
      </div>
      <DefinitionList def={entry.def} />
    </div>
  );
}

function App({ word, wordEntries }: {word: string, wordEntries: Word.Entry[]}) {
  return (
    <div className="App">
      <h1>{word}</h1>
      { wordEntries.map((entry) => (
        <Entry entry={entry}/>
      )) }
    </div>
  );
}

export default App;
