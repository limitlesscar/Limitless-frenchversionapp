import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../utils/theme';
import {
  CustomButton,
  CustomOTPInput,
  CustomText,
  CustomWrapper,
} from '../../../components';
import {AuthHeader} from '../components';
import {useAuth} from '../../../hooks/useAuth';
import {API_REASONS} from '../../../utils/constants';
import {useRoute} from '@react-navigation/native';
const VerifyOtpScreen = () => {
  const route = useRoute();
  const email = (route.params as any)?.email;
  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(60);
  const {verifyOtp, verifyOtpLoading, resendOtp, resendOtpLoading} = useAuth();
  const onSubmit = () => {
    verifyOtp({
      email,
      otp: Number(otp),
      reason: API_REASONS.FORGOT_PASSWORD as keyof typeof API_REASONS,
    });
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [time]);
  const HandleResentdCode = () => {
    console.log('object');
    setOtp('');
    resendOtp({
      email,
      reason: API_REASONS.FORGOT_PASSWORD as keyof typeof API_REASONS,
    });
    setTime(60);
  };
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <AuthHeader
        heading="Code de vérification"
        description="Veuillez saisir le code de vérification envoyé à votre adresse e-mail."
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <CustomOTPInput
          onCompleteForm={() => {}}
          value={otp}
          setValue={setOtp}
        />
        <CustomText
          text={'Renvoyer le code'}
          center
          style={styles.resend}
          onPress={HandleResentdCode}
          disabled={time > 0}
        />
        {time > 0 && (
          <View style={styles.timeConatiner}>
            <CustomText
              text={'Temps restant : '}
              center
              color={COLORS.neutral400}
            />
            <CustomText text={`${time} sec`} center style={styles.time} />
          </View>
        )}
        <CustomButton
          loading={verifyOtpLoading || resendOtpLoading}
          title={'Vérifier'}
          onPress={onSubmit}
          disabled={otp.length !== 4}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: RFValue(10),
  },
  flex1: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: widthPercentageToDP(20),
  },
  haveAccount: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: widthPercentageToDP(4),
    paddingBottom: widthPercentageToDP(2),
  },
  bold: {fontWeight: '600', fontSize: RFValue(12)},
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(3.5),
    fontFamily: FONT.poppins600,
    fontSize: RFValue(12),
  },
  heading: {
    paddingTop: widthPercentageToDP(1.5),
    paddingBottom: widthPercentageToDP(4),
    fontSize: RFValue(24),
    fontFamily: FONT.poppins600,
    textAlign: 'center',
  },
  timeConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: widthPercentageToDP(5),
  },
  time: {
    marginHorizontal: widthPercentageToDP(1),
    fontSize: RFValue(14),
    fontFamily: FONT.poppinsRegular,
    color: COLORS.neutral400,
  },
  resend: {
    paddingBottom: widthPercentageToDP(Platform.OS === 'ios' ? 4 : 2),
    fontSize: RFValue(13),
    fontFamily: FONT.poppins500,
    color: COLORS.primary,
    textAlign: 'center',
  },
});

export default VerifyOtpScreen;
