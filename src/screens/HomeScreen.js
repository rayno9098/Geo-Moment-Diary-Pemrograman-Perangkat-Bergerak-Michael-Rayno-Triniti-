import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { getMoments } from "../database/database";
import MomentCard from "../components/MomentCard";

export default function HomeScreen({ navigation }) {
  const [moments, setMoments] = useState([]);

  const loadData = () => {
    const data = getMoments();
    setMoments(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddMoment")}
      >
        <Text style={styles.addText}>+ Tambah Momen</Text>
      </TouchableOpacity>

      <FlatList
        data={moments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MomentCard
            item={item}
            onPress={() =>
              navigation.navigate("Detail", {
                id: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada momen yang disimpan.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    padding: 15,
  },

  addButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  description: {
    marginTop: 5,
    color: "#555",
  },

  date: {
    marginTop: 10,
    color: "gray",
    fontSize: 12,
  },

  empty: {
    marginTop: 80,
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});