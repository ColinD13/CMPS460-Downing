import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

function ViewCards() {
  const navigation = useNavigation<any>();
  const [cards, setCards] = useState<Card[]>([]);

  type Card = {
    id: string;
    card_name: string;
    card_image_url?: string;
  };

  //functions
  const displayInterestedCards = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/cards');
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  //call when page opened
  useEffect(() => {
    displayInterestedCards();
  }, []);

  const renderCards = ({ item }: { item: Card }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardName}>{item.card_name}</Text>
      {item.card_image_url && (
        <Image
          source={{ uri: item.card_image_url }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}
    </View>
  );

  //return HTML
  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={renderCards}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cardContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardImage: {
    width: 200,
    height: 300,
  },
});

export default ViewCards;
