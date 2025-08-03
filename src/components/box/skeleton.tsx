import React, {useEffect} from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';

export const SkeletonLoader = () => {
  const shimmerOpacity = new Animated.Value(0.3);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start();
  }, [
    
  ]);

  return (
    <View style={styles.skeletonContainer}>
      <Animated.View style={[styles.skeletonBox, {opacity: shimmerOpacity}]}>
        <View style={styles.skeletonRow}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.skeletonButtonWrapper}>
              <View style={styles.skeletonCircle} />
              <View style={styles.skeletonTextLine} />
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  skeletonBox: {
    height: 162,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    padding: 16,
    justifyContent: 'center',
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  skeletonButtonWrapper: {
    alignItems: 'center',
  },
  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    marginBottom: 6,
  },
  skeletonTextLine: {
    width: 60,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#D6D6D6',
  },
});
