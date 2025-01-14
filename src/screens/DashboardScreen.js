import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

const screenWidth = Dimensions.get('window').width;

function DashboardScreen({ route }) {
  const { weight, height, goalWeight, age, gender } = route.params;
  const [userData, setUserData] = useState({ weight, height, goalWeight, age, gender });

  // Temporarily disable the Firestore logic
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = auth().currentUser;
  //     if (user) {
  //       const userDoc = await firestore().collection('users').doc(user.uid).get();
  //       setUserData(userDoc.data());
  //     }
  //   };
  //   fetchData();
  // }, []);

  const data = {
    labels: ['Current', 'Goal'],
    datasets: [
      {
        data: [userData.weight, userData.goalWeight],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.data}>Weight: {userData.weight}kg</Text>
      <Text style={styles.data}>Height: {userData.height}cm</Text>
      <Text style={styles.data}>Age: {userData.age}</Text>
      <Text style={styles.data}>Gender: {userData.gender}</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#6200EE',
          backgroundGradientTo: '#6200EE',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#6200EE',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

function HomeScreen({ route }) {
  return <DashboardScreen route={route} />;
}

function CalorieScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calorie Counter</Text>
      <Text style={styles.data}>Food Item: Apple</Text>
      <Text style={styles.data}>Calories: 52 kcal</Text>
      <Text style={styles.data}>Protein: 0.3g</Text>
      <Text style={styles.data}>Fat: 0.2g</Text>
      <Text style={styles.data}>Carbs: 14g</Text>
    </View>
  );
}

function AccountScreen({ route }) {
  const { weight, height, goalWeight, age, gender } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.data}>Weight: {weight}kg</Text>
      <Text style={styles.data}>Height: {height}cm</Text>
      <Text style={styles.data}>Goal Weight: {goalWeight}kg</Text>
      <Text style={styles.data}>Age: {age}</Text>
      <Text style={styles.data}>Gender: {gender}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainDashboard({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Calorie') {
            iconName = 'flame';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6200EE',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={route.params} />
      <Tab.Screen name="Calorie" component={CalorieScreen} />
      <Tab.Screen name="Account" component={AccountScreen} initialParams={route.params} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
  },
  data: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
});
