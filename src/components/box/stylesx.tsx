import {StyleSheet} from 'react-native';
import {COLORS} from '../../utils/theme';

export const stylesx = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: 162,
    borderRadius: 20,
    margin: 12,
    backgroundColor: COLORS.newprimary,
    flexDirection: 'row',
    padding: 12,
  },
  hostBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: 12,
    width: 80,
  },
  roundButton: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 26,
  },
  button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 10,
    borderRadius: 9999,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  columnLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  columnRight: {
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
});
