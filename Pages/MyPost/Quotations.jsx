import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Block, Text } from "galio-framework";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useAppContext } from '../../Context/AppContext';
import { Base_url } from '../../Config/BaseUrl';

const { width, height } = Dimensions.get('window');

export const Quotations = () => {
  const { userDetails } = useAppContext();
  const navigation = useNavigation();
  const [quotationDetails, setQuotationDetails] = useState({});
  const route = useRoute();
  const { quotationId } = route.params;

  const handelBack = () => {
    navigation.goBack();
  };

  const handelAccept = async () => {
    console.log('Quotation Details:', quotationDetails.postId._id, quotationDetails.wholesalerId.id);
    try {
      const response = await axios.post(`${Base_url}posts/updatePostStatus`, {
        postId: quotationDetails.postId._id,
        status: 'Pending',
        postTo: quotationDetails.wholesalerId.id,
      });
      console.log('Post status updated:', response.data);
      navigation.navigate("QuotationAccepted");
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const handelDecline = async () => {
    try {
      const response = await axios.post(`${Base_url}posts/updatePostStatus`, {
        postId: quotationDetails.postId._id,
        status: 'Rejected',
      });
      console.log('Post status updated:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const getQuotationDetails = async () => {
    try {
      const response = await axios.get(`${Base_url}quotations/${quotationId}`);
      const data = response.data;
      setQuotationDetails(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotationDetails();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ padding: 15, backgroundColor: "#fff", marginTop: 0, borderRadius: 10 }}>
          <Block>
            <Block style={{ flexDirection: 'row', alignItems: 'center', marginTop: 55 }}>
              <Block style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 150, marginLeft: 0 }}>
                <MaterialIcons onPress={handelBack} name="arrow-back-ios" size={24} style={{ marginLeft: 5 }} color="black" />
              </Block>
              <Text style={{ marginLeft: 15, fontSize: 25, fontWeight: '500', flex: 1 }}>Quotations Details</Text>
            </Block>
          </Block>

          <Block style={{ marginTop: 10 }}>
            <Block style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="people" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 600 }}>
                {quotationDetails?.wholesalerId?.name || "N/A"}
              </Text>
            </Block>

            <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 600 }}>
                {quotationDetails?.postId?.categoryName || "N/A"}
              </Text>
            </Block>

            <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/Rupee.png')} style={{ height: 20, width: 20 }} />
              <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 700 }}>
                Rate: ₹ {quotationDetails?.price || "N/A"}
              </Text>
            </Block>

            <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="calendar" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 500 }}>
                {quotationDetails?.createdAt ? new Date(quotationDetails.createdAt).toLocaleDateString('en-GB') : "N/A"}
              </Text>
            </Block>

            <Block style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={20} color="#0EB77B" />
              <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 500 }}>
                Pickup Location: {quotationDetails?.postId?.address || "N/A"}, {quotationDetails?.postId?.city || "N/A"}, {quotationDetails?.postId?.state || "N/A"}
              </Text>
            </Block>

            <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={handelAccept}>
                  <View style={styles.acceptButton}>
                    <Text style={styles.acceptText}>Accept Offer</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handelDecline}>
                  <View style={styles.declineButton}>
                    <Text style={styles.declineText}>Decline</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Block>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
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
});

export default Quotations;