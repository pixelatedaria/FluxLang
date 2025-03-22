const moo = require('moo');
const fs = require("mz/fs");

let lexer = moo.compile({
    whitespace: /\s+/,
    lineBreaks: /(?:(?:\s+))/,
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    lbrace: '{',
    rbrace: '}',
    syntax: ';',
    keyword: ['case', 'continue', 'default', 'const', 'else', 'elif', 'enum', 'in', 
        'for', 'if', 'float', 'int', 'long', 'return', 'signed', 'short', 
        'switch', 'void', 'while', 'volatile', 'unsigned', 'NULL', 'as', 'and', 
        'or', 'not', 'fn', 'try', 'except', 'finally', 'raise', 'define', 'static', 'print'],
    fatarrow: '->',
    assign: '=',
    identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
    NL: { match: /\n/, lineBreaks: true },
    
});

async function main() {
    try {
        const code = (await fs.readFile("example.flx")).toString();
        lexer.reset(code);
        while (true) {
            const token = lexer.next();
            if (!token) {
                break;
            }
            console.log(token);
        }
    } catch (err) {
        console.log("Error:", err.stack);
    }
}

main();
