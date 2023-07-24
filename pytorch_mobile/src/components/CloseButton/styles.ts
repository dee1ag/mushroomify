import { StyleSheet } from 'react-native';
import { COLORS, WINDOW_WIDTH } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: WINDOW_WIDTH / 5,
    bottom: 44,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: COLORS.white,
    borderWidth: 1,
    zIndex: 3,
  },
});
