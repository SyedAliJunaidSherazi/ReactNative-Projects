import { Image, Text, View, TouchableOpacity } from "react-native";
import { getFitnessData } from "../data/fitness";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FitnessCards = () => {
  // const FitnessData = fitness;
  const [fitnessData, setFitnessData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFitnessData();
      setFitnessData(data);
    };

    fetchData();
  }, []);

  return (
    <View style={{ marginTop: 80, marginHorizontal: 20, marginBottom: 20 }}>
      {fitnessData.map((item, id) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Workout", {
              image: item.image,
              exercises: item.exercises,
              id: item.id,
            })
          }
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
          key={id}
        >
          <Image
            style={{ width: "100%", height: 120, borderRadius: 12 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={30}
            color="#dfbe04"
            style={{ position: "absolute", bottom: 15, left: 15 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FitnessCards;
