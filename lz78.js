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

    while (!compressed) {
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
                result.push({[buffer.slice(-1)]: 0});
            } else {
                result.push({[buffer.slice(-1)]: dictionary.indexOf(buffer.slice(0, buffer.length-1))});
            }
        }

        offset = ++extra;

        if(extra === stream.length) compressed = true;
    }

    return result;
}