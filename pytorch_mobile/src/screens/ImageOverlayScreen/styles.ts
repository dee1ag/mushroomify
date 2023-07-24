import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    width: 300,
    height: 300,
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: COLORS.white,
  },
  edibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  edibility: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginRight: 8,
  },
});
