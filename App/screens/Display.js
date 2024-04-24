import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, Button } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const Display = ({ navigation }) => {
  const [documentData, setDocumentData] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { userEmail } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}:3000/document/get`,
          {
            email: userEmail,
          }
        );

        if (response.status === 205) {
          setDocumentData([]);
        } else {
          setDocumentData(response.data.document || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

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
      {isInitialLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : documentData.length > 0 ? (
        documentData.map((item, index) => (
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
        ))
      ) : (
        <Text style={styles.noFilesText}>No files scanned yet</Text>
      )}
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
  noFilesText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Display;
