import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {COLORS} from '../../utils/theme';

const RangePicker = ({
  date,
  setEndDate,
  setStartDate,
  disabledDates,
}: {
  date: any;
  setStartDate?: (e: any) => void;
  setEndDate?: (e: any) => void;
  disabledDates?: [];
}) => {
  const minDate = new Date(); // Today

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const HandleDateChange = (date: Date, type: string) => {
    if (type === 'END_DATE') {
      setEndDate?.(date);
    } else {
      setStartDate?.(date);
      setEndDate?.('');
    }
  };
  return (
    <CalendarPicker
      startFromMonday={true}
      allowRangeSelection={true}
      allowBackwardRangeSelect={true}
      minDate={minDate}
      weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
      months={[
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ]}
      previousTitle="Précédent"
      nextTitle="Suivant"
      todayBackgroundColor={COLORS.neutral400}
      selectedDayColor={COLORS.primary}
      selectedDayTextColor="#FFFFFF"
      selectedStartDate={date?.start}
      selectedEndDate={date?.end}
      onDateChange={HandleDateChange}
      disabledDates={disabledDates}
    />
  );
};

export default RangePicker;

/* import React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {addUnitTime} from '../../utils/dayjs';
import {COLORS} from '../../utils/theme';

const RangePicker = ({
  date,
  setEndDate,
  setStartDate,
  disabledDates,
}: {
  date: any;
  setStartDate?: (e: any) => void;
  setEndDate?: (e: any) => void;
  disabledDates?: [];
}) => {
  const minDate = new Date(); // Today

  const HandleDateChange = (date: Date, type: string) => {
    if (type === 'END_DATE') {
      setEndDate?.(date);
    } else {
      setStartDate?.(date);
      setEndDate?.('');
    }
  };
  return (
    <CalendarPicker
      startFromMonday={true}
      allowRangeSelection={true}
      allowBackwardRangeSelect={true}
      minDate={minDate}
      weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
      previousTitle="Prev"
      nextTitle="Next"
      // maxDate={addUnitTime(6, 'month')}
      todayBackgroundColor={COLORS.neutral400}
      selectedDayColor={COLORS.primary}
      selectedDayTextColor="#FFFFFF"
      selectedStartDate={date?.start}
      selectedEndDate={date?.end}
      onDateChange={HandleDateChange}
      disabledDates={disabledDates}
    />
  );
};

export default RangePicker;
*/
