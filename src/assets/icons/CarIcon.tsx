import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const CarIcon = (props: SvgProps) => (
  <Svg width={22} height={16} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M6.414 0A2 2 0 0 0 5 .586L.586 5A2 2 0 0 0 0 6.414V12a2 2 0 0 0 2 2h.837a3.5 3.5 0 0 0 6.326 0h3.674a3.5 3.5 0 0 0 6.326 0H20a2 2 0 0 0 2-2V6.82a2 2 0 0 0-1.608-1.961l-3.821-.765L14.1.8a2 2 0 0 0-1.6-.8H6.414ZM4.5 12.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm10 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM10.917 6h2.076a.25.25 0 0 1 .199.402l-2.949 3.846c-.156.204-.481.068-.446-.186L10.084 8H8.007a.25.25 0 0 1-.199-.402l2.95-3.846c.155-.204.48-.068.445.186L10.917 6Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CarIcon;
