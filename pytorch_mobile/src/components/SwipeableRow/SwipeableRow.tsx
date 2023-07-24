import React, { PropsWithChildren } from 'react';
import { Animated, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { COLORS } from '../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const RIGHT_ACTION_WIDTH = 128;

type TProps = PropsWithChildren & {
  onRightActionPress: () => void;
};

export const SwipeableRow = ({ children, onRightActionPress }: TProps) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<string | number>,
    dragX: Animated.AnimatedInterpolation<string | number>,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [RIGHT_ACTION_WIDTH, 0],
    });

    const scale = dragX.interpolate({
      inputRange: [-RIGHT_ACTION_WIDTH, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.container, { width: RIGHT_ACTION_WIDTH }]}>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateX }] }]}>
          <RectButton style={styles.button} onPress={onRightActionPress}>
            <AnimatedIcon
              name="delete-forever"
              size={30}
              color={COLORS.white}
              style={{ transform: [{ scale }] }}
            />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};
