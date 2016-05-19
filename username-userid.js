var child_process = require("child_process");

module.exports = function (username, cb) {

  return new Promise(function(resolve, reject) {

    var process = child_process.spawn("id", ["-u", username]);
    var stdout = new String();
    var stderr = new String();

    process.stdout.on("data", function(chunk) {
      stdout += new String(chunk);
    });

    process.stderr.on("data", function(chunk) {
      stderr += new String(chunk);
    });

    process.on("close", function (code) {

      var err;

      // for non-existant user
      if(stderr.indexOf('no such user') > -1) err = new Error("User '"+username+"' does not exist");

      // otherwise use stderr
      else if(stderr.length) err = new Error(stderr);

      // parse uid from stdout
      var uid = new Number(stdout);

      // callback api
      if(cb && cb.constructor === Function) cb(err, uid);

      // promise api
      if(err) reject(err);
      else resolve(uid);

    });

  });

}
