import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,Image ,Dimensions } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Block } from "galio-framework";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const {width, height} = Dimensions.get('screen');

export const QuotationsDetails = () => {
    const navigation = useNavigation();
    const handelBack = () => {
        navigation.goBack();
        };


    const quotationClick = () => {
        navigation.navigate("Quotations");
    };    
  const quotations = [
    { id: 1, name: "Mr. XYZ", company: "XYZ Metals", rate: "₹30/KG" },
    { id: 2, name: "Mr. XYZ", company: "XYZ Metals", rate: "₹30/KG" },
    { id: 3, name: "Mr. XYZ", company: "XYZ Metals", rate: "₹30/KG" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Block >
      <Block style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55 }}>
        <Block style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 150, marginLeft: 5 }}>
          <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{ marginLeft: 5 }} color="black" />
        </Block>
        <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500', flex: 1 }}>Quotations</Text>
        <Block style={{ flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
          <TouchableOpacity activeOpacity={0.8}>
            <View >
              
              <Ionicons name="filter" size={28} color="#000" />
            </View>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>

      {/* Info Box */}
      

      <View style={styles.cardContainer}>
      

      

      <Block style={styles.row}>
        <View style={styles.column}>
        <Text style={{fontSize: 16,fontWeight: 600}}> Date</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color="#14B57C" />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>21 Sept 2024</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
        <Text style={{fontSize: 16,fontWeight: 600}}>Price</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 5 }}>
          <View >
            <Image source={require('../../assets/Rupee.png')} style={{ width: 20, height: 20 }} />
          </View>
          <Text style={styles.amountText}>₹ 33/KG</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text,{fontSize: 16,fontWeight: 600}]}>Items</Text>
          <Text style={[styles.text,{marginTop: 5}]}> Aluminium</Text>
         
        </View>
      </Block>

      </View>

      {/* Quotations List */}
      <Text style={styles.sectionTitle}>Quotations Received -</Text>
      <ScrollView>
        {quotations.map((quotation) => (
            <TouchableOpacity onPress={quotationClick} activeOpacity={0.8}>
          <View key={quotation.id} style={styles.card}>
            <View style={styles.cardHeader} >
              <View>
                <Text style={styles.cardName}>{quotation.name}</Text>
                <Text style={styles.cardCompany}>{quotation.company}</Text>
              </View>
              <View style={styles.cardRate}>
                <Text style={styles.rateText}>Rate</Text>
                <Text style={styles.rateValue}>{quotation.rate}</Text>
              </View>
            </View>
            {/* Buttons */}
            <View style={styles.cardActions}>
              <TouchableOpacity >
                <View style={styles.acceptButton}>
                <Text style={styles.acceptText}>Accept Offer</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity >
                <View style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardCompany: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
    fontWeight: "600",
  },
  cardRate: {
    alignItems: "flex-end",
  },
  rateText: {
    fontSize: 14,
    color: "#000",
    marginRight: 25,
    fontWeight: "700",
  },
  rateValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#14B57C",
    paddingVertical: 12,
    borderRadius: 7,
    marginRight: 8,
    alignItems: "center",
    width: width * 0.5,
  },
  acceptText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  declineButton: {
    flex: 1,
    backgroundColor: "#FF2020",
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: "center",
    width: width * 0.3,
  },
  declineText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },

  cardContainer: {
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginBottom: 15,
    
  },
   
  statusText: {
    color: "#000",
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'left',
    marginRight: 10,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: "#14B57C",
    borderLeftWidth: 1,
    borderLeftColor: "#14B57C",
    paddingHorizontal: 12,
    
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#000",
    
    marginLeft: 5,
  },
  text: {
    fontSize: 12,
    color: "#000",
    textAlign: 'center',
    fontWeight: '600',
    
  },
  blueText: {
    color: "#000",
    fontWeight: '600',
    fontSize: 12,
    marginRight: 5,
  },
});

export default QuotationsDetails;
