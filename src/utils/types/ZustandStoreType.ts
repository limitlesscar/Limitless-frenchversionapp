import {
  CarFeaturesType,
  CarInfoType,
  CarSpecificationType,
  UserDetailsType,
} from './apiResponseType';

export interface UserStoreType {
  userDetails: UserDetailsType | null;
  accessToken: string;
  isFcmToken: boolean;
  isVerified?: boolean;
  isHost?: boolean;
  setUserDetails: (value: UserDetailsType) => void;
  setAccessToken: (value: string) => void;
  setOnboardingStatus: (value: boolean) => void;
  setIsFcmToken: (value: boolean) => void;
  hasSeenOnboarding?: boolean;
}

export interface PublichCarStoreType {
  carInfo: CarInfoType | null;
  setCarInfo: (value: CarInfoType) => void;
  carSpecification: CarSpecificationType | null;
  setCarSpecification: (value: CarSpecificationType) => void;
  carFeatures: CarFeaturesType | null;
  setCarFeatures: (value: CarFeaturesType) => void;
}

export interface ChatStoreType {
  messages?: any;
  chatId: string | null;
  chatType: string | null;
  setChatId: (id: string) => void;
  setChatType: (type: string) => void;
  receiverId?: string | null;
  setReceiverId: (id: string) => void;
  senderId?: string | null;
  setSenderId: (id: string) => void;
}

export interface BookingStoreType {
  selectedCarDetails: any;
  setSelectedCarDetails?: (details: any) => void;
}
