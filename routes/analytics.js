
/*
 * Analytics.
 */

var fs = require('fs');
var csv = require('csv');
var Q = require('q');
var time = require('time')(Date);

exports.analyze = function(req, res){

  var file = req.query.csv || 'janantala.csv';
  var timezone = req.query.timezone || 'Europe/Bratislava';
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
    return classify(data, classes, timezone);
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

var classify = function(data, classes, timezone){

  var yearArr = initArray(12, classes); // histogram
  var weekArr = initArray(7, classes); // histogram
  var dayArr = initArray(24, classes); // histogram
  var weekhoursArr = [initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes), initArray(24, classes)]; // punchcard

  data.forEach(function(contribution){
    // console.log(contribution['created_at'], contribution['type']);

    var arr = contribution['created_at'].split(' ');
    var year = arr[0].split('-')[0];
    var month = arr[0].split('-')[1] - 1;
    var day = arr[0].split('-')[2];
    var hour = arr[1].split(':')[0];

    var date = new time.Date(year, month, day, hour, 'UTC');
    date.setTimezone(timezone);

    yearArr[date.getMonth()][contribution['type']] += 1;
    weekArr[date.getDay()][contribution['type']] += 1;
    dayArr[date.getHours()][contribution['type']] += 1;
    weekhoursArr[date.getDay()][date.getHours()][contribution['type']] += 1;
  });

  return {
    'yearArr': yearArr,
    'weekArr': weekArr,
    'dayArr': dayArr,
    'weekhoursArr': weekhoursArr
  };
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

