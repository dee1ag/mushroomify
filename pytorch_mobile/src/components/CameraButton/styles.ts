import { StyleSheet } from 'react-native';
import { COLORS, WINDOW_WIDTH } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: WINDOW_WIDTH / 2 - 28,
    bottom: 40,
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: COLORS.white,
    borderWidth: 4,
    zIndex: 3,
  },
  pressed: {
    backgroundColor: 'white',
    width: 52,
    height: 52,
    borderRadius: 52,
  },
  unpressed: {
    backgroundColor: 'white',
    width: 56,
    height: 56,
    borderRadius: 56,
  },
});
