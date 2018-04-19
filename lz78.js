'use strict';

const
    fs = require('fs');

var compress = function(stream) {   // Let's assume stream is a string.
    let 
        dictionary = [],
        offset = 0,
        extra = 0,
        compressed = false,
        result = [];

    dictionary.push('\0');

    while (true) {
        let 
            buffer = "",
            index = -1;

        for(var i = offset; i <= extra; i++) {
            buffer += stream.charAt(i);
            if(dictionary.indexOf(buffer) !== -1) {
                extra++;
            }
        }

        index = dictionary.indexOf(buffer);

        if(index === -1) {
            dictionary.push(buffer);
            if(buffer.length === 1) {
                result.push(0 + ', ' + [buffer.slice(-1)]);
            } else {
                result.push(dictionary.indexOf(buffer.slice(0, buffer.length-1)) + ', ' + [buffer.slice(-1)]);
            }
        }

        offset = ++extra;

        if(extra === stream.length) break;
    }

    return result;
}

var decompress = function(input) {
    let
        result = "",
        dictionary = [];

    dictionary.push('\0');
    for(var entry in input) {   // For each entry in input.
        let 
            entryArray = input[entry].split(', '),
            buffer = "";

        if(entryArray[0] !== 0) {   // If it's a combination of characters.
            buffer += dictionary[entryArray[0]] + entryArray[1];
            dictionary.push(buffer);
        }  else {   // If its a single character.
            dictionary.push(entryArray[0]);
            buffer += entryArray[0]
        }

        result += buffer;
    }

    return result;
}

console.log(decompress(compress('ABBABAAAABCCBAC')));