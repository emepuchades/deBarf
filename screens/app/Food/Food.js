import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styleFood } from "./Food.style";
import foodTypes  from "../../../utils/info/food";

const Food = () => {
  const [selectedType, setSelectedType] = useState("Huesos Carnosos");
  const [searchText, setSearchText] = useState("");
  const menuScrollViewRef = useRef(null);
  const [foodInfo, setFoodInfo] = useState(foodTypes());


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
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: isSelected ? "#9c4ef7" : "transparent",
            borderBottomWidth: isSelected ? 3 : 0,
            textAlign: "center",
          }}
        >
          <View
            style={styles.textMenu}
          />
          <Text
            style={{
              color: isSelected ? "#9c4ef7" : "#000",
              height: 20,
              fontSize: 14,
              textAlign: "center",
              marginTop: 12,
              marginBottom: 9,
              fontWeight: isSelected ? "bold" : "200",
            }}
          >
            {type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = (selectedType) => {
    

    if (selectedType && foodInfo[selectedType]) {
      const meatItems = foodInfo[selectedType];
      return (
        <View style={styles.content}>
          <Text style={styles.type}>{selectedType}</Text>
          {meatItems
            .filter((item) =>
              item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item) => (
              <View style={styles.foodContainer} key={item.name}>
                <View>
                  {item.img ? (
                    <Image
                      source={item.img}
                      style={{
                        width: selectedType === "Pescado" ? 100 : 70,
                        height: selectedType === "Pescado" ? 99 : 70,
                        marginRight: 50,
                        marginLeft: 25,
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
          <Text>Selecciona un tipo de carne</Text>
        </View>
      );
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={`Buscar en la categoría ${selectedType}`}
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={styles.searchInput}
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

      <ScrollView vertical showsHorizontalScrollIndicator={false}>
        {renderContent(selectedType)}
      </ScrollView>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create(styleFood);
