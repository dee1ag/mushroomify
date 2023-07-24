import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const LongArrow = (props: SvgProps) => (
  <Svg width={24} height={92} viewBox="0 0 24 92" fill="none" {...props}>
    <Path d="M12.448 2L1 19M12.448 2L22.5 19M12.448 2v90" stroke="#000" strokeWidth={1} />
  </Svg>
);
