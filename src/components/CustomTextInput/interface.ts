import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface ICustomTextInput extends TextInputProps {
  label?: string;
  inputContainerStyle?: ViewStyle;
  textStyle?: Object;
  error?: string;
  font?: string;
  colorTheme?: string;
  editField?: boolean;
  name?: string;
  textInputRef?: string;
  changeBorderColorOnFocus?: boolean;
  bottomTextInfo?: string;
  title?: string;
  titleTextStyle?: TextStyle | ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText?: (val: string) => void;
  requiredStar?: boolean;
  disabled?: boolean;
  canEdit?: boolean;
}
