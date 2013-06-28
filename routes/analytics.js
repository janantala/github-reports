
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');
var Q = require('q');
var time = require('time')(Date);

exports.analyze = function(req, res){

  var file = 'results-20130628-004520.csv';
  var classes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];

  Q.fcall(function(){
    var deferred = Q.defer();
    parse(file, function(error, data){
      if (error) {
        deferred.reject(new Error(error));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  })
  .then(function(data){
    return filter(data, classes);
  })
  .then(function(data){
    return classify(data, classes);
  })
  .then(function(data){
    res.send(data);
  }, function (error) {
    res.error(error);
  });
};

var parse = function(file, cb){
  csv()
  .from.path(process.cwd() + '/uploads/' + file, {
    delimiter: ',',
    escape: '"',
    columns: true
  })
  .to.array( function(data, count){
    cb(null, data);
  });
};

var filter = function(data, classes){

  var filtered = [];
  data.forEach(function(contribution){
    if (classes.indexOf(contribution.type) > -1) {
      filtered.push(contribution);
    }
  });
  return filtered;
};

var classify = function(data, classes){

  data.forEach(function(contribution){
    console.log(contribution['created_at']);

    var arr = contribution['created_at'].split(' ');
    var year = arr[0].split('-')[0];
    var month = arr[0].split('-')[1] - 1;
    var day = arr[0].split('-')[2];
    var hour = arr[1].split(':')[0];

    var date = new time.Date(year, month, day, hour, 'UTC');
    console.log(date.toString());
    date.setTimezone('Europe/Bratislava');
    console.log(date.toString());
  });
  return data;
};

