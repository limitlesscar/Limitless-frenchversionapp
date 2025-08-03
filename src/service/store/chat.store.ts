import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';
import {ChatStoreType} from '../../utils/types/ZustandStoreType';

export const defaultChatState = {};
const useChatStore = create(
  persist<ChatStoreType>(
    (set, _) => ({
      chatId: null,
      chatType: null,
      receiverId: null,
      senderId: null,
      setChatId: (id: string) =>
        set({
          chatId: id,
        }),
      setChatType: (type: string) =>
        set({
          chatType: type,
        }),
      setReceiverId: (receiverId: string) =>
        set({
          receiverId: receiverId,
        }),
      setSenderId: (senderId: string) =>
        set({
          senderId: senderId,
        }),
    }),

    {
      name: 'chat', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => MMKVStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useChatStore;
/*
  Ce store Zustand gère l'état du chat dans l'application, incluant l'identifiant du chat, le type de chat,
  ainsi que les identifiants de l'expéditeur et du destinataire.

  Le store utilise le middleware `persist` pour sauvegarder automatiquement son état dans un stockage persistant,
  ici via `MMKVStorage` (une solution de stockage rapide pour React Native).

  Cela permet de conserver l'état du chat même après la fermeture ou le redémarrage de l'application.

  Les setters (`setChatId`, `setChatType`, `setReceiverId`, `setSenderId`) permettent de modifier
  l'état de façon contrôlée.

  La clé de stockage utilisée est 'chat', ce qui doit être unique pour éviter les collisions.

  Ce pattern facilite la gestion globale et la persistance de l'état du chat dans l'application.
*/
