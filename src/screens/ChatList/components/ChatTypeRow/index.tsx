import React, {FC} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../../../utils/theme';
import {ChatTypeRowProps} from './interface';
import useChatStore from '../../../../service/store/chat.store';

const ChatTypeRow: FC<ChatTypeRowProps> = ({activeChat, setActiveChat}) => {
  const CHAT_TYPES_LABELS_FR = {
    'As Host': 'En tant qu’hôte',
    'As Customer': 'En tant que client',
  };
  const CHAT_TYPES = ['As Host', 'As Customer'];
  const {setChatType} = useChatStore();
  const renderItem = (item: string) => {
    const selected = activeChat === item; // compare with English value
    const label = CHAT_TYPES_LABELS_FR[item] || item; // get French label for UI
    return (
      <TouchableOpacity
        style={selected ? styles.itemContainerActive : styles.itemContainer}
        onPress={() => {
          setActiveChat(item); // keep English value for state
          setChatType(item); // keep English value for store
        }}>
        <CustomText
          text={label} // show French label
          color={selected ? COLORS.black : COLORS.neutral500}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={CHAT_TYPES} // pass English values here
        renderItem={({item}) => renderItem(item)} // pass English to renderItem
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <ItemSeparator />}
        keyExtractor={item => item}
      />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

export default ChatTypeRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: widthPercentageToDP(5),
  },
  itemSeparator: {
    width: widthPercentageToDP(5),
  },
  itemContainer: {},
  itemContainerActive: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
  },
});

/*
import React, {FC} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../../../components';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {COLORS} from '../../../../utils/theme';
import {ChatTypeRowProps} from './interface';
import useChatStore from '../../../../service/store/chat.store';


const ChatTypeRow: FC<ChatTypeRowProps> = ({activeChat, setActiveChat}) => {
  const CHAT_TYPES = ['As Host', 'As Customer'];
  const {setChatType} = useChatStore();
  const renderItem = (item: string) => {
    const selected = activeChat === item;
    return (
      <TouchableOpacity
        style={selected ? styles.itemContainerActive : styles.itemContainer}
        onPress={() => {
          setActiveChat(item);
          setChatType(item);
        }}>
        <CustomText
          text={item}
          color={selected ? COLORS.black : COLORS.neutral500}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        scrollEnabled={false}
        data={CHAT_TYPES}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => ItemSeparator()}
        keyExtractor={item => item}
      />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};
export default ChatTypeRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: widthPercentageToDP(5),
  },
  itemSeparator: {
    width: widthPercentageToDP(5),
  },
  itemContainer: {},
  itemContainerActive: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
  },
});
*/
