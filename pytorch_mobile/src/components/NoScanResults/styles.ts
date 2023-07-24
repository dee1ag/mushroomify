import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  arrow: {
    position: 'absolute',
    right: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 4,
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.black,
  },
  description: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '300',
    fontStyle: 'italic',
    // textDecorationLine: 'underline',
    // color: COLORS.black,
  },
});
