import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.content, opacity: fadeAnim }}>
        <Text style={styles.title}>Borbon</Text>
        <Text style={styles.quote}>“The only bad workout is the one that didn’t happen.”</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
