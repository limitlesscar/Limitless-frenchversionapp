import React from 'react';
import InfoModal from '../InfoModal/index';
import {IMAGES} from '../../utils/theme';
interface ProcessModalProps {
  processModal: {
    isRejected: boolean;
    isVerified: boolean;
  };
  setState: (state: {isRejected: boolean; isVerified: boolean}) => void;
}
const PendingModal = (props: ProcessModalProps) => {
  return (
    <InfoModal
      btnOnPress={() => props.setState({isRejected: false, isVerified: false})}
      iconImage={IMAGES.right}
      title={
        props.processModal?.isRejected
          ? 'Votre demande a été refusée'
          : 'Nous vérifions vos informations'
      }
      isVisible={true}
      description={
        props.processModal?.isRejected
          ? "Nous n'avons pas pu vérifier vos informations, votre demande a donc été refusée. Si vous pensez qu'il s'agit d'une erreur, veuillez mettre à jour votre profil."
          : "Pour garantir la sécurité de notre plateforme, nous vérifions les informations de tous les utilisateurs. Ce processus prend généralement jusqu'à 1 heure. Vous serez informé dès qu'il sera terminé. Merci de votre patience !"
      }
    />
  );
};

export default PendingModal;

/*
// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import InfoModal from '../InfoModal/index';
// import {IMAGES} from '../../utils/theme';

// interface ProcessModalProps {
//   processModal: {
//     isRejected: boolean;
//     isVerified: boolean;
//   };
//   setState: (state: {isRejected: boolean; isVerified: boolean}) => void;
// }

// const PendingModal = (props: ProcessModalProps) => {
//   return (
//     <InfoModal
//       btnOnPress={() => props.setState({isRejected: false, isVerified: false})}
//       iconImage={IMAGES.right}
//       title={
//         props.processModal?.isRejected
//           ? 'Your Request is Rejected'
//           : "We're verifying your information"
//       }
//       isVisible={true}
//       description={
//         props.processModal?.isRejected
//           ? 'We were unable to verify your information, and your request has been rejected. If you believe this was a mistake, please Update your Profile'
//           : "To ensure the security of our platform, we verify all users' information. This process typically takes up to 1 hour. You'll be notified as soon as it's completeThank you for your patience!"
//       }
//     />
//   );
// };

// export default PendingModal;

// const styles = StyleSheet.create({});
*/
