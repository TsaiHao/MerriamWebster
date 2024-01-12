interface Example {

}

interface Synonym {

}

interface Visual {
  t: string;
}

type DefinitionText = ["text", string] | ["vis", Visual[]];

interface SenseEntry {
  sn?: string;
  dt: DefinitionText[];
}

type SenseItem = ["sense", SenseEntry] | ["pseq", SenseItem[]];
type SenseSequenceItem =  SenseItem;

interface Definition {
  sseq: SenseSequenceItem[][];
}

interface Pronunciation {
  mw: string;
  sound: {
    audio: string;
    ref: string;
    stat: string;
  }
}

interface Information {
  hw: string;   // headword
  prs?: Pronunciation[];
}

interface Meta {
  id: string;
  uuid: string;
  sort: string;
  src: string;
  section: string;
  stems: string[];
  offensive: boolean;
}

interface Entry {
  meta: Meta;
  hom: number;
  hwi: Information;
  fl: string;
  def: Definition[];
  syns: Synonym[];
  et: Example;
  date: string;
  shortdef: string[];
}

export type {
  Example,
  Synonym,
  Visual,
  DefinitionText,
  SenseEntry,
  SenseSequenceItem,
  Definition,
  Pronunciation,
  Information,
  Meta,
  Entry
};