import React from 'react';
import {CustomHeader, CustomWrapper} from '../../components';
import CustomTabs from '../../components/CustomTabs';
import Ongoing from './Ongoing';
import Upcoming from './Upcoming';
import Completed from './Completed';
import {COLORS} from '../../utils/theme';

const MyOrders = () => {
  const screens = {first: Ongoing, second: Upcoming, third: Completed};
  return (
    <CustomWrapper padding backgroundColor={COLORS.white}>
      <CustomHeader  title="Mes commandes"/>
      <CustomTabs sceneMap={screens} />
    </CustomWrapper>
  );
};

export default MyOrders;
