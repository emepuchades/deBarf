import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import stylesLoader from './Loader.style';

const Loader = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={stylesLoader.loaderContainer}>
      <Text style={stylesLoader.loaderText}>{dots}</Text>
    </View>
  );
};

export default Loader;
