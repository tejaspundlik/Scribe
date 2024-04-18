import React, { useState, useContext } from 'react';
import axios from 'axios'; // Import Axios
import { StyleSheet, View, Alert, Image } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { AuthContext } from '../AuthContext';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleSignIn = async () => {
        try {
            const response = await axios.post('https://mp-hosted-backend.onrender.com/auth/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                signIn(email);
            } else {
                Alert.alert('Error', response.data.error);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.Eclipses}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/64qfzkitree-13%3A87?alt=media&token=af9958b7-f970-4dd6-93fa-6ff3a69ae386",
                }}
            />
            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.Group929}>
                <Image
                    style={styles.Undraw_authentication_re_svpt2}
                    source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/0qc6ymoxdxpd-27%3A226?alt=media&token=38e64c75-4abc-430e-9119-535e02c20e93",
                    }}
                />
            </View>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                theme={{ roundness: 30 }}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                theme={{ roundness: 30 }}
            />
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleSignIn} labelStyle={styles.buttonLabel} style={styles.button}>
                    Sign In
                </Button>
            </View>
            <Text style={styles.registerLink} onPress={navigateToRegister}>Don't have an account? Register</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: -200,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "#124935",
    },
    input: {
        marginBottom: 16,
        backgroundColor: "white",
        color: 'black',
        borderRadius: 30,
        width: 300,
    },
    buttonContainer: {
        alignItems: 'center',
        fontWeight: "Bold", // Center the button horizontally
    },
    button: {
        marginTop: 16,
        backgroundColor: "#4CCBBC",
        fontSize: "50px",
        width: 300,
        height: 60,
        padding: 10,
        borderRadius: 100,
        alignItems: "center"
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 16,
        color: '#124935',
        fontSize: 18,
    },
    Eclipses: {
        top: 50,
        left: -85,
        width: 281,
        height: 273,
    },
    Group929: {
        alignItems: "center",
        marginBottom: 20,
    },
    Undraw_authentication_re_svpt2: {
        width: 231,
        height: 264,
    },
});

export default SignInScreen;