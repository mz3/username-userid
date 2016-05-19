# username-userid

Convert a linux username to a uid in your nodejs program.

## Usage

```node
var usernameToUid = require("username-userid");

// callback api
usernameToUid("michael", function(err, uid) {
  console.log(uid);
});

// promise api
usernameToUid("michael").then(function(uid) {
  console.log(uid);
}).catch(function(err) {
  console.error(err);
})

## Run the tests

```bash
npm test
```
