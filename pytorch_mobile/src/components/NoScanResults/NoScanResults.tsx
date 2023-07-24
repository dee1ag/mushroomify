import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../utils/constants';
import { LongArrow } from '../../assets/svgs/LongArrow';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const NoScanResults = () => {
  const curlyArrow = useSharedValue(0);

  const arrowStyles = useAnimatedStyle(() => {
    const top = interpolate(curlyArrow.value, [0, 1], [4, 20]);

    return {
      top,
    };
  });

  useEffect(() => {
    curlyArrow.value = withSequence(
      withRepeat(withTiming(1), 4, true),
      withDelay(1200, withRepeat(withTiming(1), 4, true)),
      withDelay(1200, withRepeat(withTiming(1), 4, true)),
    );
  }, [curlyArrow]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.arrow, arrowStyles]}>
        <LongArrow />
      </Animated.View>
      <View style={styles.titleContainer}>
        <Icon name="format-list-checkbox" size={30} color={COLORS.black} />
        <Text style={styles.title}>No results</Text>
      </View>
      <Text style={styles.description}>Start scanning at top</Text>
    </View>
  );
};

export default NoScanResults;
