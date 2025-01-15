import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import UserInputScreen from './src/screens/UserInputScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CalorieCounterScreen from './src/screens/CalorieCounterScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ActivityScreen from './src/screens/ActivityScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Calorie') {
            iconName = 'flame';
          } else if (route.name === 'Recipe') {
            iconName = 'restaurant';
          } else if (route.name === 'Activity') {
            iconName = 'book';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#6200EE',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Calorie" component={CalorieCounterScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state to track login status

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'MainTabs' : 'Welcome'} // Conditional rendering based on login status
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="UserInput" component={UserInputScreen} options={{ title: 'User Information' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
