const path = require('path');

const pact = require('@pact-foundation/pact-node');
const branchName = require('branch-name');
const Git = require('nodegit');

const packageJson = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line import/no-dynamic-require

/**
 * Checks if current branch is master branch
 *
 * @param {string} currentBranchName
 */
function isMaster (currentBranchName) {
  return currentBranchName === 'master';
}

/**
 * Returns release candidate label if branch is not master
 *
 * @param {string} currentBranchName
 * @param {string} hash
 */
function getReleaseCandidate (currentBranchName, hash) {
  const gitHash = hash.substr(0, 7);

  return isMaster(currentBranchName) ? `-${gitHash}` : `-rc.${gitHash}`;
}

/**
 * Returns the version number via package json and also adds a
 * release candidate label, if the branch is not master
 *
 * @param {string} currentBranchName
 * @param {string} hash
 */
function getConsumerVersionByPackageJson (currentBranchName, hash) {
  return `${packageJson.version}${getReleaseCandidate(currentBranchName, hash)}`;
}

/**
 * Get current branchname of this git repo
 * @return {string}
 */
async function getCurrentBranchName () {
  try {
    const branchname = await branchName.get();

    return branchname;
  } catch (err) {
    console.log('Probably not a git repo');
  }

  return process.env.BRANCH_NAME || 'NO_BRANCH_AVAILABLE';
}

/**
 * Get current hash of this git repo
 * @return {string}
 */
async function getCurrentGitHash () {
  try {
    // get current hash of this git repo
    const repo = await Git.Repository.open(process.cwd());
    const commit = await repo.getHeadCommit();

    return commit.sha();
  } catch (err) {
    console.log('Probably not a git repo');
  }

  return process.env.BUILD_NAME || 'NOBUILD';
}

/**
 * Publishes pacts from a directory to a pact broker.
 * For convenience, this also finds out which git branch and
 * commit hash is currently needed for tagging and publishing
 *
 * @param {string} pactDir to pacts
 * @param {string} brokerUrl pacts broker url
 */
async function publishPacts (pactDir, brokerUrl) {
  // get current branch name
  const currentBranchName = await getCurrentBranchName();

  const hash = await getCurrentGitHash();

  const consumerVersion = getConsumerVersionByPackageJson(currentBranchName, hash);

  // publish pacts
  const options = {
    pactFilesOrDirs: [pactDir],
    pactBroker: brokerUrl,
    consumerVersion,
    tags: [currentBranchName],
  };

  await pact.publishPacts(options);
}

module.exports = publishPacts;
