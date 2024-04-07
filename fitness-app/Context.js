import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessItems = createContext();

const FITNESS_CONTEXT_KEY = "fitnessContextData";

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Loading data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(FITNESS_CONTEXT_KEY);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setCompleted(parsedData.completed || []);
          setWorkout(parsedData.workout || 0);
          setCalories(parsedData.calories || 0);
          setMinutes(parsedData.minutes || 0);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  // Saving data to AsyncStorage whenever the state changes
  useEffect(() => {
    const saveData = async () => {
      try {
        const dataToStore = JSON.stringify({
          completed,
          workout,
          calories,
          minutes,
        });
        await AsyncStorage.setItem(FITNESS_CONTEXT_KEY, dataToStore);
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };

    saveData();
  }, [completed, workout, calories, minutes]);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
