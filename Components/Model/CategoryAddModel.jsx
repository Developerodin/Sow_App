import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Block, Text } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");

export const CategoryAddModel = ({
  modalVisible,
  setModalVisible,
  data,
  onSelect,
}) => {
  const [selectedCategorie, setSelectedCategorie] = useState("");

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategorie(category.name);
    onSelect(category); // Call the onSelect function passed from the parent component
  };

  const handelClose = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={modalVisible}
      onSwipeComplete={() => setModalVisible(false)}
      backdropOpacity={0.1}
      onBackdropPress={() => setModalVisible(false)}
      swipeDirection={["down"]}
      style={styles.viewHalf}
    >
      <View style={[styles.centeredView]}>
        <View style={styles.modalView}>
          <Block right style={{ width: width * 0.8 }}>
            <Text style={{ fontSize: 25, fontWeight: 700, alignSelf: "flex-start" }}>
              Select Categories
            </Text>
            <Ionicons
              onPress={handelClose}
              name="close-circle"
              size={25}
              color="black"
              style={{ alignSelf: "flex-end", marginTop: -28 }}
            />
          </Block>

          {/* Category Section */}
          <Block
            style={{
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "start",
              width: width * 0.9,
              padding: 12,
              marginTop: 10,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                {data.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryBox,
                      {
                        backgroundColor:
                          selectedCategorie === category.name ? "black" : "#DBDBDB4D",
                      },
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { color: selectedCategorie === category.name ? "#fff" : "black" },
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Block>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 50,
  },
  categoryBox: {
    padding: 10,
    margin: 5,
    backgroundColor: "#DBDBDB4D",
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  viewHalf: {
    justifyContent: "flex-end",
    margin: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: -50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width,
    height: height - 500,
  },
});

export default CategoryAddModel;