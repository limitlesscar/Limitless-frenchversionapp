import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const CalendarIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M7 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7ZM5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2H5Zm4.25 5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm0 4a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12 13.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM13.25 16a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM16 13.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CalendarIcon;
