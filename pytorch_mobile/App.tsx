import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MobileModel, Module, torch } from 'react-native-pytorch-core';
import { ModelProvider } from './src/contexts/ModelContext';
import { RootStack } from './src/navigation/RootStack';
import { SavedResult } from './src/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const model = useRef<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SavedResult[]>([]);

  useEffect(() => {
    const initModel = async () => {
      setIsLoading(true);

      try {
        // TODO: try with react-native-fs
        const filePath = await MobileModel.download(
          require('./src/assets/model/efficientnet_v2_s_384.ptl'),
        );

        model.current = await torch.jit._loadForMobile(filePath);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    const initResults = async () => {
      try {
        const jsonResults = await AsyncStorage.getItem('saved_results');

        if (jsonResults) {
          const savedResults: SavedResult[] = JSON.parse(jsonResults);

          setResults(savedResults);
        }
      } catch (e) {
        console.error(e);
      }
    };

    initModel();
    initResults();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ModelProvider value={{ model, isLoading, results, setResults }}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ModelProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
