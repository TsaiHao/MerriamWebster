import React from 'react';
import './App.css';

import * as Word from "./Word"
import * as Format from "./Format"

class Sense {
  title: string = "";
  text: string = "";
  vis: object[] = [];
  constructor(public sense: Word.SenseEntry) {
    if (sense.sn) {
      const sns = sense.sn.split(" ");
      if (sns.length > 1) {
        this.title = sns[1];
      }
    }
    this.text = sense.dt.filter((dt) => {
      return dt[0] === "text";
    }).map((dt) => {
      return dt[1] as string;
    }).join("; ");

    this.vis = sense.dt.filter((dt) => {
      return dt[0] === "vis";
    }).map((dt) => {
      return dt[1][0] as object;
    });
  }
}

class SenseGroup {
  senses: Sense[] = [];
  index: string = "";

  constructor(public sg: Word.SenseSequenceItem[]) {
    for (const [idx, item] of sg.entries()) {
      if (item[0] === "sense") {
        const entry = item[1] as Word.SenseEntry;
        this.makeSense(idx, entry);
      }
    }
  }

  makeSense(idx: number, entry: Word.SenseEntry) {
    const sense = new Sense(entry);
    if (entry.sn) {
      const sns = entry.sn.split(" ");
      if (sns.length > 1) {
        sense.title = sns[1];
        this.index = sns[0];
      } else {
        if (idx > 0) {
          sense.title = sns[0];
        } else {
          this.index = sns[0];
        }
      }
    }
    this.senses.push(sense);
  }
}

function SenseEntry({ sense }: { sense: Sense }) {
  return (
    <li className="DefinitionText" dangerouslySetInnerHTML={{ __html: Format.display(sense.text) }}></li>
  );
}

function SenseGroupComp({ sg }: { sg: Word.SenseSequenceItem[] }) {
  const group = new SenseGroup(sg);

  return ( 
    <ul>
      { 
        group.senses.map((senseItem) => <SenseEntry sense={senseItem} /> )
      }
    </ul>
  );
}

function Definition({ definition }: { definition: Word.Definition }) {
  return (
    <div className="Definition">
      {definition.sseq.map((sg) => (
        <SenseGroupComp sg={sg as Word.SenseSequenceItem[]} />
      ))}
    </div>
  );
}

function DefinitionList({ def }: { def: Word.Definition[] }) {
  return (
    <div className="DefinitionList">
      {def.map((definition) => (
        <Definition definition={definition}/>
      ))}
    </div>
  );
}

function Entry({ entry }: { entry: Word.Entry }) {
  return (
    <div className="Entry">
      <div className="WordInformation">
        <h2 className="HeadWord">{entry.hwi.hw}</h2>
        <span className="FunctionalLabel">[{entry.fl}]</span>
      </div>
      <DefinitionList def={entry.def} />
    </div>
  );
}

function App({ word, wordEntries }: { word: string, wordEntries: Word.Entry[] }) {
  return (
    <div className="App">
      <h1>{word}</h1>
      { wordEntries.map((entry) => <Entry entry={entry} /> ) }
    </div>
  );
}

export default App;
