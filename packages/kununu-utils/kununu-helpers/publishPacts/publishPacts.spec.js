const pacts = require('@pact-foundation/pact-node');
const branchName = require('branch-name');

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
    open: () => ({
      getHeadCommit: () => ({
        sha: () => '0abcdefaaaaaaaaaaaaa',
      }),
    }),
  },
}));

jest.mock('../../../../package.json', () => ({
  version: '3.0.0',
}));

fdescribe('Publish Pacts', () => {
  beforeEach(() => {
    pacts.publishPacts.mockClear();
    branchName.get.mockClear();
  });

  it('can publish pacts from master branch', async () => {
    const currentBranchName = 'master';

    branchName.get.mockImplementation(() => currentBranchName);

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: '3.0.0',
      tags: [currentBranchName],
    });
  });

  it('can publish pacts from a different branch', async () => {
    const currentBranchName = 'custombranch';

    branchName.get.mockImplementation(() => currentBranchName);

    await publishPacts(myDir, myBrokerUrl);

    expect(pacts.publishPacts.mock.calls.length).toEqual(1);
    expect(pacts.publishPacts.mock.calls[0][0]).toEqual({
      pactFilesOrDirs: [myDir],
      pactBroker: myBrokerUrl,
      consumerVersion: `3.0.0-rc.${myHash}`,
      tags: [currentBranchName],
    });
  });
});
