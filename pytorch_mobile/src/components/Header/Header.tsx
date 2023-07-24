import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { ModelContext } from '../../contexts/ModelContext';
import { COLORS } from '../../utils/constants';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/core';
import { useIsOffline } from '../../hooks/useIsOffline';

type TProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, ScreenNames.HomeScreen>;
};

export const Header = ({ navigation }: TProps) => {
  const { isLoading } = useContext(ModelContext);
  const { isOffline } = useIsOffline();
  const { top } = useSafeAreaInsets();

  const onPress = () => navigation.navigate(ScreenNames.CameraScreen);

  const webOff = useSharedValue(0);

  const bottomContainerStyles = useAnimatedStyle(() => {
    const height = interpolate(webOff.value, [0, 1], [0, 32]);
    const opacity = interpolate(webOff.value, [0, 1], [0, 1]);

    return {
      height,
      opacity,
    };
  });

  useFocusEffect(
    React.useCallback(() => {
      if (isOffline) {
        webOff.value = withDelay(1000, withTiming(1));
      } else {
        webOff.value = withTiming(0);
      }
    }, [webOff, isOffline]),
  );

  return (
    <>
      <View style={[styles.container, { height: 56 + (top || 8), paddingTop: top || 8 }]}>
        <View style={styles.titleContainer}>
          <Icon name="mushroom" size={24} color={COLORS.black} />
          <Text style={styles.title}>Mushroomify</Text>
        </View>
        <TouchableOpacity disabled={isLoading} style={styles.cameraContainer} onPress={onPress}>
          {isLoading ? (
            <ActivityIndicator animating={isLoading} color={COLORS.black} size="small" />
          ) : (
            <View style={styles.textContainer}>
              <Icon name="camera-outline" color={COLORS.black} size={20} />
              <Text style={styles.text}>Scan</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.bottomContainer, bottomContainerStyles]}>
        <Icon name="web-off" color={COLORS.black} size={16} />
        <Text style={styles.text}>No Internet</Text>
      </Animated.View>
    </>
  );
};
