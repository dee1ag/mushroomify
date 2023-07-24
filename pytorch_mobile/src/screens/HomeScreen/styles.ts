import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: 40,
    marginTop: -1,
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
