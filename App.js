import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import UserInputScreen from './src/screens/UserInputScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CalorieCounterScreen from './src/screens/CalorieCounterScreen';
import Icon from 'react-native-vector-icons/Ionicons';
// import './src/firebaseConfig'; // Comment out the Firebase configuration

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} initialParams={route.params} />
      <Tab.Screen name="Calorie" component={CalorieCounterScreen} />
      {/* <Tab.Screen name="Account" component={UserAccountScreen} initialParams={route.params} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="UserInput" component={UserInputScreen} options={{ title: 'User Information' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}