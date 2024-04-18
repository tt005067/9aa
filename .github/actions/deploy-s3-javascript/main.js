const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  //? we need some info and we could not write anything hard code, so we need input in our actions
  // * 1) get some input values

  const bucket = core.getInput('bucket', { required: true }); //* ti get inputs we use core.getInput
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // * 2) upload files ( we could use WS Sdk fo js but we use another way)
  // ? exec.exec('aws s3 sync <local-folder> <s3-bucket> --region <region>')

  const s3Uri = `s3://${bucket}`;

  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  core.notice('hello from my custom js action!');
}

run();

//? const github = require('@actions/github'); : We're not using it here.But this object would give us access to the Octokit client,which in the end is a tool provided by GitHub  github.getOctokit()...  that makes it easy to send requests to the GitHub REST API.

//? And we get access to a context object which offers some values.Not all values but some values of the GitHub context object.For example, we could get the name of the action that's currently executing,and a couple of other values as well.
