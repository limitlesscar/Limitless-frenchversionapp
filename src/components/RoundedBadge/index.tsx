import React, {FC, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {RoundedBadgeProps} from './interface';
import {COLORS} from '../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomText} from '../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';

interface MultiSelectProps extends RoundedBadgeProps {
  title: string; // label shown on badge (e.g. French)
  value?: string; // optional internal value (e.g. English)
  isMultiSelect?: boolean;
  activeBadge?: string;
  activeBadges?: string[];
  setActiveBadges?: (badges: string[]) => void;
  setActiveBadge?: (badge: string) => void;
  onPress?: (e?: string) => void;
  disabled?: boolean;
  backgroundColor?: string;
}

const RoundedBadge: FC<MultiSelectProps> = ({
  title,
  value,
  isMultiSelect = false,
  activeBadge,
  setActiveBadge,
  activeBadges = [],
  setActiveBadges,
  disabled,
  backgroundColor,
  onPress,
}) => {
  // Accept active if either title OR value matches
  const isSelected = isMultiSelect
    ? activeBadges?.some(
        badge => badge === title || (value ? badge === value : false),
      )
    : activeBadge === title || (value ? activeBadge === value : false);

  const handlePress = useCallback(() => {
    // Call onPress callback with 'value' (English internal key) if it exists,
    // otherwise fallback to 'title'.
    // This ensures filtering uses the internal 'value' instead of the displayed label (e.g. French).
    onPress?.(value ?? title); // Pass value (English) for filtering, fallback to title if no value
    // If the badge is disabled, do nothing further.
    if (disabled) return;
    if (isMultiSelect && setActiveBadges) {
      // Use 'value' as the key to add/remove from active badges for consistent filtering,
      // fallback to 'title' if 'value' is undefined.
      const badgeKey = value ?? title;
      // If currently selected, remove this badgeKey from activeBadges,
      // else add it to activeBadges.
      setActiveBadges(
        isSelected
          ? activeBadges.filter(item => item !== badgeKey)
          : [...activeBadges, badgeKey],
      );
    } else if (!isMultiSelect && setActiveBadge) {
      // For single select, set the active badge to the internal 'value' (or fallback to 'title').
      setActiveBadge(value ?? title);
    }
  }, [
    onPress,
    title,
    value,
    disabled,
    isMultiSelect,
    setActiveBadges,
    setActiveBadge,
    isSelected,
    activeBadges,
  ]);

  const bgColor = isSelected
    ? COLORS.newprimary
    : disabled
    ? COLORS.neutral50
    : backgroundColor || COLORS.white;

  return (
    <Pressable
      style={[styles.container, {backgroundColor: bgColor}]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={`${title} badge`}
      accessibilityRole="button">
      <CustomText
        text={title}
        fontSize="S12"
        fontWeightPopins="600"
        color={isSelected ? COLORS.white : COLORS.black}
        lineHeight={RFValue(16)}
      />
    </Pressable>
  );
};

export default RoundedBadge;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.neutral200,
    borderWidth: 1,
    paddingHorizontal: widthPercentageToDP(3.65),
    paddingVertical: widthPercentageToDP(2.5),
    borderRadius: widthPercentageToDP(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
