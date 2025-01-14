import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId: 'AIzaSyC9-tbf2XRDAA9K1W3dqZYlimaPdNCwWks', // Replace with your web client ID from Firebase
// });

export default function LoginScreen({ navigation }) {
  const handleLogin = async () => {
    // Temporarily disable the login logic
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    //   await auth().signInWithCredential(googleCredential);
    //   navigation.navigate('UserInput');
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
    navigation.navigate('UserInput'); // Directly navigate to UserInput screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subtitle}>Create an account or log in with Google</Text>
      {/* Temporarily disable the Google Sign-In button */}
      {/* <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLogin}
      /> */}
      <Text onPress={handleLogin} style={styles.loginText}>Login with Google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  // googleButton: {
  //   width: 192,
  //   height: 48,
  // },
  loginText: {
    fontSize: 18,
    color: '#6200EE',
    textDecorationLine: 'underline',
  },
});
