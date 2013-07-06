
/*
 * Uploads.
 */

exports.csv = function(req, res){
  console.log(req.body);
  console.log(req.files);

  var paths = [];
  var csv = req.files.csv;
  console.log(csv);
  var path = csv.path.split('/').pop();
  res.render('report', {'profile': req.body.profile, 'file': path, 'timezone': req.body.timezone});
};


exports.clear = function(req, res){
  var dir = process.cwd() + '/uploads/';
  var fs = require('fs');
  fs.readdir(dir, function(err, files){
    if (err) {
      console.log(err);
      return false;
    }

    var csvs = [];
    files.forEach(function(file){
      if (file !== '.gitignore') {
        csvs.push(file);
      }
    });

    var MAXAGE = 1000 * 60 * 60; // 1 hr
    var time = new Date().getTime();
    var remove = [];
    csvs.forEach(function(csv){
      var age = time - fs.statSync(dir + csv).mtime.getTime();
      if (age > MAXAGE) {
        remove.push(csv);
      }
    });

    remove.forEach(function(csv){
      console.log('Removing tmp csv', dir + csv);
      fs.unlink(dir + csv, function (err) {
        if (err) {
          console.log(err);
          return false;
        }
      });
    });
  });
};