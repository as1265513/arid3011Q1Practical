import React from 'react';

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated
} from 'react-native';


import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App  = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [data, setData] = React.useState([]);
  const [present, setPresent] = React.useState(0);
  const [absent, setAbsent] = React.useState(0);
 const scrolX = React.useRef(new Animated.Value(0)).current
 const slideRef = React.useRef(null);
 const [currentIndex, setCureentIndex] = React.useState();
const viewAbleItemChange= React.useRef(({viewableItems})=>{
  setCureentIndex(viewableItems[0].index)
}).current
const viewConfig =React.useRef({viewAreaCoveragePercentThreshold : 50}).current
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@StudentData');
      setData(JSON.parse(jsonValue));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const StudentData = [
    {
      StudentName: 'Azeem Sarwar',
      RNumber: 3011,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Adnan Hafeez ',
      RNumber: 3012,
      CurrentSmester: '6',
      CGPA: 3.5,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Khurram Hayat',
      RNumber: 3021,
      CurrentSmester: '6',
      CGPA: 3.7,
      Degree: 'BSSE',
    },
    {
      StudentName: 'AMeer Abduallah',
      RNumber: 3005,
      CurrentSmester: '6',
      CGPA: 3.8,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Kamran',
      RNumber: 3027,
      CurrentSmester: '6',
      CGPA: 2.5,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Osama malik',
      RNumber: 3009,
      CurrentSmester: '6',
      CGPA: 3.01,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Waqas',
      RNumber: 3001,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Azeem',
      RNumber: 3001,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Ali',
      RNumber: 3010,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Qudrat',
      RNumber: 3011,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Khurram',
      RNumber: 3010,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Ali Qaqas',
      RNumber: 3011,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'OKk',
      RNumber: 3011,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
    {
      StudentName: 'Babby',
      RNumber: 3011,
      CurrentSmester: '6',
      CGPA: 3.92,
      Degree: 'BSSE',
    },
  ];

  const MarkAttandance = () =>{
    if(currentIndex < data.length-1)
    {
      slideRef.current.scrollToIndex({index : currentIndex + 1})
    }
    else {

    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  const renderStudentList = item => {
    console.log(item)
    return (
      <View  style={styles.CardView}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',margin:10}}>
        Attandance Of {item.item.Degree}
      </Text>
        <View style={styles.line}>
          <Text style={styles.cardtext}>Student Name</Text>
          <Text style={styles.cardtext}>{item.item.StudentName}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.cardtext}>Registration Number</Text>
          <Text style={styles.cardtext}>{item.item.RNumber}</Text>
        </View>


        <View style={styles.line}>
          <Text style={styles.cardtext}>Current Smester</Text>
          <Text style={styles.cardtext}>{item.item.CurrentSmester}</Text>
        </View>


        <View style={styles.line}>
          <Text style={styles.cardtext}>CGPA</Text>
          <Text style={styles.cardtext}>{item.item.CGPA}</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{MarkAttandance()
        setPresent(present+1)
        }} style={styles.button}>
          <Text style={styles.ButtonText}>Present</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{MarkAttandance()
        setAbsent(absent+1)
        }} style={[styles.button,{backgroundColor:'red'}]}>
          <Text style={styles.ButtonText}>Absent</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => (item.RNumber + index*10)}
        renderItem={renderStudentList}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        ref={slideRef}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent : { contentOffset : {x : scrolX} } }],{
          useNativeDriver:false
        })}
        onViewableItemsChanged={viewAbleItemChange}
        viewabilityConfig={viewConfig}
      />

     
      <View style={styles.CardView}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',margin:10}}>
        Summary of Attandance
      </Text>
      <View style={styles.line}>
          <Text style={styles.cardtext}>Total Student Of Class:</Text>
          <Text style={styles.cardtext}>{data.length}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.cardtext}>Present Student</Text>
          <Text style={styles.cardtext}>{present}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.cardtext}>Absent Student Of Class:</Text>
          <Text style={styles.cardtext}>{absent}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding:10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  CardView: {
    height: 340,
    width: 340,
    backgroundColor: '#faf3f2',
    elevation: 21,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  line:
  {
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:10,
    marginVertical:10,
    

    },
    cardtext:{
      fontSize:18,
      
    },button:{height:60,width:100,justifyContent:'center',alignItems:'center',backgroundColor:'green',borderRadius:10},
    ButtonText:{color:"#fff"}
});

export default App;
