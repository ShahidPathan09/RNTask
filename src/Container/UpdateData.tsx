import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Image} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-modern-datepicker';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {FormValidation} from './handler';
import {setCardData, UpdateCardData, updateCard} from '../Store/Slice/Slice';

function UpdateData({route}: any) {
  const routeData = route?.params?.data || {};
  const {id, fName, lName, dob, married, image} = routeData;

  const cardUpdateFlag = route?.params?.cardUpdateFlag ?? false;

  const dispatch = useDispatch();
  const cardData = useSelector(
    (state: {updateData: UpdateCardData}) => state?.updateData?.data,
  );

  const lastCardId = cardData.slice(-1)[0] || {};

  const navigation = useNavigation();
  const [dateField, setDateField] = useState(false);

  const modifiedDate = dayjs().format('YYYY-MM-DD');

  const openImagePicker = (setFieldValue: Function) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async imageData => {
        setFieldValue('image', imageData?.path);
      })
      .catch((err: any) => {
        console.log('error', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>
        {cardUpdateFlag ? 'Update Details' : 'New Entry'}
      </Text>

      <Formik
        initialValues={{
          fName: fName ?? '',
          lName: lName ?? '',
          dob: dob ?? '',
          married: married ?? false,
          image: image ?? '',
        }}
        validationSchema={FormValidation}
        onSubmit={(values: any) => {
          const updatedCardData = {
            id: id
              ? id
              : lastCardId.hasOwnProperty('id')
              ? lastCardId?.id + 1
              : 1,
            fName: values?.fName,
            lName: values?.lName,
            dob: values?.dob,
            married: values?.married,
            image: values?.image,
          };

          Object.keys(routeData).length
            ? dispatch(updateCard(updatedCardData))
            : dispatch(setCardData(updatedCardData));

          setTimeout(() => {
            navigation.navigate('Home');
          }, 1500);
        }}>
        {({handleChange, handleSubmit, values, setFieldValue}: any) => (
          <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>First Name</Text>
            <TextInput
              onChangeText={handleChange('fName')}
              value={values.fName}
              style={styles.inputField}
            />
            <Text style={styles.errorMessageStyle}>
              <ErrorMessage name="fName" />
            </Text>

            <Text style={styles.labelStyle}>Last Name</Text>
            <TextInput
              onChangeText={handleChange('lName')}
              value={values.lName}
              style={styles.inputField}
            />
            <Text style={styles.errorMessageStyle}>
              <ErrorMessage name="lName" />
            </Text>

            <Text style={styles.labelStyle}>DOB</Text>
            {dateField ? (
              <DatePicker
                options={{
                  backgroundColor: 'rgba(0,0,0,0.175)',
                  textHeaderColor: 'black',
                  textDefaultColor: 'black',
                  selectedTextColor: 'white',
                  mainColor: 'black',
                  textSecondaryColor: 'black',
                  borderColor: 'black',
                }}
                style={styles.calendarStyle}
                current={modifiedDate}
                selected={modifiedDate}
                mode="calendar"
                minuteInterval={30}
                onDateChange={e => {
                  let value = dayjs(e).format('DD/MM/YYYY');
                  setFieldValue('dob', value);
                  setTimeout(() => {
                    setDateField(false);
                  }, 500);
                }}
              />
            ) : (
              <>
                <TextInput
                  value={values.dob}
                  style={styles.inputField}
                  onPressIn={() => setDateField(true)}
                />
                <Text style={styles.errorMessageStyle}>
                  <ErrorMessage name="dob" />
                </Text>
              </>
            )}

            <BouncyCheckbox
              size={20}
              fillColor="black"
              unfillColor="#FFFFFF"
              onPress={() => setFieldValue('married', !values?.married)}
              text="Married"
              textStyle={styles.checkboxLabelStyle}
              isChecked={values?.married}
            />

            <View style={styles.imageContainer}>
              <Text style={styles.checkboxLabelStyle}>Choose image</Text>

              {values?.image ? (
                <>
                  <Image
                    source={{uri: values?.image}}
                    style={styles.cardImage}
                  />
                  <AntDesign
                    name="closecircle"
                    size={25}
                    color="black"
                    style={styles.routeCardImage}
                    onPress={() => setFieldValue('image', '')}
                  />
                </>
              ) : (
                <FontAwesome
                  name="image"
                  size={30}
                  color="black"
                  style={styles.imageIcon}
                  onPress={() => openImagePicker(setFieldValue)}
                />
              )}
            </View>

            <View style={styles.submitBtnContainer}>
              <Button
                onPress={handleSubmit}
                title={cardUpdateFlag ? 'Update' : 'Submit'}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default UpdateData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    marginVertical: 20,
    fontSize: 28,
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    flex: 1,
  },
  labelStyle: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.7)',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 22,
    color: 'black',
  },
  errorMessageStyle: {
    marginBottom: 5,
    fontSize: 16,
    color: '#d60f0f',
  },
  checkboxLabelStyle: {
    fontSize: 18,
    color: 'black',
    textDecorationLine: 'none',
  },
  calendarStyle: {
    borderRadius: 5,
    alignSelf: 'center',
  },
  imageContainer: {
    marginVertical: 30,
    flexDirection: 'row',
  },
  imageIcon: {
    marginHorizontal: 15,
  },
  cardImage: {
    width: 120,
    height: 120,
    marginHorizontal: 10,
    borderRadius: 60,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  routeCardImage: {
    position: 'absolute',
    left: '60%',
    top: '3%',
  },
  submitBtnContainer: {
    width: '35%',
    marginVertical: 20,
    alignSelf: 'center',
  },
});
