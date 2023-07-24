import React from 'react';
import { InteractionManager, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { ICONS_EDIBILITY, MODEL_IMAGES } from '../../utils/constants';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { BlurView } from '@react-native-community/blur';
import * as MODEL_CLASSES from '../../assets/model/metadata.json';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TEdibility } from '../../types/types';
import { useStatusBarStyle } from '../../hooks/useStatusBarStyle';

type TProps = NativeStackScreenProps<RootStackParamList, ScreenNames.ImageOverlayScreen>;

export const ImageOverlayScreen = ({ route, navigation }: TProps) => {
  useStatusBarStyle('light-content');

  const { result, fromHome } = route.params;
  const name = MODEL_CLASSES[result.id].mushroom_species_name;
  const edibility = MODEL_CLASSES[result.id].edibility;
  const edibilityIcon = ICONS_EDIBILITY[edibility as TEdibility];

  const onPress = () => navigation.goBack();

  const texts = useSharedValue(0);

  useFocusEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      texts.value = withTiming(1, { duration: 800 });
    });
  });

  const textsStyles = useAnimatedStyle(() => {
    return {
      opacity: texts.value,
    };
  }, []);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <BlurView style={styles.blurView} blurType="dark" />
      <Animated.Image
        sharedTransitionTag={
          fromHome ? `home-image-${result.id}` : `bottom-sheet-image-${result.id}`
        }
        source={MODEL_IMAGES[result.id]}
        style={styles.image}
      />
      <Animated.View style={[styles.textContainer, textsStyles]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.name}>-</Text>
        <View style={styles.edibilityContainer}>
          <Text style={[styles.edibility, { color: edibilityIcon.color }]}>
            {edibility.split('_').join(' ')}
          </Text>
          <Icon name={edibilityIcon.name} size={32} color={edibilityIcon.color} />
        </View>
      </Animated.View>
    </Pressable>
  );
};
