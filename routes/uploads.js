
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
  res.json(path);
};


exports.clear = function(req, res){

};