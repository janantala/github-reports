
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

};