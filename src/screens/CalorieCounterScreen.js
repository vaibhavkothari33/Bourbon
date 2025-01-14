import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const CalorieCounterScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Replace with your public API keys
  const APP_ID = 'YOUR_APP_ID';
  const APP_KEY = 'YOUR_APP_KEY';

  const fetchCalorieData = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setResults(data.hints || []);
    } catch (error) {
      console.error('Error fetching calorie data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Food:</Text>
      <TextInput
        placeholder="e.g., Apple"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={fetchCalorieData} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Food: {item.food.label}</Text>
            <Text style={styles.resultText}>Calories: {item.food.nutrients.ENERC_KCAL || 'N/A'}</Text>
            <Text style={styles.resultText}>Protein: {item.food.nutrients.PROCNT || 'N/A'}g</Text>
            <Text style={styles.resultText}>Fat: {item.food.nutrients.FAT || 'N/A'}g</Text>
            <Text style={styles.resultText}>Carbs: {item.food.nutrients.CHOCDF || 'N/A'}g</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ced4da',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: 'tomato',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    resultCard: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#e9ecef',
      borderRadius: 5,
    },
    resultText: {
      fontSize: 16,
      color: '#333',
    },
  });
export default CalorieCounterScreen;
