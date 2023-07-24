import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.red,
  },
});
