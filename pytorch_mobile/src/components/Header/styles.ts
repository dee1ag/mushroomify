import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 2,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
  },
  cameraContainer: {
    width: 88,
    height: 36,
    borderRadius: 32,
    borderColor: COLORS.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 4,
    color: COLORS.black,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
});
