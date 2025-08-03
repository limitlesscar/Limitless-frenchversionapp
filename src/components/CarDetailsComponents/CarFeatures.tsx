import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import RoundedBadge from '../RoundedBadge';
import {CAR_FEATURES} from '../../utils/constants';

const CarFeatures = ({data}: {data: string[]}) => {
  // Erivan Couttolenc : this is where we can get the list in french of the selected features
  const getFrenchLabel = (englishValue: string) => {
    const feature = CAR_FEATURES.find(item => item.value === englishValue);
    return feature ? feature.label_fr : englishValue; // fallback to English if not found
  };
  return (
    <View style={styles.container}>
      <CustomText
        text={'Caractéristiques'}
        fontWeightPopins="600"
        fontSize="S18"
        textStyle={styles.featureHeading}
      />
      <FlatList
        data={data} // data is array of English feature values
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `feature-${item}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            title={getFrenchLabel(item)} // show French label
            value={item} // English value internally
            backgroundColor={COLORS.neutral100 as keyof typeof COLORS}
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default CarFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureHeading: {
    paddingTop: widthPercentageToDP(1),
    paddingBottom: widthPercentageToDP(3),
  },
});

/*
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import RoundedBadge from '../RoundedBadge';

const CarFeatures = ({data}: {data: string[]}) => {
  return (
    <View style={styles.container}>
      <CustomText
        text={'Features'}
        fontWeightPopins="600"
        fontSize="S18"
        textStyle={styles.featureHeading}
      />
      <FlatList
        data={data}
        scrollEnabled={false}
        numColumns={1}
        keyExtractor={(item, index) => `feature-${item}-${index}`}
        renderItem={({item}) => (
          <RoundedBadge
            title={item}
            backgroundColor={COLORS.neutral100 as keyof typeof COLORS}
          />
        )}
        contentContainerStyle={styles.badgesContainer}
      />
    </View>
  );
};

export default CarFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureHeading: {
    paddingTop: widthPercentageToDP(1),
    paddingBottom: widthPercentageToDP(3),
  },
});
*/
