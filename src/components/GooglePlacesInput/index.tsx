import React, {useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';

const GooglePlacesInput = ({
  inputRef,
  value,
  setAddress,
  placeholder,
  isPinLocation = false,
}: {
  inputRef?: any;
  value?: string;
  setAddress?: (e: string) => void;
  placeholder?: string;
  isPinLocation?: boolean;
}) => {
  // const handleAddressChange = (data: any) => {
  //   setAddress?.(data.description);
  // };
  console.log(
    'process.env.GOOGLE_MAPS_API_KEY',
    process.env.GOOGLE_MAPS_API_KEY,
  );
  const handleClear = () => {
    setAddress?.('');
    inputRef.current?.setAddressText('');
  };
  const [isFocused, setIsFocused] = useState(false); // erivan couttolenc : this is the border for the green state when typing

  return (
    <GooglePlacesAutocomplete
      ref={inputRef}
      placeholder={placeholder || 'Search'} // this is required by library but not in use, using placeholder of textInputProps
      fetchDetails
      onPress={(data, details = null) => {
        // data.description will have the place name
        setAddress?.(data.description);
        inputRef?.current?.setAddressText(data.description);
      }}
      // onPress={handleAddressChange}
      disableScroll={true}
      debounce={300}
      enablePoweredByContainer={false}
      // keepResultsAfterBlur={Platform.OS === 'android'}
      keyboardShouldPersistTaps="always"
      textInputProps={{
        placeholderTextColor: COLORS.neutral400,
        defaultValue: value,
        clearButtonMode: 'never',
        placeholder: placeholder || 'Lieu de prise en charge',
        onFocus: () => setIsFocused(true), // ← ajouter ceci
        onBlur: () => setIsFocused(false), // ← et ceci
        style: [
          styles.textInput,
          isFocused && styles.textInputFocused, // ← appliquer le style dynamique
        ],
      }}
      styles={{description: {color: '#000'}}}
      renderLeftButton={() => (
        <View style={styles.searchIcon}>
          {isPinLocation ? (
            <CustomIcon
              icon="map-pin"
              type="Feather"
              color={COLORS.neutral400}
              size={RFValue(17)}
            />
          ) : (
            <CustomIcon
              icon="map-pin"
              type="Feather"
              color={COLORS.neutral400}
              size={RFValue(17)}
            />
          )}
        </View>
      )}
      query={{
        key: process.env.GOOGLE_MAPS_API_KEY,
        language: 'en',
      }}
      renderRightButton={() =>
        inputRef?.current?.getAddressText()?.length > 3 ? (
          <TouchableOpacity
            style={styles.clearButton}
            accessibilityLabel="Clear input"
            onPress={handleClear}>
            <CustomIcon icon="circle-with-cross" type="Entypo" />
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
      onFail={error =>
        console.error('Error on google auto complete is ', error)
      }
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: widthPercentageToDP(15),
    borderRadius: RFValue(15),
    paddingRight: RFValue(15),
    paddingLeft: RFValue(40),
    width: '100%',
    backgroundColor: COLORS.neutral50,
    position: 'relative',
    fontSize: RFValue(12),
    color: '#000',
  },
  // erivan couttolenc : this is the style for the border when serching
  textInputFocused: {
    borderColor: COLORS.newprimary, // ou une autre couleur de ton thème
    borderWidth: 1,
  },
  clearButton: {
    padding: widthPercentageToDP(2),
    flex: 1,
    position: 'absolute',
    right: RFValue(5),
    top: RFValue(8),
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: RFValue(15),
    top: widthPercentageToDP(Platform.OS === 'ios' ? 4.5 : 5),
  },
});

export default GooglePlacesInput;

/*
import React, {useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';

const GooglePlacesInput = ({
  inputRef,
  value,
  setAddress,
  placeholder,
  isPinLocation = false,
}: {
  inputRef?: any;
  value?: string;
  setAddress?: (e: string) => void;
  placeholder?: string;
  isPinLocation?: boolean;
}) => {
  // const handleAddressChange = (data: any) => {
  //   setAddress?.(data.description);
  // };
  console.log(
    'process.env.GOOGLE_MAPS_API_KEY',
    process.env.GOOGLE_MAPS_API_KEY,
  );
  const handleClear = () => {
    setAddress?.('');
    inputRef.current?.setAddressText('');
  };

  return (
    <GooglePlacesAutocomplete
      ref={inputRef}
      placeholder={placeholder || 'Search'} // this is required by library but not in use, using placeholder of textInputProps
      fetchDetails
      onPress={(data, details = null) => {
        // data.description will have the place name
        setAddress?.(data.description);
        inputRef?.current?.setAddressText(data.description);
      }}
      // onPress={handleAddressChange}
      disableScroll={true}
      debounce={300}
      enablePoweredByContainer={false}
      // keepResultsAfterBlur={Platform.OS === 'android'}
      keyboardShouldPersistTaps="always"
      textInputProps={{
        placeholderTextColor: COLORS.neutral400,
        defaultValue: value,

        // value: value,
        clearButtonMode: 'never',
        // InputComp: TextInput,

        placeholder: placeholder || 'Pickup location',

        style: styles.textInput,
      }}
      styles={{description: {color: '#000'}}}
      renderLeftButton={() => (
        <View style={styles.searchIcon}>
          {isPinLocation ? (
            <CustomIcon
              icon="map-pin"
              type="Feather"
              color={COLORS.neutral400}
              size={RFValue(17)}
            />
          ) : (
            <CustomIcon
              icon="search"
              type="Feather"
              color={COLORS.neutral400}
              size={RFValue(17)}
            />
          )}
        </View>
      )}
      query={{
        key: process.env.GOOGLE_MAPS_API_KEY,
        // key: 'AIzaSyCk7ilPq5BJ6TeEbjhHzTr5eUsXSjhC_J0',
        language: 'en',
      }}
      renderRightButton={() =>
        inputRef?.current?.getAddressText()?.length > 3 ? (
          <TouchableOpacity
            style={styles.clearButton}
            accessibilityLabel="Clear input"
            onPress={handleClear}>
            <CustomIcon icon="circle-with-cross" type="Entypo" />
          </TouchableOpacity>
        ) : (
          <View />
        )
      }
      onFail={error =>
        console.error('Error on google auto complete is ', error)
      }
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: widthPercentageToDP(15),
    borderRadius: RFValue(15),
    paddingRight: RFValue(15),
    paddingLeft: RFValue(40),
    width: '100%',
    backgroundColor: COLORS.neutral50,
    position: 'relative',
    fontSize: RFValue(12),
    color: '#000',
  },
  clearButton: {
    padding: widthPercentageToDP(2),
    flex: 1,
    position: 'absolute',
    right: RFValue(5),
    top: RFValue(8),
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: RFValue(15),
    top: widthPercentageToDP(Platform.OS === 'ios' ? 4.5 : 5),
  },
});

export default GooglePlacesInput;
*/
