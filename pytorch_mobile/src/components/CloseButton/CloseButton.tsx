import React from 'react';
import { styles } from './styles';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../utils/constants';

type TProps = {
  onClose: () => void;
};

export const CloseButton = ({ onClose }: TProps) => {
  return (
    <Pressable onPress={onClose} style={styles.container}>
      <Icon name="close" size={30} color={COLORS.white} />
    </Pressable>
  );
};
