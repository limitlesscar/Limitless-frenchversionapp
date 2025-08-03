import React, {FC, useCallback, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import {ICustomTextInput} from './interface';

const CustomTextInput: FC<ICustomTextInput> = props => {
  const {
    inputContainerStyle,
    placeholder,
    secureTextEntry,
    multiline,
    numberOfLines,
    keyboardType,
    onSubmitEditing,
    blurOnSubmit,
    maxLength,
    textStyle,
    error,
    value,
    onChangeText,
    editField,
    name,
    textInputRef,
    bottomTextInfo,
    title,
    titleTextStyle,
    autoCapitalize = 'none',
    requiredStar = false,
    disabled,
    ...rest
  } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [canEdit, setCanEdit] = useState(editField);
  const [focus, setFocus] = useState(false);
  const canEditRef = React.useRef(canEdit);
  const inputRef = React.useRef<TextInput>(null);

  const onPressEdit = () => {
    setCanEdit(!canEdit);
    canEditRef.current = !canEditRef.current;
    inputRef?.current?.blur();
    if (!canEditRef.current) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    } else {
      inputRef?.current?.blur();
    }
  };

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.rowAndCenter}>
          <CustomText
            color={COLORS.black}
            fontWeightPopins="600"
            fontSize="S12"
            textStyle={[
              {
                marginBottom: hp(1),
              },
              titleTextStyle,
            ]}
            text={title}
          />

          {requiredStar && <CustomText color={COLORS.error600} text={' *'} />}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          focus && styles.focus,
          inputContainerStyle,
          error && {borderColor: COLORS.error600},
          {backgroundColor: disabled ? COLORS.neutral200 : COLORS.neutral50},
        ]}>
        <View style={styles.flex1}>
          <TextInput
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry ? hidePassword : false}
            multiline={multiline}
            style={[styles.inputText, textStyle]}
            numberOfLines={numberOfLines}
            focusable={true}
            keyboardType={keyboardType}
            ref={textInputRef || inputRef}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            placeholderTextColor={COLORS.neutral500}
            maxLength={maxLength}
            editable={disabled || !canEdit}
            key={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...rest}
          />
        </View>

        {!!secureTextEntry && (
          <CustomIcon
            icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            type="Ionicons"
            size={RFValue(18.75)}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          />
        )}
        {!!editField && (
          <CustomIcon
            icon={canEdit ? 'edit' : 'save'}
            type="Feather"
            size={RFValue(18.75)}
            onPress={onPressEdit}
            style={styles.eyeIcon}
          />
        )}
      </View>
      {!!bottomTextInfo && (
        <CustomText
          color={'#808080'}
          textStyle={styles.bottomTextInfo}
          text={bottomTextInfo}
        />
      )}
      {!!error && (
        <View style={styles.errorContainer}>
          <CustomText
            color={COLORS.error600}
            textStyle={!!error && styles.errorText}
            text={error}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: hp(0.8)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.neutral50,
    minHeight: hp(6.5),
    borderRadius: 10,
    backgroundColor: COLORS.neutral50,
  },
  inputText: {
    fontSize: RFValue(11),
    fontFamily: FONT.poppinsRegular,
    flex: 1,
    paddingHorizontal: RFValue(9.375),
    color: COLORS.black,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  eyeIcon: {
    flexDirection: 'row',
    paddingRight: RFValue(6.25),
  },
  bottomTextInfo: {
    fontSize: RFValue(9.375),
    lineHeight: RFValue(13.125),
    marginVertical: hp(0.5),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.4),
    marginLeft: RFValue(0.93),
  },
  errorText: {
    fontFamily: FONT.poppinsRegular,
    fontSize: RFValue(9.5),
  },
  focus: {},
  rowAndCenter: {
    flexDirection: 'row',
  },
  flex1: {flex: 1},
});

export default CustomTextInput;
