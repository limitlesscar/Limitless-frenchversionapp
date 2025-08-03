import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ChatIcon = (props: SvgProps) => (
  <Svg width={20} height={21} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M10 0C4.477 0 0 4.477 0 10c0 1.489.326 2.904.912 4.177a.12.12 0 0 1 .01.046s0 .001 0 0L.128 16.78c-.593 1.906 1.175 3.704 3.09 3.142l2.687-.787a.093.093 0 0 1 .045.01C7.189 19.695 8.56 20 10 20c5.523 0 10-4.477 10-10S15.523 0 10 0Z"
    />
  </Svg>
);
export default ChatIcon;
