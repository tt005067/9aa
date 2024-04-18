const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // we need some info and we could not write anything hard code, so we need input in our actions

  core.notice('hello from my custom js action!');
}

run();
