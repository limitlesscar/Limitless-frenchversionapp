import {RootStackNavigationType} from '../../../../utils/types/navigationType';

export interface ProfileItemProps {
  data: {
    icon: string;
    title: string;
    path?: keyof RootStackNavigationType;
    callback?: (va?: any) => void | undefined;
    isToggle?: any;
    isEnable?: string;
    isDisable?: string;
    pref?: string;
  };
}

export interface ProfileList {
  icon: string;
  title: string;
  path?: keyof RootStackNavigationType;
  callback?: (va: any) => void | undefined;
  isEnable?: string;
  isDisable?: string;
  pref?: string;
}
