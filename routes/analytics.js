
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');
var Q = require('q');
var async = require('async');
var time = require('time')(Date);

var obj = {};

exports.analyze = function(req, res){

  console.log('request');
  if (!(req.headers.accept && req.headers.accept == 'text/event-stream')) {
    res.send(404);
    return false;
  }

  var file = req.query.csv || 'janantala.csv';
  var timezone = req.query.timezone || 'Europe/Bratislava';
  var classes = ['PushEvent', 'PullRequestEvent', 'IssuesEvent'];

  obj = {
    'yearArr': initArray(12, classes), // histogram
    'weekArr': initArray(7, classes), // histogram
    'dayArr': initArray(24, classes), // histogram
    'weekhoursArr': [initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes)] // punchcard
  };

  var id = (new Date()).toLocaleTimeString();
  // var interval = setInterval(function() {
  //   console.log('interval');
  //   constructSSE(res, id, JSON.stringify(obj), false);
  // }, 1000);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });


  res.socket.on('close', function () {
    console.log('close');
    res.end();
  });

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
    return classify(data, classes, timezone, function(){
      constructSSE(res, id, JSON.stringify(obj), false)
    });
  })
  .then(function(){
    constructSSE(res, id, JSON.stringify(obj), true);
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

var classify = function(data, classes, timezone, sendSSE){

  data.forEach(function(contribution, index){
    var arr = contribution['created_at'].split(' ');
    var year = arr[0].split('-')[0];
    var month = arr[0].split('-')[1] - 1;
    var day = arr[0].split('-')[2];
    var hour = arr[1].split(':')[0];

    var date = new time.Date(year, month, day, hour, 'UTC');
    date.setTimezone(timezone);

    obj.yearArr[date.getMonth()][contribution['type']] += 1;
    obj.weekArr[date.getDay()][contribution['type']] += 1;
    obj.dayArr[date.getHours()][contribution['type']] += 1;
    obj.weekhoursArr[date.getDay()][date.getHours()][contribution['type']] += 1;

    if (index !== 0 && index % 100 === 0){
      sendSSE();
    }
  });
};

var initArray = function(arraySize, classes){
  var array = [];
  while(arraySize--) {
    var obj = {};
    classes.forEach(function(c){ obj[c] = 0; });
    array.push(obj);
  }
  return array;
};

var constructSSE = function(res, id, data, close) {
  res.write('id: ' + id + '\n');
  res.write('data: ' + data + '\n\n');
  console.log('constructSSE: write');

  if (close) {
    res.write('id: ' + id + '\n');
    res.write('event: ' + 'close' + '\n\n');
    console.log('constructSSE: res end');
    res.end();
  }
};
