import { advanceTo, clear } from 'jest-date-mock';

import TimeDistanceParser from '../src/time-distance-parser';

describe('TimeDistanceParser', () => {
  describe('parse', () => {
    beforeEach(() => {
      advanceTo(Date.UTC(2019, 6, 4, 13, 25, 0));
    });

    afterEach(() => {
      clear();
    });

    it('returns calculated date from the past', () => {
      const date = new TimeDistanceParser('2 months ago').parse();

      expect(date.toISOString()).toEqual('2019-05-04T13:25:00.000Z');
    });

    it('returns calculated date from the future', () => {
      const date = new TimeDistanceParser('45 minutes from now').parse();

      expect(date.toISOString()).toEqual('2019-07-04T14:10:00.000Z');
    });

    it('returns same input when distance can not be parsed', () => {
      const date = new TimeDistanceParser('3AM in the morning').parse();

      expect(date).toEqual('3AM in the morning');
    });
  });

  describe('isValidDistance', () => {
    it('accepts distances that follow the convention', () => {
      expect(new TimeDistanceParser('3 days ago').isValidDistance()).toEqual(true);
      expect(new TimeDistanceParser('1 year from now').isValidDistance()).toEqual(true);
      expect(new TimeDistanceParser('22 weeks ago').isValidDistance()).toEqual(true);
      expect(new TimeDistanceParser('34 years from now').isValidDistance()).toEqual(true);
    });

    it('rejects distances that differ from the convention', () => {
      expect(new TimeDistanceParser('Feb 3, 2019').isValidDistance()).toEqual(false);
      expect(new TimeDistanceParser('2019-02-04').isValidDistance()).toEqual(false);
      expect(new TimeDistanceParser('2 monthss ago').isValidDistance()).toEqual(false);
      expect(new TimeDistanceParser('46 years a very long time ago').isValidDistance()).toEqual(
        false
      );
    });
  });
});
