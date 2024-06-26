import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function DualButtonTab({
  onClick,
  activeTab,
  leftButtonText,
  rightButtonText,
}) {
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsContainerText}>
        <TouchableOpacity
          style={[
            styles.tabButtonSectionFood,
            !activeTab && styles.activeTabSectionFood,
          ]}
          onPress={onClick}
        >
          <Text
            style={[
              styles.tabButtonText,
              !activeTab && styles.activeTabButtonText,
            ]}
          >
            {leftButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButtonSectionFood,
            activeTab && styles.activeTabSectionFood,
          ]}
          onPress={onClick}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab && styles.activeTabButtonText,
            ]}
          >
            {rightButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DualButtonTab;
const styles = StyleSheet.create({
  tabsContainer: {
    padding: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ffffff",
    height: 60,
    margin: 5,
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
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    margin: 5,
    width: "46%",
  },
  activeTabSectionFood: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  tabButtonText: {
    color: "#626A72",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  activeTabButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});
