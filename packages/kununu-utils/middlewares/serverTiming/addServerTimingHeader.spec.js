/* global jasmine */
import addServerTimingHeader from './addServerTimingHeader';
import {SERVER_TIMING} from './constants';

describe('addServerTimingHeader', () => {
  let startTime;
  let duration;

  const res = {
    getHeader: jest.fn(),
    setHeader: jest.fn(),
  };

  beforeEach(() => {
    res.getHeader.mockClear();
    res.setHeader.mockClear();

    // Mocking date to make sure duration is alway same: https://github.com/jasmine/jasmine/blob/master/src/core/Clock.js
    jasmine.clock().install();
    startTime = new Date(2018, 11, 27);
    duration = 50;
    jasmine.clock().mockDate(startTime);
    jasmine.clock().tick(duration);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('sets a server-timing header', () => {
    res.getHeader.mockImplementation(() => '');

    const label = 'mylabel';
    const description = 'my description';

    addServerTimingHeader(res, label, startTime, description);
    expect(res.setHeader.mock.calls.length).toEqual(1);
    expect(res.setHeader.mock.calls[0][0]).toEqual(SERVER_TIMING);

    expect(res.setHeader.mock.calls[0][1]).toEqual(`${label};dur=${duration}ms;desc=${description}`);
  });

  it('does not fail, when no description is provided', () => {
    res.getHeader.mockImplementation(() => '');

    const label = 'mylabel';

    addServerTimingHeader(res, label, startTime);
    expect(res.setHeader.mock.calls[0][1]).toEqual(`${label};dur=${duration}ms`);
  });

  it('does add new set timing headers, when set-timing has already been called', () => {
    const alreadySetServerTimingHeader = 'myotherlabel;dur=80ms;desc=/myothertimingheader';
    res.getHeader.mockImplementation(() => alreadySetServerTimingHeader);

    const label = 'mylabel';
    const description = 'my description';

    addServerTimingHeader(res, label, startTime, description);
    expect(res.setHeader.mock.calls[0][1]).toEqual(`${alreadySetServerTimingHeader}, ${label};dur=${duration}ms;desc=${description}`);
  });
});

