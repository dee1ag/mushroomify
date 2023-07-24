import React, { useContext } from 'react';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { useStatusBarStyle } from '../../hooks/useStatusBarStyle';
import { Header } from '../../components/Header/Header';
import { ModelContext } from '../../contexts/ModelContext';
import { FlatList, View } from 'react-native';
import * as MODEL_CLASSES from '../../assets/model/metadata.json';
import { SavedResult } from '../../types/types';
import NoScanResults from '../../components/NoScanResults/NoScanResults';
import ResultItem from '../../components/ResultItem/ResultItem';
import { SwipeableRow } from '../../components/SwipeableRow/SwipeableRow';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TProps = NativeStackScreenProps<RootStackParamList, ScreenNames.HomeScreen>;

export const HomeScreen = ({ navigation }: TProps) => {
  useStatusBarStyle('dark-content');

  const { results, setResults } = useContext(ModelContext);

  const onPress = (result: SavedResult) =>
    navigation.navigate(ScreenNames.WebViewScreen, {
      name: MODEL_CLASSES[result.id].mushroom_species_name.split(' ').join('_'),
    });

  const onLongPress = (result: SavedResult) =>
    navigation.navigate(ScreenNames.ImageOverlayScreen, { result, fromHome: true });

  const onDelete = async (result: SavedResult) => {
    const newResults = [
      ...results.filter(r => r.id !== result.id).sort((a, b) => b.count - a.count),
    ];

    await AsyncStorage.setItem('saved_results', JSON.stringify(newResults));

    setResults(newResults);
  };

  const renderItem = ({ item, index }: { item: SavedResult; index: number }) => (
    <SwipeableRow onRightActionPress={() => onDelete(item)}>
      <ResultItem item={item} index={index} onPress={onPress} onLongPress={onLongPress} />
    </SwipeableRow>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {results.length === 0 ? (
        <NoScanResults />
      ) : (
        <FlatList
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.contentContainerStyle}
          data={results}
          keyExtractor={result => String(result.id)}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: 72,
            offset: 72 * index,
            index,
          })}
        />
      )}
    </View>
  );
};
