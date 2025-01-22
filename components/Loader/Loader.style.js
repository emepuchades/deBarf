import { StyleSheet } from 'react-native';

const stylesLoader = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333', // Fondo claro
  },
  loaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Color del texto
  },
});

export default stylesLoader;
