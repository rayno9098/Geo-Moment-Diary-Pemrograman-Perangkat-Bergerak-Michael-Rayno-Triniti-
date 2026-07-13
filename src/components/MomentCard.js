import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function MomentCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={{ color: "#999" }}>Tidak ada Foto</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.date}>
          {item.created_at}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 180,
  },

  noImage: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
  },

  info: {
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  description: {
    marginTop: 8,
    color: "#555",
  },

  date: {
    marginTop: 10,
    color: "gray",
    fontSize: 12,
  },
});