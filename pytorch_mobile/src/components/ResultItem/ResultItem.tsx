import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import { SavedResult } from '../../types/types';
import Animated, { FadeInLeft, SequencedTransition } from 'react-native-reanimated';
import { styles } from './styles';
import { borderBottomWidth } from '../../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsOffline } from '../../hooks/useIsOffline';
import { COLORS, MODEL_IMAGES } from '../../utils/constants';
import * as MODEL_CLASSES from '../../assets/model/metadata.json';
import { ModelContext } from '../../contexts/ModelContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TProps = {
  item: SavedResult;
  index: number;
  onPress: (result: SavedResult) => void;
  onLongPress: (result: SavedResult) => void;
};

const ITEM_HEIGHT = 72;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ResultItem = ({ item, index, onPress, onLongPress }: TProps) => {
  const { results } = useContext(ModelContext);

  const { isOffline } = useIsOffline();

  return (
    <AnimatedTouchableOpacity
      disabled={isOffline}
      entering={FadeInLeft.delay(index * 50)}
      layout={SequencedTransition}
      key={item.id}
      style={[styles.item, { height: ITEM_HEIGHT }, borderBottomWidth(index, results)]}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
      delayLongPress={300}
    >
      <View style={styles.leftContainer}>
        <Animated.Image
          sharedTransitionTag={`home-image-${item.id}`}
          source={MODEL_IMAGES[item.id]}
          style={styles.image}
        />
        <Text style={styles.title}>{MODEL_CLASSES[item.id].mushroom_species_name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.count}>{item.count}</Text>
        <Icon name="chevron-right" color={isOffline ? COLORS.white : COLORS.black} size={20} />
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default ResultItem;
