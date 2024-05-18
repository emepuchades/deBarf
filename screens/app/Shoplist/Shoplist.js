import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

const Shoplist = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>Shoplist</Text>
    </View>
  );
};

export default Shoplist;
