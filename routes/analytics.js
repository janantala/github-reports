
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');

exports.analyze = function(req, res){
  var file = 'results-20130628-004520.csv';
  csv()
  .from.path(process.cwd() + '/uploads/' + file, { delimiter: ',', escape: '"' })
  .transform( function(row){
    row.unshift(row.pop());
    return row;
  })
  .on('record', function(row, index){
    console.log('#'+ index + ' ' + JSON.stringify(row));
  })
  .on('error', function(error){
    console.log(error.message);
  })
  .on('end', function (count) {
    console.log('Number of lines: ' + count);
    res.send(200);
  });
};