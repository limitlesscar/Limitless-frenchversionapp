import React, {FC} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../utils/theme';
import {CustomText} from '../CustomText';
import CustomButton from '../CustomButton';
import {LogoutModalProps} from './interface';

const LogoutModal: FC<LogoutModalProps> = ({
  isVisible,
  onLogout,
  onCancel,
  logoutLoading,
}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <CustomText text="Déconnexion" textStyle={styles.logout} />
        <CustomText
          text="Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour utiliser l'application."
          fontWeightPopins="600"
          textStyle={styles.logoutDescription}
        />
        <View style={styles.ctaContainer}>
          <CustomButton
            title="Annuler"
            onPress={onCancel}
            containerStyle={styles.cancelBtnContainer}
            textStyle={styles.cancelBtn}
            disabled={logoutLoading}
          />
          <CustomButton
            title="Se déconnecter"
            onPress={onLogout}
            containerStyle={styles.flex1}
            textStyle={styles.logoutBtn}
            loading={logoutLoading}
            disabled={logoutLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: widthPercentageToDP(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(8),
  },
  logout: {
    fontFamily: FONT.inter900,
    fontWeight: '900',
    fontSize: RFValue(Platform.OS === 'android' ? 18 : 15),
    paddingVertical: RFValue(8),
  },
  logoutDescription: {
    fontSize: RFValue(Platform.OS === 'android' ? 12 : 11),
    fontFamily: FONT.poppins600,
    fontWeight: '600',
    color: COLORS.neutral600,
    textAlign: 'center',
    paddingBottom: RFValue(8),
  },
  ctaContainer: {
    paddingVertical: RFValue(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: RFValue(15),
  },
  flex1: {
    flex: 1,
  },
  cancelBtnContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: RFValue(1),
    borderColor: COLORS.black,
  },
  cancelBtn: {
    color: COLORS.black,
    fontFamily: FONT.inter600,
    fontWeight: '600',
    fontSize: RFValue(12),
  },
  logoutBtn: {
    color: COLORS.white,
    fontFamily: FONT.inter600,
    fontWeight: '600',
    fontSize: RFValue(12),
  },
});

// import React, {FC} from 'react';
// import {Platform, StyleSheet, View} from 'react-native';
// import Modal from 'react-native-modal';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {widthPercentageToDP} from 'react-native-responsive-screen';
// import {COLORS, FONT} from '../../utils/theme';
// import {CustomText} from '../CustomText';
// import CustomButton from '../CustomButton';
// import {LogoutModalProps} from './interface';

// const LogoutModal: FC<LogoutModalProps> = ({
//   isVisible,
//   onLogout,
//   onCancel,
//   logoutLoading,
// }) => {
//   return (
//     <Modal isVisible={isVisible}>
//       <View style={styles.container}>
//         <CustomText text="Log out" textStyle={styles.logout} />
//         <CustomText
//           text="Are you sure you want to log out? You'll need to login again to use the app."
//           fontWeightPopins="600"
//           textStyle={styles.logoutDescription}
//         />
//         <View style={styles.ctaContainer}>
//           <CustomButton
//             title="Cancel"
//             onPress={onCancel}
//             containerStyle={styles.cancelBtnContainer}
//             textStyle={styles.cancelBtn}
//             disabled={logoutLoading}
//           />
//           <CustomButton
//             title="Logout"
//             onPress={onLogout}
//             containerStyle={styles.flex1}
//             textStyle={styles.logoutBtn}
//             loading={logoutLoading}
//             disabled={logoutLoading}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default LogoutModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     maxHeight: widthPercentageToDP(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//     borderRadius: RFValue(10),
//     paddingHorizontal: RFValue(8),
//   },
//   logout: {
//     fontFamily: FONT.inter900,
//     fontWeight: '900',
//     fontSize: RFValue(Platform.OS === 'android' ? 18 : 15),
//     paddingVertical: RFValue(8),
//   },
//   logoutDescription: {
//     fontSize: RFValue(Platform.OS === 'android' ? 12 : 11),
//     fontFamily: FONT.poppins600,
//     fontWeight: '600',
//     color: COLORS.neutral600,
//     textAlign: 'center',
//     paddingBottom: RFValue(8),
//   },
//   ctaContainer: {
//     paddingVertical: RFValue(8),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: RFValue(15),
//   },
//   flex1: {
//     flex: 1,
//   },
//   cancelBtnContainer: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     borderWidth: RFValue(1),
//     borderColor: COLORS.black,
//   },
//   cancelBtn: {
//     color: COLORS.black,
//     fontFamily: FONT.inter600,
//     fontWeight: '600',
//     fontSize: RFValue(12),
//   },
//   logoutBtn: {
//     color: COLORS.white,
//     fontFamily: FONT.inter600,
//     fontWeight: '600',
//     fontSize: RFValue(12),
//   },
// });
