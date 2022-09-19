import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const Profile = () => {

  const { t } = useTranslation();

  return (
    <View>
      <Text>Perfil</Text>
    </View>
  );
};

export default Profile;
