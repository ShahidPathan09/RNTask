import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {UpdateCardData, removeCard} from '../Store/Slice/Slice';

// Render Cards
function cardList(item: any, dispatch: Function) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardDetails}>
        <View style={styles.cardTextData}>
          <View style={styles.keyValueInline}>
            <Text style={styles.labelStyle}>First Name -</Text>
            <Text style={styles.valueStyle}>{item?.fName}</Text>
          </View>

          <View style={styles.keyValueInline}>
            <Text style={styles.labelStyle}>Last Name -</Text>
            <Text style={styles.valueStyle}>{item?.lName}</Text>
          </View>

          <View style={styles.keyValueInline}>
            <Text style={styles.labelStyle}>DOB -</Text>
            <Text style={styles.valueStyle}>{item?.dob}</Text>
          </View>

          <View style={styles.keyValueInline}>
            <Text style={styles.labelStyle}>Married -</Text>
            <Text style={styles.valueStyle}>
              {item?.married ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>

        <View style={styles.cardPhoto}>
          <Octicons name="feed-person" color={'black'} size={80} />
        </View>
      </View>

      <View style={styles.cardOperationContainer}>
        <AntDesign name="edit" size={25} color="black" />
        <AntDesign
          name="delete"
          size={25}
          color="black"
          onPress={() => dispatch(removeCard(item))}
        />
      </View>
    </View>
  );
}

// Main component
function Home() {
  const storedCardData = useSelector(
    (state: {updateData: UpdateCardData}) => state.updateData?.data,
  );

  console.log('storedCardData', storedCardData);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={storedCardData}
        extraData={storedCardData}
        renderItem={({item}) => cardList(item, dispatch)}
      />

      <Pressable
        style={styles.addBtnContainer}
        onPress={() => navigation.navigate('UpdateData')}>
        <Text style={styles.addBtnText}>+ ADD</Text>
      </Pressable>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  addBtnContainer: {
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  addBtnText: {
    fontSize: 25,
    color: 'black',
  },
  cardContainer: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cardTextData: {
    flex: 1,
  },
  cardPhoto: {
    marginHorizontal: 5,
  },
  keyValueInline: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  labelStyle: {
    width: '40%',
    fontSize: 18,
    color: 'black',
  },
  valueStyle: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  cardOperationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '50%',
    marginVertical: 15,
  },
});
