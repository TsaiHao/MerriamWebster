import {CONSTANTS} from "./Constants";
function parseReference(text: string): string {
    const aLink = /\{a_link\|(\b.*?\b)\}/gm;
    text = text.replaceAll(aLink, `<a class="Link AutoLink" href="${CONSTANTS.DICT_URL}$1">$1</a>`);

    const dLink = /\{d_link\|(\b.*?\b)?\|(\b.*?\b)?\}/gm;
    text = text.replaceAll(dLink, (match, p1, p2) => `<a class="Link DirectLink" href="${CONSTANTS.DICT_URL}${p1}">${p2 || p1}</a>`);

    const iLink = /\{i_link\|(\b.*?\b)\|(\b.*?\b)\}/gm;
    text = text.replaceAll(iLink, (match, p1, p2) => `<a class="Link ItalicLink" href="${CONSTANTS.DICT_URL}${p1}">${p2 || p1}</a>`);

    const sxLink = /\{sx\|(\b[ a-z]*?\b)?\|(\b[ 1-9a-z]*?\b)?\|(\b[ 1-9a-z]*?\b)?\}/g;
    text = text.replaceAll(sxLink, (match, p1, p2, p3) => `<a class="Link SynonymousCrossLink" href="${CONSTANTS.DICT_URL}${p1}">${p2 || p1}</a>${p3 ? ` ${p3}` : ""}`);

    const dtLink = /\{dxt\|(\b[ a-z]*?\b)?\|(\b[ 1-9a-z]*?\b)?\|(\b[ 1-9a-z]*?\b)?\}/g;
    text = text.replaceAll(dtLink, (match, p1, p2, p3) => `<a class="Link DirectionalCrossLink" href="${CONSTANTS.DICT_URL}${p1}">${p2 || p1}</a>${p3 ? ` ${p3}` : ""}`);

    return text;
}

function format(text: string): string {
    const replacements: Record<string, string> = {
        // 2.29.1
        "{b}": "<b>",
        "{\\/b}": "</b>",
        "{bc}": "<b></b> ",
        "{inf}": "<sub>",
        "{\\/inf}": "</sub>",
        "{sup}": "<sup>",
        "{\\/sup}": "</sup>",
        "{it}": "<i>",
        "{\\/it}": "</i>",
        "{ldquo}": "&#x201C;",
        "{rdquo}": "&#x201D;",
        "{sc}": "<span class=\"SmallCapitals\">",
        "{\\/sc}": "</span>",

        // 2.29.2
        "{gloss}": "[",
        "{\\/gloss}": "]",
        "{phrahw}": "<span class=\"ParagraphHeadword\">",
        "{\\/phrahw}": "</span>",
        "{phrase}": "<span class=\"Phrase\">",
        "{\\/phrase}": "</span>",
        "{qword}": "<i>",
        "{\\/qword}": "</i>",
        "{wi}": "<i><b>",
        "{/wi}": "</i></b>",

        // 2.29.3
        "{dx}": "<br/><span class=\"Dx\">->",
        "{\\/dx}": "</span>",
        "{dx_def}": "<span class=\"DxDef\">(",
        "{\\/dx_def}": ")</span>",
    }

    Object.keys(replacements).forEach(key => {
        text = text.replaceAll(key, replacements[key]);
    });

    text = parseReference(text);

    return text;
}

function display(text: string) {
    return format(text);
}

export { display };