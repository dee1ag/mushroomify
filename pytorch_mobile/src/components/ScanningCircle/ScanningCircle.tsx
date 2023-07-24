import React from 'react';
import { COLORS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/constants';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './styles';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';

const R = WINDOW_WIDTH * 0.44;
const CIRCLE_LENGTH = R * 2 * Math.PI;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type TProps = {
  progress: SharedValue<number>;
};

const ScanningCircle = ({ progress }: TProps) => {
  const circleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: (CIRCLE_LENGTH - 1) * (1 - progress.value),
  }));

  return (
    <AnimatedSvg style={styles.circlecContainer}>
      <Circle
        cx={WINDOW_WIDTH / 2}
        cy={WINDOW_HEIGHT / 2}
        r={R}
        fill="transparent"
        stroke={COLORS.white}
        strokeWidth={14}
        strokeDasharray={CIRCLE_LENGTH}
        strokeLinecap="round"
      />
      <AnimatedCircle
        cx={WINDOW_WIDTH / 2}
        cy={WINDOW_HEIGHT / 2}
        r={R}
        fill="transparent"
        stroke={COLORS.green}
        strokeWidth={15}
        strokeDasharray={CIRCLE_LENGTH}
        animatedProps={circleAnimatedProps}
        strokeLinecap="round"
      />
    </AnimatedSvg>
  );
};

export default ScanningCircle;
