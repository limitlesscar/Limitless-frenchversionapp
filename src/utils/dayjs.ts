import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat); // parsing date in calendar --- DO NOT REMOVE IT
const formatDate = (date: string, format = 'MMM DD YYYY ') => {
  return dayjs(date).utc().format(format);
};
export const formatDatefrench = (dateString: string) => {
  const date = new Date(dateString);
  // Options for French date format
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short', // short month name in French
    year: 'numeric',
  };
  // Format date to French locale
  return date.toLocaleDateString('fr-FR', options);
};
const getMaxAgeDate = (years = 18) => {
  return dayjs().subtract(years, 'years').toDate();
};
const addUnitTime = (value = 18, key = 'years') => {
  return dayjs().add(value, key).toDate();
};
export const isToday = (date: string) => {
  return dayjs(date).isSame(dayjs(), 'day');
};
export {dayjs, formatDate, getMaxAgeDate, addUnitTime};

/**
 * ----------------------------------------------
 * Contribution by erivan couttolenc – August 2025
 * - Added `formatDatefrench` for French locale formatting.
 * - Ensured `dayjs` is extended with `utc`, `timezone`, and `customParseFormat`.
 * - Marked `customParseFormat` as required for calendar parsing (DO NOT REMOVE).
 * ----------------------------------------------
 */

/*
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat); // parsing date in calendar --- DO NOT REMOVE IT

const formatDate = (date: string, format = 'MMM DD YYYY ') => {
  return dayjs(date).utc().format(format);
};

const getMaxAgeDate = (years = 18) => {
  return dayjs().subtract(years, 'years').toDate();
};

const addUnitTime = (value = 18, key = 'years') => {
  return dayjs().add(value, key).toDate();
};

export const isToday = (date: string) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export {dayjs, formatDate, getMaxAgeDate, addUnitTime};
*/
