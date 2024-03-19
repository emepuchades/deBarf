import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styleFood } from "./Food.style";
import { useTranslation } from "react-i18next";
import foodTypes from "../../../utils/info/food";
import backgroundImage from "../../../assets/images/header.png";

const Food = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("huesosCarnosos");
  const [searchText, setSearchText] = useState("");
  const menuScrollViewRef = useRef(null);
  const [foodInfo, setFoodInfo] = useState(foodTypes());
  const menuImageItem = {
    carne: require("../../../assets/iconsFood/meat.png"),
    pescado: require("../../../assets/iconsFood/fish.png"),
    higado: require("../../../assets/iconsFood/liver.png"),
    masvisceras: require("../../../assets/iconsFood/kidneys.png"),
    huesosCarnosos: require("../../../assets/iconsFood/chicken.png"),
    frutasverduras: require("../../../assets/iconsFood/fruits.png"),
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    const selectedIndex = Object.keys(foodInfo).indexOf(type);
    if (menuScrollViewRef.current) {
      menuScrollViewRef.current.scrollTo({
        x: selectedIndex * 100,
        y: 0,
        animated: true,
      });
    }
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const renderMenuItem = (type) => {
    const isSelected = type === selectedType;
    return (
      <TouchableOpacity
        key={type}
        onPress={() => handleTypeSelect(type)}
        style={{
          padding: 5,
          margin: 5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            borderColor: isSelected ? "black" : "transparent",
            borderWidth: isSelected ? 1 : 0,
            backgroundColor: "white",
            borderRadius: 5,
            width: 100,
            height: 85,
          }}
        >
          <View style={styles.menuItem}>
            <View style={styles.imageContainerMenu}>
              <Image style={styles.iconMenu} source={menuImageItem[type]} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: isSelected ? "black" : "black",
                  fontSize: 13,
                  fontWeight: isSelected ? "bold" : "400",
                  textAlign: "center",
                }}
              >
                {t(`food.${type}`)}
              </Text>
            </View>
          </View>
          <View style={styles.textMenu} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = (selectedType) => {
    if (selectedType && foodInfo[selectedType]) {
      const meatItems = foodInfo[selectedType];
      return (
        <View style={styles.content}>
          {meatItems
            .filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item, index) => (
              <View style={styles.foodContainer} key={index}>
                <View>
                  {item.img ? (
                    <Image
                      source={item.img}
                      style={{
                        width: selectedType === "Pescado" ? 100 : 70,
                        height: selectedType === "Pescado" ? 99 : 70,
                        marginRight: 50,
                        marginLeft: 25,
                        marginTop: 10,
                      }}
                      type="image/webp"
                    />
                  ) : null}
                </View>
                <Text style={styles.foodText}>{item.name}</Text>
              </View>
            ))}
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: 20 }}>
          <Text>{t("food.selectType")}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.navigationWrapper}
      >
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={t(`food.searchCategory`)}
            value={searchText}
            onChangeText={handleSearchTextChange}
            style={styles.searchContainerInput}
          />
          <FontAwesome
            name="search"
            size={20}
            color="#ccc"
            style={styles.searchIcon}
          />
        </View>

        {!searchText && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={menuScrollViewRef}
            style={styles.menuItems}
          >
            {Object.keys(foodInfo).map((type) => renderMenuItem(type))}
          </ScrollView>
        )}
        <View style={styles.typeContainer}>
          <Text style={styles.type}> {t(`food.${selectedType}`)}</Text>
        </View>
      </ImageBackground>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
        {renderContent(selectedType)}
      </ScrollView>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create(styleFood);
