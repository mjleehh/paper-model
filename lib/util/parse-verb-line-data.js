function parseVerbLineData(data, handlers){
    var lines = data.split('\n');
    for (var i = 0; i < lines.length; ++i) {
        var words = lines[i].split(' ');
        words.filter(function(word){
            return word === '' || word === '\r';
        });
        if (words.length > 1) {
            var verb = words[0];
            var nouns = words.slice(1);
            if (handlers.hasOwnProperty(verb)) {
                handlers[verb].apply(null, nouns);
            }
        }
    }
}

module.exports = parseVerbLineData;
