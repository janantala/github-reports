
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');
var Q = require('q');
var time = require('time')(Date);

exports.analyze = function(req, res){

  var file = 'results-20130628-004520.csv';

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
    return filter(data);
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
  .to.array( function(data, count, err){
    if (err) {
      console.log('error msg');
      console.log(err);
    }
    cb(null, data);
  });
};

var filter = function(data){

  var obj = {};
  data.forEach(function(contribution){
    console.log(contribution['created_at']);

    var arr = contribution['created_at'].split(' ');
    var year = arr[0].split('-')[0];
    var month = arr[0].split('-')[1] - 1;
    var date = arr[0].split('-')[2];
    var hour = arr[1].split(':')[0];

    console.log(year, month, date, hour);
    var date = new time.Date(year, month, date, hour, 'UTC');
    console.log(date.toString());
    date.setTimezone('Europe/Bratislava');
    console.log(date.toString());


    if (contribution.type === 'PushEvent') {

    }
    else if (contribution.type === 'CreateEvent') {
      
    }
    else if (contribution.type === 'ForkEvent') {
      
    }
    else if (contribution.type === 'PullRequestEvent') {
      
    }
    else if (contribution.type === 'PushEvent') {
      
    }
    else if (contribution.type === 'IssueCommentEvent') {
      
    }
    else if (contribution.type === 'IssuesEvent') {
      
    }
  });
  return data;
};