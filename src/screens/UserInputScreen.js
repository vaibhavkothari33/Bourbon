import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

const UserInputScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleNext = async () => {
    // Temporarily disable the Firestore logic
    // const user = auth().currentUser;
    // if (user) {
    //   await firestore().collection('users').doc(user.uid).set({
    //     weight,
    //     height,
    //     goalWeight,
    //     age,
    //     gender,
    //   });
    // }
    navigation.navigate('MainTabs', { weight, height, goalWeight, age, gender });
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Current Weight (kg):</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Text style={styles.label}>Height (cm):</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      <Text style={styles.label}>Goal Weight (kg):</Text>
      <TextInput style={styles.input} value={goalWeight} onChangeText={setGoalWeight} keyboardType="numeric" />
      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text style={styles.label}>Gender:</Text>
      <RadioForm
        radio_props={genderOptions}
        initial={-1}
        onPress={(value) => setGender(value)}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={'#6200EE'}
        selectedButtonColor={'#6200EE'}
        labelStyle={styles.radioLabel}
        style={styles.radioForm}
      />
      <Button title="Next" onPress={handleNext} color="#6200EE" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#6200EE',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  radioForm: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 18,
    marginRight: 20,
    color: '#6200EE',
  },
});

export default UserInputScreen;
