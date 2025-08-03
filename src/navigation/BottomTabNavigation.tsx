import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, IMAGES, SHADOWS} from '../utils/theme';
import {ChatList, Home, Hosting, Search, Setting} from '../screens';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {CustomImage} from '../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Source} from 'react-native-fast-image';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {navigate} from '../utils/navigation';
import useUserStore from '../service/store/user.store';

const Tab = createBottomTabNavigator();

interface TabbarItem {
  id: number;
  name: string;
  image: Source;
  component: React.ComponentType;
}

const BottomTabNavigation = () => {
  const {accessToken} = useUserStore();
  let Tabbar: TabbarItem[] = [
    {
      id: 1,
      name: 'Home',
      image: IMAGES.home,
      component: Home,
    },
    {
      id: 2,
      name: 'Search',
      image: IMAGES.search,
      component: Search,
    },
    {
      id: 3,
      name: 'Hosting',
      image: IMAGES.hostingCarBottomTab,
      component: Hosting,
    },
    {
      id: 4,
      name: 'Chat',
      image: IMAGES.bottomtabChat,
      component: ChatList,
    },
    {
      id: 5,
      name: 'Setting',
      image: IMAGES.setting,
      component: Setting,
    },
  ];

  const renderTabBarButton = (
    props: BottomTabBarButtonProps,
    image: Source,
    tab: TabbarItem,
  ) => {
    const {onPress, accessibilityState} = props;
    const focused = accessibilityState?.selected || false;

    return (
      <TouchableWithoutFeedback
        onPress={
          tab.name === 'Chat' && !accessToken
            ? () => navigate('UserAuthScreen')
            : onPress
        }>
        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.iconContainer,
              focused && styles.iconContainerFocused,
            ]}>
            <CustomImage
              source={image}
              height={hp(3)}
              width={hp(3)}
              resizeMode="contain"
              disabled={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      {Tabbar.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          key={tab.id}
          options={{
            tabBarStyle: styles.tabBarStyle,
            tabBarButton: props => renderTabBarButton(props, tab.image, tab),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white', // transparent white
    position: 'absolute',
    bottom: hp(5),
    height: hp(8),
    marginHorizontal: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingBottom: 0,
    borderRadius: 80,
    borderColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent border
    borderWidth: 1,
    ...SHADOWS.light,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: hp(1.5),
    borderRadius: hp(80),
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: COLORS.black,
    ...SHADOWS.medium,
  },
});

export default BottomTabNavigation;

/*
  Ce composant `BottomTabNavigation` crée une barre de navigation par onglets personnalisée
  pour l'application, avec 5 onglets principaux : Home, Search, Hosting, Chat, et Setting.

  - Chaque onglet est défini via un tableau `Tabbar` contenant son nom, son icône et le composant écran associé.
  - Le bouton d'onglet est personnalisé avec `renderTabBarButton` :
    - Affiche une icône avec un style qui change si l'onglet est sélectionné.
    - Pour l'onglet "Chat", si l'utilisateur n'est pas connecté (`accessToken` absent),
      la navigation redirige vers l'écran d'authentification `UserAuthScreen` au lieu d'ouvrir la liste de chats.
  - La barre d'onglets est stylisée avec un fond blanc, coins arrondis, ombres et position flottante en bas de l'écran.
  - Les labels des onglets sont masqués (`tabBarShowLabel: false`), seuls les icônes sont visibles.

  Cette configuration offre une navigation fluide et sécurisée (authentification requise pour certains onglets),
  avec un design moderne et responsive grâce aux utilitaires de taille et aux styles d'ombre.
*/
