import {StyleSheet, View, TextInput, Platform} from 'react-native';
import React, {FC} from 'react';

import {COLORS} from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../CustomIcon';
import {CustomSearchInputProps} from './interface';

const CustomSearchInput: FC<CustomSearchInputProps> = ({onChangeText}) => {
  return (
    <View style={styles.container}>
      <CustomIcon
        type={'Feather'}
        icon="search"
        size={20}
        color={COLORS.neutral500}
        style={styles.icon}
      />

      <TextInput
        placeholder="Rechercher"
        placeholderTextColor={COLORS.neutral500}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default CustomSearchInput;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: heightPercentageToDP(7.5),
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(10),
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(Platform.OS === 'android' ? 0 : 5),
    width: '100%',
  },
  icon: {
    marginRight: widthPercentageToDP(2),
    color: COLORS.neutral50,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
});

/*
import {StyleSheet, View, TextInput, Platform} from 'react-native';
import React, {FC} from 'react';

import {COLORS} from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../CustomIcon';
import {CustomSearchInputProps} from './interface';


const CustomSearchInput: FC<CustomSearchInputProps> = ({onChangeText}) => {
  return (
    <View style={styles.container}>
      <CustomIcon
        type={'Feather'}
        icon="search"
        size={20}
        color={COLORS.neutral500}
        style={styles.icon}
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor={COLORS.neutral500}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomSearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: heightPercentageToDP(7.5),
    backgroundColor: COLORS.neutral50,
    borderRadius: RFValue(10),
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: widthPercentageToDP(Platform.OS === 'android' ? 0 : 5),
    width: '100%',
  },
  icon: {
    marginRight: widthPercentageToDP(2),
    color: COLORS.neutral50,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    color: COLORS.black,
  },
});
*/
