import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../CustomImage';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomHorizontalCarousel: FC<{
  height?: number;
  width?: number;
  images: Array<string>;
}> = ({height = hp(30), width = wp(100), images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{height, width}}
        onScroll={onScroll}
        decelerationRate={'fast'}
        renderItem={({item}) => {
          return (
            <CustomImage
              source={typeof item === 'string' ? {uri: item} : item}
              style={{height, width}}
              resizeMode="contain" // Shows entire image, no cropping
              containerStyle={styles.imageContainer}
            />
          );
        }}
      />
      {images?.length > 1 && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorItem,
                {
                  backgroundColor:
                    index === currentIndex ? COLORS.white : COLORS.neutral200,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomHorizontalCarousel;

const styles = StyleSheet.create({
  container: {
    // height: hp(34),
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(2),
    alignSelf: 'center',
    gap: RFValue(2),
    backgroundColor: COLORS.neutral300,
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(10),
  },
  indicatorItem: {
    height: RFValue(5),
    width: RFValue(5),
    borderRadius: RFValue(10),
  },
  imageContainer: {
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginBottom: RFValue(30),
    backgroundColor: COLORS.white,
  },
});
