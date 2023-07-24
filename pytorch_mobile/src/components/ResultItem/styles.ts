import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderColor: COLORS.black,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  title: {
    paddingLeft: 4,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
    color: COLORS.black,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    paddingLeft: 4,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
});
