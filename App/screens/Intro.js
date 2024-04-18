import React, {useState} from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"
import { Button} from 'react-native-paper';

const Intro = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const navigateToSignin = () => {
        navigation.navigate('SignIn');
    };

  return (
    <View style={styles.SplashScreen}>
      <Image
        style={styles.Eclipses}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/64qfzkitree-13%3A87?alt=media&token=af9958b7-f970-4dd6-93fa-6ff3a69ae386",
        }}
      />
      <Image
        style={styles.Undraw_mobile_content_xvgr1}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/64qfzkitree-34%3A625?alt=media&token=b8f9ba29-06ac-43b7-ba44-c0d16595005a",
        }}
      />
      <View style={styles.Group962}>
        
        <Text style={styles.ConvertYourScribble}>Convert your Scribble</Text>
        <Image
          style={styles.Vector}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/64qfzkitree-13%3A81?alt=media&token=3f0d3c76-6c54-44e8-9a1b-49ba2f7359a2",
          }}
        />
        <Text style={styles.TextDocuments}>Text documents</Text>
        
          <Button mode="contained"  textColor="white"  onPress={navigateToSignin} style={styles.button} >
                Get Started
            </Button>
        
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  SplashScreen: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 390,
    height: 844,
    paddingRight: 17,
    paddingBottom: 116,
    boxSizing: "border-box",
    backgroundColor: "rgba(229,229,229,1)",
  },
  button: {
    marginTop: 20,
    backgroundColor:"#4CCBBC",
    fontSize:100,
    alignItems: "center",
    width: 300,
    height: 53,
    padding: 10,
   borderRadius: 100,
   boxSizing: "border-box",

},
  Eclipses: {
    position: "absolute",
    top: -25,
    left: -75,
    width: 281,
    height: 273,
  },
  Undraw_mobile_content_xvgr1: {
    position: "absolute",
    top: 114,
    left: 59,
    width: 272,
    height: 324,
  },
  Group962: {
    position: "absolute",
    top: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 351,
    height: 715,
    boxSizing: "border-box",
    right:15,
  },


  ConvertYourScribble: {
    color: "rgba(18,73,53,0.85)",
    fontSize: "30px",
    lineHeight: "100px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
  },
  Vector: {
    width: 38,
    height: 38,
  },
  TextDocuments: {
    color: "rgba(18,73,53,0.85)",
    fontSize: "30px",
    lineHeight: "100px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
  },

  GetStarted: {
    color: "rgba(253,253,253,1)",
    fontSize: "18px",
    lineHeight: "18px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "700",
  },
})
export default Intro;