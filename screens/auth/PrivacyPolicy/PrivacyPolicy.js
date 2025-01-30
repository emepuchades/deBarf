import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PrivacyPolicyModal = ({ isVisible, onClose, onAccept }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.menuIcon}>
              <Feather name="menu" size={24} color="#333" />
            </View>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.title}>POLÍTICA DE PRIVACIDAD</Text>
            <Text style={styles.version}>Versión 1.0 | 25 de Julio de 2016</Text>

            <Text style={styles.sectionTitle}>
              ¿QUÉ INCLUYE ESTE DOCUMENTO?
            </Text>

            <Text style={styles.bodyText}>
              Para el óptimo funcionamiento de esta app, es necesario recoger y procesar cierta información obtenida del dispositivo en el que se ha instalado. Esta información permite mejorar la app, adaptar el contenido de forma óptima para cada usuario o contactar con el usuario en caso de que sea necesario. Para demostrar que nos importa la privacidad de nuestros usuarios...
            </Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>CERRAR LA APLICACIÓN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={onAccept}
            >
              <Text style={styles.acceptButtonText}>ACEPTAR Y CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '93%',
    maxHeight: '95%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    alignItems: 'flex-end',
  },
  menuIcon: {
    padding: 8,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  acceptButton: {
    backgroundColor: 'white',
  },
  closeButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PrivacyPolicyModal;