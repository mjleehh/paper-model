var paperModelLib = require('../../../index');
var $ = require('jquery');


$('#file-selector').on('change', function(event) {
    var file = _.first(event.target.files);
    var reader = new FileReader();
    reader.onloadend = function(){
        var mesh = paperModelLib.mesh.readObj(reader.result);
        var result = paperModelLib.mesh.writeObj(paperModelLib.createPaperModel(mesh));
        //result = result.replace(/\n/g, ' <br> ');
        $('.result-area').text(result);
    };
    reader.readAsText(file);
});
