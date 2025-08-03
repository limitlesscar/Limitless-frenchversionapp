import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {BookingStoreType} from '../../utils/types/ZustandStoreType';
export const defaultChatState = {};
const useBookingStore = create(
  persist<BookingStoreType>(
    (set, _) => ({
      selectedCarDetails: null,
      setSelectedCarDetails: (details: any) =>
        set({
          selectedCarDetails: details,
        }),
    }),
    {
      name: 'chat', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
export default useBookingStore;
// Ce store Zustand persistant gère l'état lié à la réservation (booking) dans l'application,
// notamment la sélection des détails d'une voiture. Il utilise le middleware `persist` pour
// sauvegarder automatiquement l'état dans le stockage MMKV (plus performant que localStorage).
// Cela permet de conserver la sélection même après un redémarrage de l'application.

// This persistent Zustand store manages booking-related state in the app,
// specifically the selected car details. It uses the `persist` middleware to
// automatically save state into MMKV storage (more efficient than localStorage).
// This ensures the selection is retained even after app restarts.
