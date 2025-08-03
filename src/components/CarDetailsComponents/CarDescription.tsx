import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {FontSizeType} from '../CustomText/interface';
const CarDescription = ({
  description,
  fontSize,
}: {
  description: string;
  fontSize?: FontSizeType;
}) => {
  return (
    <View>
      <CustomText
        text={'Description de la voiture'}
        fontWeightPopins="600"
        fontSize={fontSize || 'S18'}
      />
      <CustomText
        text={description}
        fontWeightInter="500"
        fontSize="S12"
        color={COLORS.neutral400}
      />
    </View>
  );
};

export default CarDescription;

/*
import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {CustomText} from '../CustomText';
import {FontSizeType} from '../CustomText/interface';

const CarDescription = ({
  description,
  fontSize,
}: {
  description: string;
  fontSize?: FontSizeType;
}) => {
  return (
    <View>
      <CustomText
        text={'Car Description'}
        fontWeightPopins="600"
        fontSize={fontSize || 'S18'}
      />
      <CustomText
        text={description}
        fontWeightInter="500"
        fontSize="S12"
        color={COLORS.neutral400}
      />
    </View>
  );
};

export default CarDescription;
*/
