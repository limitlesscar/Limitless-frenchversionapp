import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {UserStoreType} from '../../utils/types/ZustandStoreType';

export const defaultUserState = {};
const useUserStore = create(
  persist<UserStoreType>(
    (set, _) => ({
      userDetails: null,
      isHost: false,
      hasSeenOnboarding: false,
      isFcmToken: false,
      setUserDetails: userData => {
        set({
          isHost: userData?.user_type?.includes('host'),
          userDetails: userData,
        });
      },
      accessToken: '',
      setAccessToken: token =>
        set({
          accessToken: token,
        }),
      setOnboardingStatus: (status: boolean) =>
        set({
          hasSeenOnboarding: status,
        }),

      setIsFcmToken: (status: boolean) =>
        set({
          isFcmToken: status,
        }),
    }),

    {
      name: 'userDetails', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useUserStore;
