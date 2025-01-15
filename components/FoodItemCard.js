import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FoodItemCard({ food }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Food: {food.label}</Text>
      <Text>Calories: {food.nutrients.ENERC_KCAL || 'N/A'}</Text>
      <Text>Protein: {food.nutrients.PROCNT || 'N/A'}g</Text>
      <Text>Fat: {food.nutrients.FAT || 'N/A'}g</Text>
      <Text>Carbs: {food.nutrients.CHOCDF || 'N/A'}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6200EE',
  },
});
