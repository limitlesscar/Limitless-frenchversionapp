import React from 'react';
import {CustomHeader, CustomWrapper} from '../../components';
import CustomTabs from '../../components/CustomTabs';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Completed from './Completed';
import {COLORS} from '../../utils/theme';

const OrderForMyCar = () => {
  const screens = {first: Ongoing, second: Upcoming, third: Completed};
  return (
    <CustomWrapper padding backgroundColor={COLORS.white} bottomInsert={-1}>
      <CustomHeader title="Commandes pour mes voitures" />
      <CustomTabs sceneMap={screens} />
    </CustomWrapper>
  );
};

export default OrderForMyCar;
