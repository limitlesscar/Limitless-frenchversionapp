import React, {useState} from 'react';
import {StyleSheet, View, SectionList, ActivityIndicator} from 'react-native';
import {
  CustomHeader,
  CustomSearchInput,
  CustomText,
  CustomWrapper,
} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../utils/theme';
import HelpCenterContainerItem from './components/HelpCenterContainerItem';
import {useHelpcenter} from '../../hooks/useHelpcenter';
const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const {getHelpcenterData, getHelpcenterDataLoading} = useHelpcenter({search});
  const data = getHelpcenterData?.data?.data?.sections;
  // Erivan Couttolenc contribution - Create a map of translations
  const titleMap = {
    HOSTS: 'Locataires',
    RENTERS: 'Loueurs de voitures',
    INSURANCE: 'Assurance',
    LEGAL: 'Légal',
    'POLITIQUE DE CONFIDENTIALITES': 'Politique de Confidentialité',
  };
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader title="Centre d'aide" />
      <CustomSearchInput onChangeText={text => setSearch(text)} />
      {getHelpcenterDataLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <SectionList
          sections={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({item}) => (
            <View
              style={[styles.headerContainer, {backgroundColor: COLORS.white}]}>
              <HelpCenterContainerItem
                title={item.title}
                description={item?.answer}
              />
            </View>
          )}
          renderSectionHeader={({section}) => {
            const displayTitle = titleMap[section.title] || section.title;
            return (
              <View style={styles.sectionHeader}>
                <CustomText text={displayTitle} textStyle={styles.headerText} />
              </View>
            );
          }}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </CustomWrapper>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: RFValue(20),
  },
  headerContainer: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(15),
    borderBottomWidth: RFValue(1),
    borderBottomColor: COLORS.neutral200,
  },
  headerText: {
    fontSize: RFValue(14),
    fontFamily: FONT.inter500,
    color: COLORS.neutral700,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    marginVertical: RFValue(5),
    borderBottomColor: COLORS.neutral200,
    borderBottomWidth: RFValue(1),
    padding: RFValue(11),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: COLORS.neutral600,
    fontSize: RFValue(13),
    fontFamily: FONT.interRegular,
  },
  sectionHeader: {
    paddingVertical: RFValue(12),
    backgroundColor: COLORS.white,
  },
});
