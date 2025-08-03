import {IMAGES} from '../../utils/theme';

export interface InfoModalProps {
  isVisible: boolean;
  iconImage?: keyof typeof IMAGES;
  btnText?: string;
  title: string;
  description?: string;
  btnOnPress?: () => void|any;
  btnLoading?: boolean;
  maxHeight?: number;
  iconStyle?: any;
  secondaryBtnText?: string;
  secondaryBtnOnPress?: () => void;
}
