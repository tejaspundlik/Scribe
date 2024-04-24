import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Portal, Provider, IconButton } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const Display = ({ navigation }) => {
  const [documentData, setDocumentData] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
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

  const handleTextPress = (text) => {
    setSelectedText(text);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedText("");
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        {isInitialLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : documentData.length > 0 ? (
          documentData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTextPress(item.trim())}
            >
              <Card style={styles.outerCard}>
                <Card.Content>
                  <Text style={styles.cardText}>{item.trim()}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noFilesText}>No files scanned yet</Text>
        )}
      </ScrollView>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={handleModalClose}
          contentContainerStyle={styles.modalContentContainer}
        >
          <View style={styles.modalContainer}>
            <IconButton
              icon="close"
              size={30}
              color="gray"
              style={styles.closeButton}
              onPress={handleModalClose}
            />
            <Text style={styles.modalText}>{selectedText}</Text>
            <Button
              mode="contained"
              onPress={() => generateAndSharePdf(selectedText)}
              style={styles.modalButton}
            >
              Download as PDF
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  outerCard: {
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
  modalContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    marginTop: 200,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Display;
