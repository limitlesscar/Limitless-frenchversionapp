import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {PaymentScreenChildProps} from './interface';
import {CustomButton, CustomImage, CustomText} from '../../components';
import {navigateReset} from '../../utils/navigation';
import {COLORS, IMAGES} from '../../utils/theme';
import useBookingStore from '../../service/store/booking.store';

const PaymentSummary: FC<PaymentScreenChildProps> = ({
  scrollRef,
  setCurrentIndex,
}) => {
  const {selectedCarDetails} = useBookingStore();
  const payable_amount = selectedCarDetails?.extra_details?.payable_amount;
  const HandleDone = () => {
    navigateReset('RootStack');
  };
  return (
    <View style={styles.container}>
      <CustomImage
        source={IMAGES.paymentSuccess}
        containerStyle={styles.imageContainer}
      />

      <CustomText
        text="Paiement réussi"
        fontWeightPopins="600"
        center
        fontSize="S16"
        textStyle={styles.amount}
      />
      <CustomText
        text="Votre paiement a été effectué avec succès."
        color={COLORS.neutral400}
        center
        fontWeightInter="500"
        fontSize="S14"
      />
      <CustomText
        text="Paiement total"
        color={COLORS.neutral400}
        center
        fontWeightInter="500"
        fontSize="S14"
      />
      <CustomText
        text={`${payable_amount}€`}
        center
        fontWeightPopins="600"
        fontSize="S14"
        textStyle={styles.amount}
      />

      <View style={{
        marginHorizontal:50,
      }}>
        <CustomButton
          title="Terminé"
          onPress={HandleDone}
          containerStyle={styles.btnContainerStyle}
        />
      </View>
    </View>
  );
};

export default PaymentSummary;

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(100),
    paddingTop: widthPercentageToDP(20),
  },
  btnContainerStyle: {
    marginHorizontal: widthPercentageToDP(5),
  },
  imageContainer: {
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(30),
    alignSelf: 'center',
    marginVertical: widthPercentageToDP(5),
  },
  amount: {
    marginVertical: widthPercentageToDP(4),
  },
});
