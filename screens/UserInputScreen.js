import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserInputScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [gymTiming, setGymTiming] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleNext = async () => {
    const user = auth().currentUser;
    if (user) {
      await firestore().collection('users').doc(user.uid).set({
        weight,
        height,
        goalWeight,
        gymTiming,
        age,
        gender,
      });
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Weight (kg):</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Text style={styles.label}>Height (cm):</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      <Text style={styles.label}>Goal Weight (kg):</Text>
      <TextInput style={styles.input} value={goalWeight} onChangeText={setGoalWeight} keyboardType="numeric" />
      <Text style={styles.label}>Gym Timing:</Text>
      <TextInput style={styles.input} value={gymTiming} onChangeText={setGymTiming} />
      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text style={styles.label}>Gender:</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />
      <Button title="Next" onPress={handleNext} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default UserInputScreen;
