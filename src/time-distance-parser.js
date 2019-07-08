import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default class TimeDistanceParser {
  constructor(distance) {
    this.distance = distance;
    this.startDate = dayjs().utc();

    const [length, unit, ...direction] = distance.split(' ');
    this.length = Number.parseInt(length, 10);
    this.unit = unit;
    this.direction = direction.join(' ');
  }

  parse() {
    if (!this.isValidDistance()) {
      return this.distance;
    }

    if (this.direction === 'from now') {
      return this.startDate.add(this.length, this.unit);
    }

    return this.startDate.subtract(this.length, this.unit);
  }

  isValidDistance() {
    const validLength = !Number.isNaN(this.length) && Number.isInteger(this.length);
    const validUnit = !!this.unit && TimeDistanceParser.allowedUnits().includes(this.unit);
    const validDirection = !!this.direction && ['from now', 'ago'].includes(this.direction);

    return validLength && validUnit && validDirection;
  }

  static allowedUnits() {
    return [
      'second',
      'seconds',
      'minute',
      'minutes',
      'hour',
      'hours',
      'day',
      'days',
      'week',
      'weeks',
      'month',
      'months',
      'year',
      'years',
    ];
  }
}
