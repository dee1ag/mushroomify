import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { ScanningResult } from '../../types/types';
import { WINDOW_HEIGHT, COLORS, MODEL_IMAGES } from '../../utils/constants';
import * as MODEL_CLASSES from '../../assets/model/metadata.json';
import { findMostFrequentWithAvgProbability } from '../../utils/classification';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ModelContext } from '../../contexts/ModelContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { borderBottomWidth } from '../../utils/helpers';

type TProps = {
  bottomSheet: SharedValue<number>;
  accumulatedResults: ScanningResult[];
  navigation: NativeStackNavigationProp<RootStackParamList, ScreenNames.CameraScreen>;
  setHasScanned: React.Dispatch<React.SetStateAction<boolean>>;
  hasScannedRef: React.MutableRefObject<boolean>;
};

const NUMBER_OF_RESULTS = 3;

export const BottomSheet = ({
  bottomSheet,
  accumulatedResults,
  navigation,
  setHasScanned,
  hasScannedRef,
}: TProps) => {
  const { results, setResults } = useContext(ModelContext);
  const [selectedResult, setSelectedResult] = useState<ScanningResult | null>(null);

  const topResults = useMemo(
    () => findMostFrequentWithAvgProbability(accumulatedResults, NUMBER_OF_RESULTS),
    [accumulatedResults],
  );

  useEffect(() => {
    setSelectedResult(topResults[0]);
  }, [topResults]);

  const { bottom } = useSafeAreaInsets();

  const bottomSheetStyles = useAnimatedStyle(() => {
    const height = interpolate(bottomSheet.value, [0, 1], [0, WINDOW_HEIGHT * 0.76]);

    return { height };
  });

  const onPress = (result: ScanningResult) => setSelectedResult(result);

  const onLongPress = (result: ScanningResult) =>
    navigation.navigate(ScreenNames.ImageOverlayScreen, { result, fromHome: false });

  const onAnimationFinish = () => {
    hasScannedRef.current = false;
    setHasScanned(false);
  };

  const onCancel = () => {
    bottomSheet.value = withTiming(0, { duration: 500 }, (finished?: boolean) => {
      if (finished) {
        runOnJS(onAnimationFinish)();
      }
    });
  };

  const onSave = async () => {
    if (selectedResult && selectedResult.id) {
      const presentInArray = results.find(res => res.id === selectedResult.id);

      let newResults = [];

      if (presentInArray) {
        newResults = [
          ...results.filter(res => res.id !== presentInArray.id),
          { ...presentInArray, count: presentInArray.count + 1 },
        ];
      } else {
        newResults = [...results, { id: selectedResult.id, count: 1 }];
      }

      newResults.sort((a, b) => b.count - a.count);

      await AsyncStorage.setItem('saved_results', JSON.stringify(newResults));

      navigation.navigate(ScreenNames.HomeScreen);
      setResults(newResults);
    }
  };

  // TODO: add draggable functionality

  return (
    <Animated.View style={[styles.container, bottomSheetStyles]}>
      <View>
        <View style={styles.dragIcon} />
        <Icon
          name="checkbox-marked-circle-outline"
          size={120}
          color={COLORS.green}
          style={styles.successIcon}
        />
        <Text style={styles.header}>{`TOP ${NUMBER_OF_RESULTS} RESULTS`}</Text>
        <View style={styles.itemsContainer}>
          <Text style={styles.probabilityHeader}>Avg Probability:</Text>
          {topResults.map((result, index) => (
            <TouchableOpacity
              key={result.id}
              style={[styles.item, borderBottomWidth(index, topResults)]}
              onPress={() => onPress(result)}
              onLongPress={() => onLongPress(result)}
              delayLongPress={300}
            >
              <View style={styles.titleContainer}>
                <Animated.Image
                  sharedTransitionTag={`bottom-sheet-image-${result.id}`}
                  source={MODEL_IMAGES[result.id]}
                  style={styles.image}
                />
                {selectedResult && selectedResult.id === result.id && (
                  <View style={styles.checkCircle} />
                )}
                <Text style={styles.title}>{MODEL_CLASSES[result.id].mushroom_species_name}</Text>
              </View>
              <Text style={styles.probability}>{`${Math.round(result.probability * 100)}%`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[styles.bottomButtons, { marginBottom: bottom + 10 }]}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Icon name="close" size={20} style={styles.icon} color={COLORS.red} />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Icon name="check" size={20} style={styles.icon} color={COLORS.green} />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
