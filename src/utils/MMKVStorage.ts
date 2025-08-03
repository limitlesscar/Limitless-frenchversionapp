import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const MMKVStorage = {
  getItem: (key: string): Promise<string | null> => {
    const value = storage.getString(key);
    return Promise.resolve(value !== undefined ? value : null);
  },
  setItem: (key: string, value: any): Promise<void> => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default MMKVStorage;

/*
  Explanation:

  This module provides a simple wrapper around 'react-native-mmkv', which is a high-performance 
  key-value storage system for React Native apps.

  - `storage` is an instance of MMKV, giving access to fast, persistent local storage.
  
  - MMKVStorage exposes three async-like methods that mimic AsyncStorage's Promise-based API:
    - `getItem(key)`: Retrieves a string value by key, returning a Promise that resolves to the string or null if not found.
    - `setItem(key, value)`: Saves a value by key, returns a resolved Promise when done.
    - `removeItem(key)`: Deletes a key-value pair, returns a resolved Promise.

  Wrapping MMKV's synchronous methods with Promises ensures compatibility with async/await 
  code patterns commonly used in React Native, making it easier to switch from AsyncStorage 
  to MMKV without rewriting much code.

  Overall, this wrapper provides a fast, efficient, and async-compatible key-value storage solution.
*/
