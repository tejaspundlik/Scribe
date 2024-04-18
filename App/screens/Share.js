// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import * as Sharing from 'expo-sharing';

// const ShareTextPage = () => {
//   const [text, setText] = useState('');

//   const share = async () => {
//     try {
//       await Sharing.shareAsync(text, { dialogTitle: 'Share' });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to share via WhatsApp');
//       console.error(error);
//     }
//   };


//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: '80%' }}
//         placeholder="Enter text to share"
//         value={text}
//         onChangeText={setText}
//         multiline
//       />
//       <Button title="Share" onPress={share} />
      
//     </View>
//   );
// };

// export default ShareTextPage;
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions'; // Import for iOS permissions

const Share = () => {
  const [text, setText] = useState('');

  const handleShare = async () => {
    if (!text) {
      alert('Please enter some text to share.');
      return;
    }

    // Check permissions on iOS 14+
    if (Platform.OS === 'ios' && Platform.OSVersion >= 14) {
      console.log('Requesting media library permission on iOS 14+');
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Sharing requires media library permission.');
        return;
      }
    }

    try {
      console.log('Attempting to share...');
      const result = await Sharing.shareAsync(text, { dialogTitle: 'Share' });
      if (result.status === 'shared') {
        alert('Text shared successfully!');
      }
    } catch (error) {
      console.error('Sharing failed:', error.message);
      alert('Sharing failed with error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text to share..."
        multiline
        onChangeText={setText}
        value={text}
      />
      <Button title="Share" onPress={handleShare} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    top: 200,
  },
});

export default Share;



