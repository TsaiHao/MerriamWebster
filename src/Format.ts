function format(text: string): string {
    const replacements: Record<string, string> = {
        // 2.29.1
        "{b}": "<b>",
        "{\\/b}": "</b>",
        "{bc}": "<b>:</b> ",
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
        "{wi}": "<i>",
        "{\\/wi}": "</i>",
    }

    Object.keys(replacements).forEach(key => {
        text = text.replace(new RegExp(key, "g"), replacements[key]);
    });

    return text;
}

function display(text: string) {
    return format(text);
}

export { display };