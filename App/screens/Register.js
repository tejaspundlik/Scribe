import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}:3000/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("FirstScan");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };
  const navigateToSignin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.Eclipses}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/64qfzkitree-13%3A87?alt=media&token=af9958b7-f970-4dd6-93fa-6ff3a69ae386",
        }}
      />
      <Text style={styles.title}>Welcome to Scribe!</Text>
      <Text style={styles.titlet}>Let's Get started</Text>
      <TextInput
        label="Name"
        value={fullname}
        onChangeText={setName}
        style={styles.input}
        theme={{ roundness: 30 }}
        underlineColor="transparent"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        theme={{ roundness: 30 }}
        underlineColor="transparent"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{ roundness: 30 }}
        underlineColor="transparent"
      />
      {/* <TextInput
        label="Confirm Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{ roundness: 30 }}
        underlineColor="transparent"
      /> */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          labelStyle={styles.buttonLabel}
          onPress={handleRegister}
          style={styles.button}
        >
          Signup
        </Button>
      </View>
      <Text style={styles.signinLink} onPress={navigateToSignin}>
        Already have an account? Sign In
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 16,
    textAlign: "center",
    color: "#124935",
  },
  titlet: {
    fontSize: 30,
    fontWeight: 300,
    marginBottom: 16,
    textAlign: "center",
    color: "#124935",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
    color: "#106641",
    borderRadius: 30,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#4CCBBC",
    width: 300,
    height: 60,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signinLink: {
    textAlign: "center",
    marginTop: 16,
    color: "#124935",
    fontSize: 18,
  },
  Eclipses: {
    position: "absolute",
    top: -25,
    left: -75,
    width: 281,
    height: 273,
  },
});

export default RegisterScreen;
