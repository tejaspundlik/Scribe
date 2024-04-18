import React ,{useState}from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"
import { Button} from 'react-native-paper';

const FirstScan = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const navigateToHome = () => {
        navigation.navigate('Home');
    };
  return (
    <View style={styles.FirstScan}>
      <Image
        style={styles.Eclipses}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/d0q8bhveiml-27%3A308?alt=media&token=60a5228f-9f64-402f-97b5-cac725ecdae1",
        }}
      />
      <Text style={styles.NoScansYet}>No Scans yet?</Text>
      <View style={styles.Group252}>
        <Image
          style={styles.Undraw_add_notes_re_ln361}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/d0q8bhveiml-28%3A360?alt=media&token=4b8a0792-d845-4033-9235-7356e36a9bb1",
          }}
        />
        <Text style={styles.ConvertYourFirstFile}>
          Convert your first file now
        </Text>
        <View style={styles.buttonContainer}>
        <Button mode="contained" labelStyle={styles.buttonLabel}  textColor="white"  onPress={navigateToHome} style={styles.button} >
                Proceed
            </Button>
        </View>
        </View>
      </View>
    
  )
}

const styles = StyleSheet.create({
  FirstScan: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 390,
    height: 844,
    boxSizing: "border-box",
    backgroundColor: "rgba(229,229,229,1)",
  },
  Eclipses: {
    position: "absolute",
    top: -25,
    left: -75,
    width: 281,
    height: 273,
  },
  NoScansYet: {
    position: "absolute",
    top: 150,
    left: 90,
    color: "rgba(18,73,53,0.85)",
    fontSize: "40px",
    lineHeight: "40px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
  },
  Group252: {
    position: "absolute",
    top: 13,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 351,
    height: 709,
    boxSizing: "border-box",
  },
 
  Undraw_add_notes_re_ln361: {
    top:190,
    width: 258,
    height: 295,
  },
  ConvertYourFirstFile: {
    top:220,
    right:-25,
    color: "rgba(18,73,53,0.85)",
    fontSize: "30px",
    lineHeight: "30px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
  },
  buttonContainer: {
    alignItems: 'center',
    fontWeight:"Bold", // Center the button horizontally
},
button: {
    marginTop: 240,
    backgroundColor:"#4CCBBC",
    fontSize:"50px",
    width: 200,
    height: 60,
    padding: 10,
    right:-20,
   borderRadius: 100,
   alignItems:"center"
},
buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
},
})
export default FirstScan