import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image,Dimensions } from 'react-native';
import { Block, Text } from "galio-framework";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const MyPostHistory = ({ data }) => {
  const navigation = useNavigation();

  const handleViewDetail = () => {
    console.log("Post Clicked",data._id);
    navigation.navigate("Post Details", { postId: data._id });
  };

  return (
    <View style={styles.cardContainer}>
      <Block style={styles.row}>
        <View style={styles.column}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{data?.postTo?.name|| "N/A"}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <AntDesign name="calendar" size={20} color="#0EB77B" />
            <Text style={[styles.text, { marginLeft: 8 }]}>
              <Text style={styles.blueText}>{ new Date(data.createdAt).toLocaleDateString('en-GB')}</Text>
            </Text>
          </View>
        </View>

        <View style={[styles.column, styles.divider]}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Price</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Image source={require('../../assets/Rupee.png')} style={{ width: 20, height: 20 }} />
            <Text style={styles.amountText}>₹{data?.price || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={[styles.text, { fontSize: 16, fontWeight: 600 }]}>Items</Text>
          <Text style={[styles.text, { marginTop: 5 }]}>{data?.categoryName || "N/A"}</Text>
        </View>
      </Block>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 15 }}>
        <Ionicons name="location" size={26} color="#0EB77B" />
        <Text style={[styles.text, { flex: 1, paddingRight: 24 }]}>
          Pickup Location: {data?.address || "N/A"},  {data?.city || "N/A"}, {data?.state || "N/A"}
        </Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={handleViewDetail}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
    position: 'absolute',
    right: 10,
    top: -15,
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
    alignItems: 'center',
    marginRight: 10,
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: "#b3b3b3",
    borderLeftWidth: 1,
    borderLeftColor: "#63b3b3",
    paddingHorizontal: 12,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '500',
    color: "#000",
    marginLeft: 5,
  },
  text: {
    fontSize: 14,
    color: "#000",
    textAlign: 'center',
  },
  blueText: {
    color: "#000",
    fontWeight: '500',
  },
  viewDetailsButton: {},
  viewDetailsText: {
    fontSize: 16,
    color: "#0EB77B",
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default MyPostHistory;