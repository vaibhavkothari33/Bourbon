import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import { useState } from 'react';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout App</Text>
      <Button
        title="Go to User Input"
        onPress={() => navigation.navigate('UserInput')}
      />
    </View>
  );
}

function UserInputScreen({ navigation }) {
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState('');
  const [equipment, setEquipment] = useState('');

  return (
    <View style={styles.container}>  
      <Text style={styles.label}>Fitness Goal:</Text>
      <TextInput
        placeholder="e.g., Weight Loss"
        value={goal}
        onChangeText={setGoal}
        style={styles.input}
      />
      <Text style={styles.label}>Experience Level:</Text>
      <TextInput
        placeholder="e.g., Beginner"
        value={experience}
        onChangeText={setExperience}
        style={styles.input}
      />
      <Text style={styles.label}>Available Equipment:</Text>
      <TextInput
        placeholder="e.g., Dumbbells"
        value={equipment}
        onChangeText={setEquipment}
        style={styles.input}
      />
      <Button
        title="Go to Calorie Counter"
        onPress={() => navigation.navigate('CalorieCounter')}
      />
    </View>
  );
}