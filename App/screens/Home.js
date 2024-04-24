import React, { useState, useContext } from "react";
import { View, Image, Platform, StyleSheet, Text, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, ActivityIndicator, IconButton } from "react-native-paper";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Home = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { userEmail } = useContext(AuthContext);

  const pickImageFromCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      console.log(result.assets[0].uri);
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      const base64Image = image.split(",")[1];

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}:5000/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const addtodb = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}:3000/document/add`,
        {
          email: userEmail,
          content: response.data.text,
        }
      );
      console.log(response.data.text);
      setResult(response.data.text);
      setShowModal(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const rotateImage = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={{
              width: 350,
              height: 350,
              top: 60,
              transform: [{ rotate: `${rotation}deg` }],
            }}
          />
          <IconButton
            icon="rotate-right"
            size={24}
            color="#4CCBBC"
            style={styles.rotateButton}
            onPress={rotateImage}
          />
        </View>
      )}
      <Button
        mode="contained"
        onPress={pickImageFromCamera}
        style={styles.button}
      >
        Click Image
      </Button>
      <Button
        mode="contained"
        onPress={pickImageFromGallery}
        style={styles.button}
      >
        Pick from Gallery
      </Button>
      {image && (
        <Button
          mode="contained"
          onPress={uploadImage}
          loading={uploading}
          style={styles.button}
        >
          Convert Image
        </Button>
      )}
      {uploading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CCBBC" />
        </View>
      )}
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{result}</Text>
            <Button
              mode="contained"
              onPress={() => setShowModal(false)}
              style={styles.button}
            >
              Close
            </Button>
          </View>
        </View>
      </Modal>
      <Image
        style={styles.Eclipses}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/ta6zkaosab-28%3A483?alt=media&token=9321fce2-14cf-4e42-a5f0-7ad8ce5037ce",
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CCBBC",
    width: 200,
    height: 60,
    padding: 10,
    borderRadius: 100,
    top: 50,
    fontSize: 100,
    alignItems: "center",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  Eclipses: {
    position: "absolute",
    top: -25,
    left: -75,
    width: 281,
    height: 273,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  rotateButton: {
    position: "absolute",
    bottom: -20,
    right: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});
