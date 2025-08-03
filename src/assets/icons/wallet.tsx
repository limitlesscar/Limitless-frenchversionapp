import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const WalletIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M1.95 6a2 2 0 0 1 2-2h12.8a3.25 3.25 0 0 1 3.236 2.952 3.75 3.75 0 0 1 1.963 3.298v6A3.75 3.75 0 0 1 18.2 20H4.7a2.75 2.75 0 0 1-2.75-2.75V6Zm1.5 0a.5.5 0 0 0 .5.5H18.2c.044 0 .088 0 .132.002A1.75 1.75 0 0 0 16.749 5.5H3.95a.5.5 0 0 0-.5.5ZM15 13.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WalletIcon;
