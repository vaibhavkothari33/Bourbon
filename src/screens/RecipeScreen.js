import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Animated, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const RecipeScreen = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const fadeAnim = new Animated.Value(0);

  // Request permissions for camera and storage
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    }
  };

  // Call permissions request when the component mounts
  useEffect(() => {
    requestPermissions();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://api.example.com/recipes?ingredients=${ingredients}`);
      const data = await response.json();
      setRecipes(data.recipes || []);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleImagePick = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.error('ImagePicker Error: ', response.error);
    } else {
      const uri = response.assets[0].uri;
      setImageUri(uri);
    }
  };

  const openCamera = () => {
    console.log('Camera button pressed');
    launchCamera({ mediaType: 'photo' }, handleImagePick);
  };

  const openImageLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, handleImagePick);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Ingredients:</Text>
      <TextInput
        placeholder="e.g., Chicken, Rice"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
        multiline={true}
        numberOfLines={6}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchRecipes}>
          <Text style={styles.buttonText}>Get Recipes</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.imageButton} onPress={openImageLibrary}>
        <Text style={styles.buttonText}>Import from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ghostBox} onPress={openImageLibrary}>
        <Icon name="cloud-upload-outline" size={50} color="#6200EE" />
        <Text style={styles.ghostBoxText}>Upload Image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TouchableOpacity style={styles.imageButton} onPress={openCamera}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <Animated.View style={{ ...styles.resultsContainer, opacity: fadeAnim }}>
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeText}>Ingredients: {item.ingredients.join(', ')}</Text>
              <Text style={styles.recipeText}>Instructions: {item.instructions}</Text>
            </View>
          )}
        />
      </Animated.View>
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
      color: '#6200EE',
    },
    input: {
      borderWidth: 1,
      borderColor: '#6200EE',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      textAlignVertical: 'top',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#6200EE',
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    ghostBox: {
      borderWidth: 1,
      borderColor: '#6200EE',
      borderRadius: 5,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#f8f9fa',
    },
    ghostBoxText: {
      fontSize: 16,
      color: '#6200EE',
      marginTop: 10,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#6200EE',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    resultsContainer: {
      marginTop: 20,
    },
    recipeCard: {
      padding: 15,
      marginBottom: 10,
      backgroundColor: '#e9ecef',
      borderRadius: 5,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#6200EE',
    },
    recipeText: {
      fontSize: 16,
      color: '#333',
    },
  });
  
  export default RecipeScreen;