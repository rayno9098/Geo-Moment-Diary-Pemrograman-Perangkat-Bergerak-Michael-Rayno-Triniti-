import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

import {
  getMoment,
  deleteMoment,
} from "../database/database";

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;

  const [moment, setMoment] = useState(null);

  useEffect(() => {
    loadMoment();
  }, []);

  const loadMoment = () => {
    const data = getMoment(id);
    setMoment(data);
  };

  const removeMoment = () => {
    Alert.alert(
      "Konfirmasi",
      "Hapus momen ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: () => {
            deleteMoment(id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (!moment) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>

      {moment.image ? (
        <Image
          source={{ uri: moment.image }}
          style={styles.image}
        />
      ) : null}

      <Text style={styles.title}>
        {moment.title}
      </Text>

      <Text style={styles.label}>Catatan</Text>

      <Text style={styles.text}>
        {moment.description}
      </Text>

      <Text style={styles.label}>Tanggal</Text>

      <Text style={styles.text}>
        {moment.created_at}
      </Text>

      <Text style={styles.label}>Latitude</Text>

      <Text style={styles.text}>
        {moment.latitude}
      </Text>

      <Text style={styles.label}>Longitude</Text>

      <Text style={styles.text}>
        {moment.longitude}
      </Text>

      {
        moment.latitude &&
        moment.longitude && (

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: Number(moment.latitude),
              longitude: Number(moment.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >

            <Marker
              coordinate={{
                latitude: Number(moment.latitude),
                longitude: Number(moment.longitude),
              }}
            />

          </MapView>

        )
      }

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("Edit", { id })
        }
      >
        <Text style={styles.buttonText}>
          Edit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={removeMoment}
      >
        <Text style={styles.buttonText}>
          Hapus
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  image: {
    width: "100%",
    height: 250,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },

  label: {
    marginHorizontal: 20,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  text: {
    marginHorizontal: 20,
    marginTop: 5,
    fontSize: 15,
  },

  map: {
    height: 250,
    margin: 20,
    borderRadius: 10,
  },

  editButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#E53935",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },

});