
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');

exports.analyze = function(req, res){

  var file = 'results-20130628-004520.csv';

  csv()
  .from.path(process.cwd() + '/uploads/' + file, {
    delimiter: ',',
    escape: '"',
    columns: true
  })
  .to.array( function(data){
    console.log(data);
    res.send(200);
  });
};