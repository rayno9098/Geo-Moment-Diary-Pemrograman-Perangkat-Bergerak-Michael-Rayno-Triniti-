import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import { getMoment, updateMoment } from "../database/database";
import { takePhoto } from "../services/camera";
import { getCurrentLocation } from "../services/location";

export default function EditMomentScreen({ route, navigation }) {
  const { id } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    loadMoment();
  }, []);

  const loadMoment = () => {
    const data = getMoment(id);

    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setLatitude(String(data.latitude));
      setLongitude(String(data.longitude));
    }
  };

  const handleCamera = async () => {
    const uri = await takePhoto();

    if (uri) {
      setImage(uri);
    }
  };

  const handleLocation = async () => {
    const location = await getCurrentLocation();

    if (location) {
      setLatitude(location.latitude.toFixed(6));
      setLongitude(location.longitude.toFixed(6));
    }
  };

  const saveUpdate = () => {
    if (!title || !description) {
      Alert.alert("Peringatan", "Judul dan catatan wajib diisi.");
      return;
    }

    updateMoment({
      id,
      title,
      description,
      image,
      latitude,
      longitude,
    });

    Alert.alert("Berhasil", "Data berhasil diperbarui.");

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>Judul</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Catatan</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.greenButton}
        onPress={handleCamera}
      >
        <Text style={styles.buttonText}>
          📷 Ganti Foto
        </Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : null}

      <TouchableOpacity
        style={styles.greenButton}
        onPress={handleLocation}
      >
        <Text style={styles.buttonText}>
          📍 Ambil Lokasi Baru
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Latitude</Text>

      <TextInput
        style={styles.input}
        value={latitude}
        editable={false}
      />

      <Text style={styles.label}>Longitude</Text>

      <TextInput
        style={styles.input}
        value={longitude}
        editable={false}
      />

      <TouchableOpacity
        style={styles.blueButton}
        onPress={saveUpdate}
      >
        <Text style={styles.buttonText}>
          Simpan Perubahan
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginVertical: 15,
  },

  greenButton: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  blueButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17,
  },
});