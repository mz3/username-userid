'use strict';

process.env.NODE_ENV = 'test';

const assert = require('assert');
const UsernameToUid = require('../username-userid');

describe('UsernameToUid', function() {

  it("root's uid should be 0 (promise api)", function() {
    return UsernameToUid("root").then(function(uid) {
      assert.equal(uid, 0);
    });
  });

  it("root's uid should be 0 (callback api)", function(done) {
    UsernameToUid("root", function(err, uid) {
      assert.equal(uid, 0);
      done(err);
    });
  });

  it("should fail invalid username", function(done) {
    UsernameToUid("1234").then(function(uid) {

      // this should not run for invalid username
      done(new Error("Did not fail invalid username"));

    }).catch(function(err) {

      // expect an error saying user doesn't exist
      assert(err.message.indexOf('does not exist') > -1);

      // finish
      done();
    });
  });

});
