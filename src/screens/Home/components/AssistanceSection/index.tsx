import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import SectionHeading from '../SectionHeading';
import AssistanceCard from '../AssistanceCard';
import {IMAGES} from '../../../../utils/theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const AssistanceSection = () => {

  const data = [
  {
    thumbnail: IMAGES.assistanceThumbnailBanner,
    image: IMAGES.assistanceThumbnailBanner,
    title: 'Comment fonctionne la location ?',
    id: 1,
    pageHeading: 'Comment fonctionne la location',
    h1: 'Louer en toute simplicité',
    p1: 'Réservez la voiture idéale pour votre voyage en quelques clics. Profitez d’une expérience de location fluide, sans les tracas d’une agence.',
    h2: 'Réservations flexibles',
    p2: 'Choisissez vos dates et partez. Planifiez votre location selon votre emploi du temps. Réservez la voiture, choisissez l’heure de prise en charge, et vous êtes prêt à prendre la route.',
    h3: 'Retours pratiques',
    p3: 'Rendez la voiture sans tracas. Déposez-la à l’endroit convenu et finalisez la location en un seul clic dans l’application.',
  },
  {
    thumbnail: IMAGES.assistanceThumbnail2,
    image: IMAGES.assistanceThumbnail2,
    title: 'Comment fonctionne l’hébergement ?',
    id: 2,
    pageHeading: 'Comment fonctionne l’hébergement',
    h1: 'Gagnez facilement',
    p1: 'Proposez votre voiture en quelques étapes simples et commencez à gagner. Profitez d’une expérience d’hôte flexible qui vous permet de gagner selon vos conditions, sans complications.',
    h2: 'Disponibilité flexible',
    p2: 'Définissez vos disponibilités et décidez quand votre voiture est prête à être louée. Vous avez le contrôle, que vous souhaitiez héberger occasionnellement ou fréquemment.',
    h3: 'Tarification flexible',
    p3: 'Fixez vos propres tarifs et ajustez-les à tout moment selon la demande. Vous gardez le contrôle total sur les prix pour maximiser vos gains selon la saison, l’emplacement ou les événements spéciaux.',
  },
];










  return (
    <View>
      <SectionHeading heading="Aide" fontSize="S16" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <AssistanceCard {...item} />}
        ItemSeparatorComponent={() => ItemSeparatorComponent()}
      />
    </View>
  );
};

export default AssistanceSection;

const ItemSeparatorComponent = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {width: widthPercentageToDP(3)},
});
