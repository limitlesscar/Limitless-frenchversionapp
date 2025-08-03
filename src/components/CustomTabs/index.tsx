import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SHADOWS} from '../../utils/theme';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

export default function CustomTabs({
  sceneMap = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  },
  screenRoutes = [
    {key: 'first', title: 'En cours'},
    {key: 'second', title: 'À venir'},
    {key: 'third', title: 'Terminé'},
  ],
}) {
  const layout = useWindowDimensions();

  const renderScene = SceneMap(sceneMap);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(screenRoutes);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <View>
          <TabBar
            {...props}
            activeColor={COLORS.black}
            inactiveColor={COLORS.neutral500}
            style={{backgroundColor: COLORS.white, marginBottom: RFValue(10)}}
            indicatorStyle={[styles.indicatorStyle, SHADOWS.light]}
            labelStyle={styles.labelStyle}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: 'absolute',
    // height: '80%',
    backgroundColor: COLORS.black,
    // bottom: '10%',
    borderRadius: RFValue(8),
    width: '30%',
    left: '1.5%',
  },
  labelStyle: {
    fontSize: RFValue(14),
  },
});

/*
import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, SHADOWS} from '../../utils/theme';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

export default function CustomTabs({
  sceneMap = {
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  },
  screenRoutes = [
    {key: 'first', title: 'Ongoing'},
    {key: 'second', title: 'Upcoming'},
    {key: 'third', title: 'Completed'},
  ],
}) {
  const layout = useWindowDimensions();

  const renderScene = SceneMap(sceneMap);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(screenRoutes);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <View>
          <TabBar
            {...props}
            activeColor={COLORS.black}
            inactiveColor={COLORS.neutral500}
            style={{backgroundColor: COLORS.white, marginBottom: RFValue(10)}}
            indicatorStyle={[styles.indicatorStyle, SHADOWS.light]}
            labelStyle={styles.labelStyle}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  indicatorStyle: {
    position: 'absolute',
    // height: '80%',
    backgroundColor: COLORS.black,
    // bottom: '10%',
    borderRadius: RFValue(8),
    width: '30%',
    left: '1.5%',
  },
  labelStyle: {
    fontSize: RFValue(14),
  },
});
*/
