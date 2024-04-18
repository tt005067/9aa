const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // * core gives us lots of functions to use
  // * ex for printing
  core.notice('hello from my custom js action!');
}

run();

//  *  cd .github/actions/deploy-s3-javascript
//  * nmp init -y
//  * nmp i  @actions/core @actions/github @actions/exec
//  ? https://github.com/actions/toolkit
