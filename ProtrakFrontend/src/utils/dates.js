import dayjs from 'dayjs';

export const weeksBetween = (sinceDate, untilDate) => {
  return Math.round((untilDate - sinceDate) / (7 * 24 * 60 * 60 * 1000));
};

export const dateWithoutTime = (date = new Date()) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

export const defaultDateToInput = (date = new Date()) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export default { weeksBetween, dateWithoutTime, defaultDateToInput };
