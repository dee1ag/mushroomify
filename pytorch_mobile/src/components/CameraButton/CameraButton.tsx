import React from 'react';
import { styles } from './styles';
import { Pressable, View } from 'react-native';

type TProps = {
  isButtonPressed: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
};

export const CameraButton = ({ isButtonPressed, onPressIn, onPressOut }: TProps) => {
  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={styles.container}>
      {isButtonPressed ? <View style={styles.pressed} /> : <View style={styles.unpressed} />}
    </Pressable>
  );
};
