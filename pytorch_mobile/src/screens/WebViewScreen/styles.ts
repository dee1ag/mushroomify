import { StyleSheet } from 'react-native';
import { COLORS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingLeft: 12,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  activityIndicator: {
    top: WINDOW_HEIGHT / 2,
    left: WINDOW_WIDTH / 2 - 15,
    position: 'absolute',
    zIndex: 10,
  },
});
