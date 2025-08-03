import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/theme';

type ErrorModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export default function ErrorModal({
  visible,
  onClose,
  title,
  message,
}: ErrorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // fond plus doux et transparent
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalBox: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // fond blanc translucide
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 30,
    // ombre douce
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 12,
    color: COLORS.newprimary, // couleur primaire moderne
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: COLORS.newprimary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 45,
    // légère ombre bouton
    shadowColor: COLORS.newprimary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
