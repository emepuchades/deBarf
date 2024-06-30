import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { AuthenticatedUserContext } from "../../../utils/context/context.js";
import { useTranslation } from "react-i18next";
import foodTypes from "../../../utils/info/food.js";
import { calculateBARFDiet } from "../../../utils/getPercentage.js";
import { PieChart } from "react-native-gifted-charts";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import ErrorMessage from "../../../components/ErrorMessage.js";
import addMenu from "../../../utils/db/dbMenu.js";
import backgroundImage from "../../../assets/images/header.png";
import { windowHeight, windowWidth } from "../../../utils/Dimentions.js";
import Modal from "react-native-modal";

const AddFoodScreen = ({ navigation, route }) => {
  const [foodName, setFoodName] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodInfo, setFoodInfo] = useState(foodTypes());
  const [selectedPet, setSelectedPet] = useState(route.params.selectedPet);
  const [statsPet, setStatsPet] = useState(
    calculateBARFDiet(route.params.selectedPet)
  );
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(route.params.fecha);
  const [day, setDay] = useState(route.params.fecha);
  const [selectedTab, setSelectedTab] = useState("ourFood");
  const [activeTab, setActiveTab] = useState("huesosCarnosos");
  const [pieData, setPieData] = useState([]);
  const [pieDataGraphic, setPieDataGraphic] = useState([]);
  const { t } = useTranslation();
  const [yourCategory, setYourCategory] = useState("huesosCarnosos");
  const [yourGrFood, setYourGrFood] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const { db } = useContext(AuthenticatedUserContext);
  const MenuURL = t("navBottom.menu");
  const menuImageItem = {
    carne: require("../../../assets/iconsFood/carne.png"),
    pescado: require("../../../assets/iconsFood/pescado.png"),
    higado: require("../../../assets/iconsFood/higado.png"),
    masvisceras: require("../../../assets/iconsFood/masvisceras.png"),
    huesosCarnosos: require("../../../assets/iconsFood/huesosCarnosos.png"),
    frutasverduras: require("../../../assets/iconsFood/frutasverduras.png"),
  };
  const COLORS = [
    "#ffca3a",
    "#ff595e",
    "#3498DB",
    "#9D71E8",
    "#8ac926",
    "#ff9914",
    "#abff4f",
    "#2980B9",
    "#F39C12",
    "#8E44AD",
    "#C0392B",
    "#16A085",
  ];

  useEffect(() => {
    const graphicInfo = async (selectedPet) => {
      switch (selectedPet) {
        case "perro":
          return [
            {
              color: "#ffca3a",
              text: "30%",
              value: 30,
            },
            { color: "#ff595e", text: "45%", value: 45 },
            { color: "#3498DB", text: "5%", value: 5 },
            { color: "#9D71E8", text: "5%", value: 5 },
            { color: "#8ac926", text: "15%", value: 5 },
          ];
        case "gato":
          return [
            {
              color: "#ffca3a",
              text: "30%",
              value: 30,
            },
            { color: "#ff595e", text: "45%", value: 45 },
            { color: "#3498DB", text: "5%", value: 15 },
            { color: "#9D71E8", text: "5%", value: 5 },
            { color: "#8ac926", text: "15%", value: 5 },
          ];
        case "huron":
          return [
            {
              color: "#ffca3a",
              text: "80%",
              value: 80,
            },
            { color: "#ff595e", text: "10%", value: 10 },
            { color: "#3498DB", text: "10%", value: 10 },
          ];
        default:
          return "";
      }
    };

    const updateData = async () => {
      const newStatsPet = await calculateBARFDiet(route.params.selectedPet);
      setSelectedPet(route.params.selectedPet);
      setDate(route.params.fecha);
      setStatsPet(newStatsPet);

      const updatedPieData = Object.keys(newStatsPet).map((key, index) => ({
        key: index,
        amount: 0,
        svg: { fill: COLORS[index % COLORS.length] },
        label: key,
      }));

      setSelectedFoods([]);
      setPieDataGraphic([]);
      setPieData(updatedPieData);
      setErrorMessages({});
      const dateObj = new Date(date);
      setDay(dateObj.getDate());

      const pieDataInfo = await graphicInfo(route.params.selectedPet.typePet);
      setPieDataGraphic(pieDataInfo);
      setLoading(false);
    };

    updateData();
  }, [route.params.selectedPet, t]);

  useEffect(() => {
    updatePieChart();
  }, [selectedFoods]);

  const handleEditFood = (index, isEditing) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = [...prevSelectedFoods];
      updatedFoods[index].isEditing = isEditing;

      if (!isEditing) {
        const chartLabel = mapFoodTypeToLabel(updatedFoods[index]);
        if (chartLabel) {
          const editGramsAsNumber = parseFloat(updatedFoods[index].editGrams);

          if (!isNaN(editGramsAsNumber)) {
            const updatedPieData = pieData.map((item) => {
              if (chartLabel === item.label) {
                return {
                  ...item,
                  amount: editGramsAsNumber,
                };
              }
              return item;
            });
            setPieData(updatedPieData);
          }
        }
      }

      return updatedFoods;
    });
  };

  const updatePieChart = () => {
    const categorySums = {};

    selectedFoods.forEach((food) => {
      if (food.editGrams !== undefined) {
        const category = mapFoodTypeToLabel(food.category);
        const editGrams = parseFloat(food.editGrams);
        if (!isNaN(editGrams) && category) {
          if (categorySums[category]) {
            categorySums[category] += editGrams;
          } else {
            categorySums[category] = editGrams;
          }
        }
      }
    });

    pieData.forEach((data) => {
      if (data.label !== "grTotal") {
        data.amount = categorySums[data.label] || 0;
      }
    });

    const newErrorMessages = {};

    for (const category in categorySums) {
      const categorySum = categorySums[category];
      const categoryGrams = parseInt(statsPet[category].split(" ")[0], 10);

      if (categorySum > categoryGrams) {
        newErrorMessages[category] =
          t(`planner.exceeded`) + t(`planner.${category}`);
      }
    }

    setErrorMessages(newErrorMessages);
  };

  const handleEditGramsChange = (text, index) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = [...prevSelectedFoods];

      if (!text) {
        updatedFoods[index].editGrams = 0;
      } else {
        updatedFoods[index].editGrams = text;
      }

      updatePieChart();

      return updatedFoods;
    });
  };

  async function handleSaveFood() {
    if (yourCategory === "pescado") {
      setYourCategory("carne");
    }

    const selectedFoodNew = {
      category: yourCategory,
      editGrams: yourGrFood,
      name: foodName,
      isEditing: false,
    };

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      selectedFoodNew,
    ]);
  }

  const handleTabChange = (categoryName) => {
    setActiveTab(categoryName);
    setSelectedTab("ourFood");
  };

  const mapFoodTypeToLabel = (foodType) => {
    switch (foodType) {
      case "huesosCarnosos":
        return "bones";
      case "carne":
        return "meat";
      case "pescado":
        return "meat";
      case "higado":
        return "higado";
      case "masvisceras":
        return "visceras";
      case "frutasverduras":
        return "vegetables";
      case "grTotal":
        return "grTotal";
      default:
        return "";
    }
  };

  const handleAddFood = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFoodSelection = (selectedFood, category) => {
    const selectedFoodNew = {
      ...selectedFood,
      category: category,
    };

    const isDuplicate = selectedFoods.some(
      (food) => food.name === selectedFoodNew.name
    );

    if (isDuplicate) {
      setErrorMessages({
        duplicateFood: `Ya has seleccionado ${selectedFoodNew.name}`,
      });
      setTimeout(() => {
        setErrorMessages({});
      }, 5000);
      return;
    }

    setSelectedFoods((prevSelectedFoods) => [
      ...prevSelectedFoods,
      selectedFoodNew,
    ]);
  };

  const handleDeleteFood = (index) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = [...prevSelectedFoods];
      updatedFoods.splice(index, 1);
      return updatedFoods;
    });
  };

  const saveFood = async () => {
    const foodJson = JSON.stringify(selectedFoods);
    await addMenu(db, date, selectedPet.id, foodJson);
    setStatsPet([]);

    navigation.navigate(MenuURL);
  };

  const goEdit = async () => {
    navigation.navigate("PetDetails", { selectedPet: selectedPet });
  };

  return (
    <ScrollView
      style={styles.container}
      vertical
      showsHorizontalScrollIndicator={false}
    >
      {loading ? (
        <Text>{t(`loading`)}</Text>
      ) : statsPet ? (
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.chartContainer}>
              <View style={styles.grTotalContainer}>
                <PieChart
                  donut
                  showText
                  textColor="black"
                  radius={40}
                  innerRadius={15}
                  textSize={30}
                  data={pieDataGraphic}
                />
              </View>
            </View>
            <View style={styles.horizontalChartsContainer}>
              <View style={styles.legendItem}>
                <View style={styles.legendSquare} />
                <Text style={styles.legendLabelHeader}></Text>
                <Text style={styles.legendTextHeader}>
                  {t(`addMeal.total`)}
                </Text>
                <Text style={styles.legendTextHeader}>{t(`addMeal.goal`)}</Text>
              </View>
              {pieData.slice(1).map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendSquare,
                      { backgroundColor: COLORS[index % COLORS.length] },
                    ]}
                  />
                  <Text style={styles.legendLabel}>{item.label}Leyendas</Text>
                  <Text style={styles.legendText}>{item.amount} g</Text>
                  <Text style={styles.legendText}>{statsPet[item.label]}</Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: "#ffffff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
              }}
            >
              <Text style={styles.label}>{selectedPet.name}</Text>
              <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => goEdit()}
                >
                  <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddFood()}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerFood}>
              <View style={styles.headerFood}>
                <Text style={styles.headerTextFood}>
                  {t(`addMeal.mealDay`)} {day}
                </Text>
              </View>
              <View style={styles.contentFood}>
                {selectedFoods.length === 0 && (
                  <Text style={styles.emptyFood}>{t(`addMeal.emptyFood`)}</Text>
                )}
                {selectedFoods.map((food, index) => (
                  <View key={food.name + index} style={styles.selectedFoodItem}>
                    <Text>{t(`food.${food.name}`)}</Text>
                    <View style={styles.editContainer}>
                      {food.isEditing ? (
                        <>
                          <TextInput
                            style={styles.editInput}
                            value={food.editGrams}
                            keyboardType="numeric"
                            onChangeText={(text) =>
                              handleEditGramsChange(text, index)
                            }
                          />
                          <TouchableOpacity
                            style={styles.editIcon}
                            onPress={() => handleEditFood(index, false)}
                          >
                            <Ionicons
                              name="checkmark"
                              size={24}
                              color="green"
                            />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={styles.gramsText}>
                            {food.editGrams} g
                          </Text>
                          <TouchableOpacity
                            style={styles.editIcon}
                            onPress={() => handleEditFood(index, true)}
                          >
                            <Ionicons name="pencil" size={24} color="#3498DB" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.editIcon}
                            onPress={() => handleDeleteFood(index)}
                          >
                            <Ionicons name="trash" size={24} color="red" />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {Object.keys(errorMessages).map((category) => (
              <ErrorMessage message={errorMessages[category]} />
            ))}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
                padding: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => saveFood()}
                style={styles.addButton}
              >
                <Image
                  source={backgroundImage}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 150,
                    height: 40,
                    resizeMode: "cover",
                  }}
                />
                <Text style={styles.addButtonLabel}>
                  {t(`addMeal.saveMeal`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.labelSelectFood}>{t(`addMeal.selectFood`)}</Text>
          <View style={styles.tabsFoodContainer}>
            <View style={styles.tabsContainer}>
              <View style={styles.tabsContainerText}>
                <TouchableOpacity
                  onPress={() => setSelectedTab("ourFood")}
                  style={[
                    styles.tabButtonSectionFood,
                    selectedTab === "ourFood" && styles.activeTabSectionFood,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      selectedTab === "ourFood" && styles.activeTabButtonText,
                    ]}
                  >
                    {t(`addMeal.food`)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedTab("addFood")}
                  style={[
                    styles.tabButtonSectionFood,
                    selectedTab === "addFood" && styles.activeTabSectionFood,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      selectedTab === "addFood" && styles.activeTabButtonText,
                    ]}
                  >
                    {t(`addMeal.yourFood`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {selectedTab === "ourFood" ? (
              <View>
                <View style={styles.tabsContainerCategory}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Object.keys(foodInfo)
                      .filter((categoryName) =>
                        statsPet.hasOwnProperty(
                          mapFoodTypeToLabel(categoryName)
                        )
                      )
                      .filter(
                        (categoryName) =>
                          !(
                            selectedPet.typePet === "huron" &&
                            categoryName === "pescado"
                          )
                      )
                      .map((categoryName, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleTabChange(categoryName)}
                          style={[
                            styles.tabButton,
                            activeTab === categoryName &&
                              styles.activeTabPurple,
                          ]}
                        >
                          <Image
                            source={menuImageItem[categoryName]}
                            style={styles.iconMenuCategory}
                          />
                          <Text style={styles.tabButtonText}>
                            {t(`food.${categoryName}`)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
                {activeTab && (
                  <View style={styles.foodListContainer}>
                    {foodInfo[activeTab].map((food, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleFoodSelection(food, activeTab)}
                        style={styles.fullListItem}
                      >
                        <Image
                          source={food.img}
                          style={styles.searchResultImage}
                        />
                        <Text style={styles.foodName}>{t(`food.${food.name}`)}</Text>
                        <Ionicons
                          name="ios-add-circle"
                          size={24}
                          color="#3498DB"
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.addFoodContainer}>
                <Text style={styles.addFoodText}> {t(`addMeal.foodName`)}</Text>
                <TextInput
                  style={styles.addFoodInput}
                  placeholder={t(`addMeal.foodName`)}
                  value={foodName}
                  onChangeText={setFoodName}
                />

                <View style={styles.row}>
                  <View style={styles.columnLeft}>
                    <Text style={styles.addFoodText}>{t(`addMeal.grams`)}</Text>
                    <TextInput
                      style={styles.addFoodInputSmall}
                      placeholder={t(`addMeal.grams`)}
                      value={yourGrFood}
                      onChangeText={setYourGrFood}
                    />
                  </View>
                  <View style={styles.columnRight}>
                    <Text style={styles.addFoodText}>
                      {t(`addMeal.category`)}:
                    </Text>
                    <Picker
                      selectedValue={yourCategory}
                      style={styles.picker}
                      onValueChange={(itemValue) => setYourCategory(itemValue)}
                    >
                      {Object.keys(foodInfo)
                        .filter((categoryName) =>
                          statsPet.hasOwnProperty(
                            mapFoodTypeToLabel(categoryName)
                          )
                        )
                        .filter(
                          (categoryName) =>
                            !(
                              selectedPet.typePet === "huron" &&
                              categoryName === "pescado"
                            )
                        )
                        .map((categoryName, index) => (
                          <Picker.Item
                            key={index}
                            label={t(`food.${categoryName}`)}
                            value={categoryName}
                          />
                        ))}
                    </Picker>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleSaveFood()}
                  style={styles.addFoodButton}
                >
                  <Text style={styles.addFoodButtonText}>
                    {t(`addMeal.addMeal`)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#4F98FE",
    padding: 10,
    borderRadius: 10,
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  selectedFoods: {
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  selectedFoodItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingLeft: 10,
  },
  searchResultImage: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  fullList: {
    borderRadius: 5,
  },
  fullListItem: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  grTotalContainer: {
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  chartContainer: {
    flex: 1,
    width: "25%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  horizontalChartsContainer: {
    width: "75%",
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  horizontalChartContainer: {
    alignItems: "center",
    marginLeft: 25,
  },
  horizontalChart: {
    height: 50,
    width: 50,
  },
  tabsContainer: {
    padding: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ffffff",
  },
  tabsContainerCategory: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -15,
  },
  labelSelectFood: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabsContainerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  tabButtonSectionFood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    margin: 5,
    width: "46%",
  },
  activeTabSectionFood: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    textAlign: "center",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#3498DB",
    backgroundColor: "white",
  },
  activeTabPurple: {
    borderBottomWidth: 1,
    borderColor: "black",
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  tabsFoodContainer: {
    borderRadius: 10,
  },
  tabButtonText: {
    color: "#626A72",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconMenuCategory: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  activeTabButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  foodListContainer: {
    marginBottom: 50,
    marginTop: 10,
    borderRadius: 10,
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
  },
  searchResultImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  foodName: {
    flex: 1,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addFoodContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  addFoodText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addFoodInput: {
    height: 40,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnLeft: {
    flex: 1,
    marginRight: 10,
  },
  columnRight: {
    width: windowWidth,
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  emptyFood: {
    textAlign: "center",
    color: "#c9c9c9",
  },
  addFoodInputSmall: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#000",
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: "#3498DB",
    borderBottomWidth: 2,
  },
  addFoodButton: {
    backgroundColor: "#3498DB",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  addFoodButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  gramsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editInputInstagram: {
    backgroundColor: "#FAFAFA",
    borderColor: "#ddd",
    fontSize: 16,
  },
  totalGrams: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  editInput: {
    width: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  gramsText: {
    fontSize: 16,
    marginRight: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  legendSquare: {
    width: 10,
    height: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  legendLabelHeader: {
    flex: 2,
    fontWeight: "bold",
  },
  legendTextHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  legendLabel: {
    flex: 2,
  },
  legendText: {
    flex: 1,
    textAlign: "center",
  },
  noFoodContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerFood: {
    flex: 1,
    padding: 12,
  },
  headerFood: {
    backgroundColor: "#4F98FE",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 8,
  },
  headerTextFood: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  contentFood: {
    backgroundColor: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
  },
});

export default AddFoodScreen;
