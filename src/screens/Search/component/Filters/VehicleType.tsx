import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CustomHeader, CustomText, RoundedBadge} from '../../../../components';
import {VEHICLE_TYPES} from '../../../../utils/constants';
import {COLORS} from '../../../../utils/theme';
interface VehicleTypeProps {
  onBack: () => void;
  setFilters: (e: Object) => void;
  filters: any;
}
const VehicleType: FC<VehicleTypeProps> = ({onBack, filters, setFilters}) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Appliquer le filtre" handleBackPress={onBack} />
      <CustomText text="Type de véhicule" />
      <FlatList
        data={VEHICLE_TYPES}
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `feature-${item.value}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            title={item.label} // French label for display
            value={item.value} // English value for logic
            backgroundColor={COLORS.white as keyof typeof COLORS}
            activeBadge={filters?.vehicle_type}
            setActiveBadge={value =>
              setFilters((prev: any) => ({
                ...prev,
                vehicle_type: value,
              }))
            }
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default VehicleType;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentageToDP(5),
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: widthPercentageToDP(2),
  },
});
