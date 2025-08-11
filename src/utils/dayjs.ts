import dayjs from 'dayjs';
import 'dayjs/locale/fr'; // Load French locale
dayjs.locale(
  {
    ...dayjs.Ls.fr,
    monthsShort: [
      'janv',
      'févr',
      'mars',
      'avr',
      'mai',
      'juin',
      'juil',
      'août',
      'sept',
      'oct',
      'nov',
      'déc',
    ],
  },
  null,
  true,
);

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat); // parsing date in calendar --- DO NOT REMOVE IT
const formatDate = (date: string, format = 'MMM DD YYYY') => {
  return dayjs(date).utc().format(format);
};
export const formatDateFrench = (
  dateString: string,
  format = 'DD MMM YYYY',
) => {
  // Only switch to French for this call
  return dayjs(dateString).locale('fr').format(format);
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
 * Contribution by Erivan couttolenc – August 2025
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
