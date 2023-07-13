import React, { useState, useRef } from "react";
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
import meatTypes from "../../../utils/info/food";
import { windowHeight } from "../../../utils/Dimentions";

const Food = () => {
  const [selectedType, setSelectedType] = useState("Huesos Carnosos");
  const [searchText, setSearchText] = useState("");
  const menuScrollViewRef = useRef(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    const selectedIndex = Object.keys(meatTypes).indexOf(type);
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
            style={{
              width: 4,
              height: 20,
              paddingBottom: 15,
            }}
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
    if (selectedType && meatTypes[selectedType]) {
      const meatItems = meatTypes[selectedType];
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
                      style={styles.imageFood}
                      type="image/webp"
                    />
                  ) : null}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </Text>
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
          style={{
            borderBottomColor: "#F5F5F9",
            borderBottomWidth: 1,
            height: 70,
          }}
        >
          {Object.keys(meatTypes).map((type) => renderMenuItem(type))}
        </ScrollView>
      )}

      <ScrollView vertical showsHorizontalScrollIndicator={false}>
        {renderContent(selectedType)}
      </ScrollView>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  imageFood: {
    height: 70,
    maxWidth: 70,
    marginRight: 20,
    marginLeft: 5,
  },
  foodContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    fontFamily: "Loto",
    height: windowHeight - 55
  },
  content: {},
  type: {
    color: "#000",
    fontSize: 18,
    margin: 10,
    marginLeft: 22,
    fontWeight: "600",
  },
  searchInput: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
});
