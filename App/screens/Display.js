import React, { useState, useEffect , useContext} from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-paper'; // Adjusted import statement
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const Display = ({ navigation }) => {
  const [documentData, setDocumentData] = useState([]);
  const {userEmail} = useContext(AuthContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://mp-hosted-backend.onrender.com/document/get',{email:userEmail});
      setDocumentData(response.data.document);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {documentData.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Text style={styles.cardText}>{item.trim()}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default Display;
