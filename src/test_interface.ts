import * as Word from "./Word"
import * as fs from "fs";
const content = fs.readFileSync('./resort.json', 'utf8');
const jsonData: Word.Entry[] = JSON.parse(content);

console.log(jsonData.length);
console.log(jsonData[0].meta.id);
console.log(jsonData[0].def[0].sseq[1][1][1])

console.log(typeof jsonData[0].def[0].sseq[1][1][1])