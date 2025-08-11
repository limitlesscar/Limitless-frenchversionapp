import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {useIsFocused} from '@react-navigation/native';
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
  const isFocusedScreen = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    if (isFocusedScreen) {
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, isFocusedScreen, slideAnim]);
  const handleClear = () => {
    setAddress?.('');
    inputRef?.current?.setAddressText('');
  };
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Animated.View
      style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
      <GooglePlacesAutocomplete
        ref={inputRef}
        minLength={2}
        placeholder={placeholder || 'Search'}
        fetchDetails
        onPress={(data, _details = null) => {
          setAddress?.(data.description);
          inputRef?.current?.setAddressText(data.description);
        }}
        disableScroll={true}
        debounce={300}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="always"
        textInputProps={{
          placeholderTextColor: COLORS.neutral400,
          defaultValue: value,
          clearButtonMode: 'never',
          placeholder: placeholder || 'Lieu de prise en charge',
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
          style: [styles.textInput, isFocused && styles.textInputFocused],
        }}
        styles={{description: {color: '#000'}}}
        renderLeftButton={() => (
          <View style={styles.searchIcon}>
            <CustomIcon
              icon="map-pin"
              type="Feather"
              color={isPinLocation ? COLORS.newprimary : COLORS.neutral400}
              size={RFValue(17)}
            />
          </View>
        )}
        query={{
          key: 'AIzaSyD2s3vyySyBlavEpYIa6cG8R0mpTBJM48Y',
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
    </Animated.View>
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
  textInputFocused: {
    borderColor: COLORS.newprimary,
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
