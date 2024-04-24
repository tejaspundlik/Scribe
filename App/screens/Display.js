import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing"; // Import Sharing module

const Display = ({ navigation }) => {
  const [documentData, setDocumentData] = useState([]);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.223:3000/document/get",
        {
          email: userEmail,
        }
      );

      setDocumentData(response.data.document);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const generateAndSharePdf = async (content) => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `<html><body><p>${content}</p></body></html>`,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share PDF",
      });
    } catch (error) {
      console.error("Error generating and sharing PDF:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {documentData.map((item, index) => (
        <View key={index}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardText}>{item.trim()}</Text>
            </Card.Content>
          </Card>
          <TouchableOpacity onPress={() => generateAndSharePdf(item)}>
            <View style={styles.buttonContainer}>
              <Button mode="contained">Download as PDF</Button>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
    width: "90%",
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default Display;
