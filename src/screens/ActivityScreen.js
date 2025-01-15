import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from 'react-native-progress/Bar'; // Ensure you've installed react-native-progress

const ActivityScreen = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Activities with calorie burn rates (kcal per minute)
  const activities = [
    { name: 'Cycling', icon: 'bicycle', calorieRate: 8 },
    { name: 'Running', icon: 'fitness', calorieRate: 12 }, // Valid icon name
    { name: 'Yoga', icon: 'body', calorieRate: 4 },
    { name: 'Walking', icon: 'walk', calorieRate: 5 }, // Valid icon name
    { name: 'Swimming', icon: 'cloudy', calorieRate: 10 },
  ];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        setCaloriesBurned((prevCalories) => prevCalories + selectedActivity?.calorieRate);
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000); // Update every second for better responsiveness
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStartStopTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
    setCaloriesBurned(0);
    setElapsedTime(0); // Reset elapsed time
  };

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    handleResetTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Activity</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.activityCard} onPress={() => handleSelectActivity(item)}>
            <Icon name={item.icon} size={50} color="#6200EE" />
            <Text style={styles.activityName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedActivity?.name}</Text>

            {/* Timer */}
            <Text style={styles.timer}>
              {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}
            </Text>

            {/* Calories Burned */}
            <Text style={styles.calories}>
              Calories Burned: {caloriesBurned.toFixed(2)} kcal
            </Text>

            {/* Progress Bar for Calories Burned */}
            <ProgressBar
              progress={elapsedTime / 3600} // Assuming the user could burn calories for 1 hour
              width={250}
              height={10}
              color="#6200EE"
              unfilledColor="#d3d3d3"
              borderRadius={5}
            />

            <View style={styles.buttonContainer}>
              <Button title={isTimerRunning ? "Pause" : "Start"} onPress={handleStartStopTimer} color="#6200EE" />
              <Button title="Reset" onPress={handleResetTimer} color="#6200EE" />
            </View>
            <Button title="Close" onPress={handleCloseModal} color="#6200EE" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
    textAlign: 'center',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  activityName: {
    fontSize: 18,
    marginLeft: 10,
    color: '#6200EE',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
  },
  calories: {
    fontSize: 18,
    marginBottom: 20,
    color: '#6200EE',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});

export default ActivityScreen;
