import React, { useRef } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const {width, height} = Dimensions.get('window');
import Asset21 from "../../Images/Onbording.png"

const slides =[
  {
    id:'1',
    image:Asset21,
    title1:"The Current",
    title2:"eMobility market",
    colorTitle:"is highly  fragmented",
    subtitle:`The EV market is extremely fragmented and challenging for consumers to navigate because it is made up of multiple Charge Point Operators each providing their own charging options,making it tedious for users`
  },
  {
    id:'2',
    image:Asset21,
    title1:"Need for",
    title2:"",
    colorTitle:"Open Collaboration",
    subtitle:`With an increase in charge point operators every year, this fragmentation and complexity will grow deeper! The eMobility market will be more complicated without an open eRoaming network, hence the need for Open Collaboration`
  },
  {
    id:'3',
    image:Asset21,
    title1:"The Network",
    title2:"",
    colorTitle:"Effect",
    subtitle:`With the largest user base of EV owners, InterCharge network will be the easiest approach to grow your business and access new markets.`
  }
]

const Slide = ({item}) => {
  return (
    <View style={{alignItems:"left",marginTop:30,width:width}}>
      <View style={{alignItems:"left",padding:10,height:"30%",justifyContent:"center"}}>
      <Text style={{fontSize:39,fontWeight:500}}>{item?.title1}</Text>
      {item.title2 !== "" && <Text style={{fontSize:39,fontWeight:500}}>{item?.title2}</Text>}
      <Text style={{fontSize:35,color:"#FF4000",fontWeight:600}}>{item?.colorTitle}</Text>
      </View>
      

      <View style={{alignItems:"center",height:"45%"}}>
      <Image
        source={item?.image}
        style={{resizeMode: 'contain'}}
      />
      </View>
    </View>
  );
};
export const AppSlides = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  const HandelGetStarted=()=>{
    navigation.replace("Login")
  }

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.15,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor:"#40A99E",
                  width: 10
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={HandelGetStarted}>
                <Text style={{fontWeight: 'bold', fontSize: 15,color:"#FFF"}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:"black",
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"black",
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"#FFF"
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.85}}
        showsHorizontalScrollIndicator={false}
        horizontal
        decelerationRate="fast"
        keyExtractor={(item)=>item.id}
        data={slides}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF"
  },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  });
