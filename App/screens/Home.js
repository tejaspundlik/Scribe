import React, { useState } from 'react'
import { View, Image, Platform,StyleSheet,Text} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, ActivityIndicator} from 'react-native-paper'
import * as ImageManipulator from 'expo-image-manipulator';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import axios from 'axios'
const Home = ({navigation}) => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [result, setResult] = useState(null);
    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!')
                return
            }
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            console.log(result.assets[0].uri)
            const base64Image = await imageToBase64(result.assets[0].uri)
            setImage(base64Image)
        }
    }
    const uploadImage = async () => {
      setUploading(true);
      try {
        const base64Image = image.split(',')[1];
    
        const formData = new FormData();
        formData.append('image', {
          uri: image,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
    
        const response = await axios.post('http://192.168.0.102:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        console.log(response.data.text);
        setResult(response.data.text);
        navigateToResult(response.data.text); // Call navigateToResult with response.data.text
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    };
    const imageToBase64 = async (uri) => {
        let base64Image = null
        try {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                uri,
                [],
                { format: 'jpeg', base64: true }
            )
            base64Image = `data:image/jpeg;base64,${manipulatedImage.base64}`
        } catch (error) {
            console.error('Error converting image to base64:', error)
        }
        return base64Image
    }
    const navigateToResult = (text) => {
      navigation.navigate('Result',{text});
    };
    
    // const getLatestImageFileName = async () => {
    //     try {
    //       const response = await fetch('http://192.168.0.102:3000/model/conv/latest-image');
    //       const data = await response.json();
    //       return data.fileName;
    //     } catch (error) {
    //       console.error('Error fetching latest image file name:', error);
    //       return null;
    //     }
    //   };
    // const downloadImageFile = async () => {
    //     try {
    //       const serverUrl = 'http://192.168.0.102:3000/model/conv/output.jpeg';
    //       const fileUri = FileSystem.documentDirectory + 'output.jpeg';
      
    //       const { uri } = await FileSystem.downloadAsync(serverUrl, fileUri);
    //       return uri;
    //     } catch (error) {
    //       console.error('Error downloading image file:', error);
    //       return null;
    //     }
    //   };
    //   const shareImageViaWhatsApp = async () => {
    //     try {
    //       const latestImageFileName = await getLatestImageFileName();
    //       if (latestImageFileName) {
    //         const fileUri = `http://192.168.0.102:3000/model/conv/${latestImageFileName}`;
    //         const whatsappUrl = `whatsapp://send?text=&image=${encodeURIComponent(fileUri)}`;
    //         await Linking.openURL(whatsappUrl);
    //       } else {
    //         console.error('Failed to get latest image file name');
    //       }
    //     } catch (error) {
    //       console.error('Error sharing image via WhatsApp:', error);
    //     }
    //   };
      
    //   const shareImageViaGmail = async () => {
    //     try {
    //       const latestImageFileName = await getLatestImageFileName();
    //       if (latestImageFileName) {
    //         const fileUri = `http://192.168.0.102:3000/model/conv/${latestImageFileName}`;
    //         const gmailUrl = `mailto:?subject=Image&body=&attachment=${encodeURIComponent(fileUri)}`;
    //         await Linking.openURL(gmailUrl);
    //       } else {
    //         console.error('Failed to get latest image file name');
    //       }
    //     } catch (error) {    console.error('Error sharing image via Gmail:', error);
    //     }
    //   };

return ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{image && <Image source={{ uri: image }} style={{ width: 350, height: 350 , top:60}} />}
<Button mode="contained" onPress={pickImage} style={ styles.button }>
    Pick Image
</Button>
<Button
    mode="contained"
    onPress={uploadImage}
    loading={uploading}
    disabled={!image}
    style={ styles.button  }
>
    Upload Image
</Button>
{uploading && <ActivityIndicator animating={true} />}
<Button mode="contained" onPress={navigateToResult} disabled={!image} style={styles.button}>
        Proceed
      </Button>
{/* <Button mode="contained" onPress={shareImageViaWhatsApp} disabled={!image} style={styles.button}>
  Share Image via WhatsApp
</Button>
<Button mode="contained" onPress={shareImageViaGmail} disabled={!image} style={styles.button}>
  Share Image via Gmail
</Button> */}
           <Image
               style={styles.Eclipses}
                         source={{
           uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/ta6zkaosab-28%3A483?alt=media&token=9321fce2-14cf-4e42-a5f0-7ad8ce5037ce",
          }}
         />
</View>
//             <Button
//                 mode="contained"
//                 // onPress={navigateToShare}
//                 style={styles.proceed}
//                 disabled={!image}
//             >
//                 Proceed
//             </Button>

     )
}

export default Home

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      button: {
        marginTop: 20,
        backgroundColor: '#4CCBBC',
        width: 200,
        height: 60,
        padding: 10,
       borderRadius: 100,
        top:50,
        fontSize:100,
        alignItems: "center",
    },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
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
}); 

