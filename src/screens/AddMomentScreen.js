import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";

import { addMoment } from "../database/database";
import { takePhoto } from "../services/camera";
import { getCurrentLocation } from "../services/location";

export default function AddMomentScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // sementara kosong
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const location = await getCurrentLocation();

    if (location) {
      setLatitude(location.latitude.toString());
      setLongitude(location.longitude.toString());
    }
  };

  const handleCamera = async () => {
    const uri = await takePhoto();

    if (uri) {
      setImage(uri);
    }
  };

  const saveMoment = () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert("Peringatan", "Judul dan Catatan wajib diisi.");
      return;
    }

    addMoment({
      title,
      description,
      image,
      latitude,
      longitude,
    });

    Alert.alert("Berhasil", "Momen berhasil disimpan.");

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Judul</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan judul..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Catatan</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Tulis catatan..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Foto</Text>

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={handleCamera}
      >
        <Text style={styles.cameraText}>
          📷 Ambil Foto
        </Text>
      </TouchableOpacity>

      {
        image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )
      }

      <Text style={styles.label}>Latitude</Text>

      <TextInput
        style={styles.input}
        value={latitude}
        editable={false}
        placeholder="Belum ada"
      />

      <Text style={styles.label}>Longitude</Text>

      <TextInput
        style={styles.input}
        value={longitude}
        editable={false}
        placeholder="Belum ada"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveMoment}
      >
        <Text style={styles.buttonText}>
          Simpan Momen
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  cameraButton: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  cameraText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  image: {
    width: "100%",
    height: 220,
    marginTop: 15,
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});