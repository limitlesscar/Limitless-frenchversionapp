import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../utils/theme'; // adjust path as needed

type ModalProps = {
  visible: boolean;
  type: 'success' | 'error' | null;
  message: string;
  onClose: () => void;
};

const MessageModal: React.FC<ModalProps> = ({
  visible,
  type,
  message,
  onClose,
}) => {
  if (!type) {
    return null;
  }

  const isSuccess = type === 'success';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View
          style={[
            styles.modalContainer,
            isSuccess ? styles.success : styles.error,
          ]}>
          <Text style={styles.title}>{isSuccess ? 'Succès' : 'Erreur'}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  success: {
    backgroundColor: COLORS.newprimary || '#4BB543',
  },
  error: {
    backgroundColor: COLORS.error600 || '#D9534F',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white || '#fff',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: COLORS.white || '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.white || '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.primary || '#007bff',
    fontWeight: '600',
  },
});

export default MessageModal;
