import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CarDetailInfoCard from '../CarDetailInfoCard';
import {CustomText} from '../CustomText';

const CarAbout: FC<any> = ({data, hideHeading}) => {
  const renderItem = useCallback(({item, index}: any) => {
    return <CarDetailInfoCard item={item} index={index} />;
  }, []);
  return (
    <View>
      {!hideHeading ? (
        <CustomText
          text={'À propos'}
          fontWeightPopins="600"
          fontSize="S18"
          textStyle={styles.aboutText}
        />
      ) : (
        <View style={styles.aboutText} />
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default CarAbout;

const styles = StyleSheet.create({
  contentContainerStyle: {
    // flexDirection: 'row',
    // gap: RFValue(5),
    // flexWrap: 'wrap',
    // alignSelf:'center'
  },

  aboutText: {
    paddingVertical: widthPercentageToDP(2),
  },
});

/*
import React, {FC, useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CarDetailInfoCard from '../CarDetailInfoCard';
import {CustomText} from '../CustomText';

const CarAbout: FC<any> = ({data, hideHeading}) => {

  const renderItem = useCallback(({item, index}: any) => {
    return <CarDetailInfoCard item={item} index={index} />;
  }, []);

  return (
    <View>
      {!hideHeading ? (
        <CustomText
          text={'About'}
          fontWeightPopins="600"
          fontSize="S18"
          textStyle={styles.aboutText}
        />
      ) : (
        <View style={styles.aboutText} />
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default CarAbout;

const styles = StyleSheet.create({
  contentContainerStyle: {
    // flexDirection: 'row',
    // gap: RFValue(5),
    // flexWrap: 'wrap',
    // alignSelf:'center'
  },

  aboutText: {
    paddingVertical: widthPercentageToDP(2),
  },
});
*/
