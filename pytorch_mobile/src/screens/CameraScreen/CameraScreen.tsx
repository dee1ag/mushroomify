import { View } from 'react-native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { styles } from './styles';
import { Camera, Image, Tensor } from 'react-native-pytorch-core';
import { ModelContext } from '../../contexts/ModelContext';
import { imageToTensor } from '../../utils/classification';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import ScanningCircle from '../../components/ScanningCircle/ScanningCircle';
import { ScanningResult } from '../../types/types';
import { CameraButton } from '../../components/CameraButton/CameraButton';
import { useStatusBarStyle } from '../../hooks/useStatusBarStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, ScreenNames } from '../../types/navigation';
import { CloseButton } from '../../components/CloseButton/CloseButton';

type TProps = NativeStackScreenProps<RootStackParamList, ScreenNames.CameraScreen>;

export const CameraScreen = ({ navigation }: TProps) => {
  const { model } = useContext(ModelContext);
  const hasScannedRef = useRef(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [isButtonPressed, setButtonPressed] = useState(false);
  const [accumulatedResults, setAccumulatedResults] = useState<ScanningResult[]>([]);

  useStatusBarStyle('light-content');

  // TODO: exepriment with camera init
  // const isTransitionEnded = useIsTransitionEnded();

  const onFrame = async (image: Image) => {
    if (!model.current || !isButtonPressed) {
      await image.release();

      if (!hasScannedRef.current) {
        setAccumulatedResults(prevResults => (prevResults.length > 0 ? [] : prevResults));
      }

      return;
    }

    const tensor = imageToTensor(image);

    const output = await model.current.forward<Tensor[], Tensor>(tensor);

    const top3Outputs = output.softmax(1).topk(3, { largest: true, sorted: true });
    const ids = top3Outputs[1];
    const probability = top3Outputs[0];

    const top3Results: ScanningResult[] = [];

    ids.data().forEach((id, index) =>
      top3Results.push({
        id,
        probability: probability.data()[index],
      }),
    );

    console.log(top3Results);

    setAccumulatedResults(prevResults => [...prevResults, ...top3Results]);

    await image.release();
  };

  const progress = useSharedValue(0);
  const bottomSheet = useSharedValue(0);

  const onAnimationFinish = useCallback(() => {
    bottomSheet.value = withTiming(1);
    hasScannedRef.current = true;
    setButtonPressed(false);
    setHasScanned(true);
  }, [bottomSheet]);

  const onPressIn = useCallback(() => {
    setButtonPressed(true);
    progress.value = withTiming(1, { duration: 10000 }, (finished?: boolean) => {
      if (finished) {
        runOnJS(onAnimationFinish)();
      }
    });
  }, [progress, onAnimationFinish]);

  const onPressOut = useCallback(() => {
    setButtonPressed(false);
    progress.value = withTiming(0, { duration: 400 });
  }, [progress]);

  const onClose = () => navigation.goBack();

  const textureDimensions = {
    height: 1920,
    width: 1080,
  };

  return (
    <View style={styles.container}>
      {/* TODO: add animated hints */}
      <ScanningCircle progress={progress} />
      <Camera
        style={styles.camera}
        onFrame={onFrame}
        targetResolution={textureDimensions}
        hideCaptureButton={true}
        hideFlipButton={true}
      />
      <CloseButton onClose={onClose} />
      <CameraButton
        isButtonPressed={isButtonPressed}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
      {hasScanned && (
        <BottomSheet
          bottomSheet={bottomSheet}
          accumulatedResults={accumulatedResults}
          navigation={navigation}
          setHasScanned={setHasScanned}
          hasScannedRef={hasScannedRef}
        />
      )}
    </View>
  );
};
