const pacts = require('@pact-foundation/pact-node');
const branchName = require('branch-name');
const Git = require('nodegit');

const publishPacts = require('./index');

const myHash = '0abcdef';
const myBrokerUrl = 'https://my.broker.url';
const myDir = 'path/to/dir';

jest.mock('@pact-foundation/pact-node', () => ({
  publishPacts: jest.fn(),
}));

jest.mock('branch-name', () => ({
  get: jest.fn(),
}));

jest.mock('nodegit', () => ({
  Repository: {
    open: jest.fn(),
  },
}));

jest.mock('../../../../package.json', () => ({
  version: '3.0.0',
}));

describe('Publish Pacts', () => {
  let envBranchName;
  let envBuildName;

  beforeEach(() => {
    pacts.publishPacts.mockClear();
    branchName.get.mockClear();
    Git.Repository.open.mockClear();

    // set env vars
    envBranchName = process.env.BRANCH_NAME;
    envBuildName = process.env.BUILD_NAME;
    delete process.env.BRANCH_NAME;
    delete process.env.BUILD_NAME;
  });

  afterEach(() => {
    process.env.BRANCH_NAME = envBranchName;
    process.env.BUILD_NAME = envBuildName;
  });

  it('can publish pacts from master branch', async () => {
    const currentBranchName = 'master';

    branchName.get.mockImplementation(() => currentBranchName);
    Git.Repository.open.mockImplementation(() => ({
      getHeadCommit: () => ({
        sha: () => '0abcdefaaaaaaaaaaaaa',
      }),
    }));

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: `3.0.0-${myHash}`,
      tags: [currentBranchName],
    });
  });

  it('can publish pacts from a different branch', async () => {
    const currentBranchName = 'custombranch';

    branchName.get.mockImplementation(() => currentBranchName);
    Git.Repository.open.mockImplementation(() => ({
      getHeadCommit: () => ({
        sha: () => '0abcdefaaaaaaaaaaaaa',
      }),
    }));

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: `3.0.0-rc.${myHash}`,
      tags: [currentBranchName],
    });
  });

  it('can publish, when repo is no git repository', async () => {
    process.env.BRANCH_NAME = 'CUSTOMBRANCH';
    process.env.BUILD_NAME = 'C_BUILD';

    branchName.get.mockImplementation(() => { throw new Error('did not work'); });
    Git.Repository.open.mockImplementation(() => { throw new Error('did not work'); });

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: `3.0.0-rc.${process.env.BUILD_NAME}`,
      tags: [process.env.BRANCH_NAME],
    });
  });

  it('can publish, when repo is no git repository and has no env vars set', async () => {
    branchName.get.mockImplementation(() => { throw new Error('did not work'); });
    Git.Repository.open.mockImplementation(() => { throw new Error('did not work'); });

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: '3.0.0-rc.NOBUILD',
      tags: ['NO_BRANCH_AVAILABLE'],
    });
  });
});
