import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MainPage() {
  const navigation = useNavigation<any>();

  const [card, setCard] = useState<Card | null>(null);

  ///define card type
  type Card = {
    id: string;
    name: string;
    image_uris?: {
      normal?: string;
    };
  };

  //functions

  const getRandomCard = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random', {
        headers: {
          'User-Agent': 'MyReactNativeApp (hockeydowning13@gmail.com)',
          Accept: 'application/json',
        },
      });

      //call to my api to send a card to the seen cards table
      const senCardResponse = await fetch('http://10.0.2.2:3000/api/seenCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: card?.id,
          seen_card_name: card?.name,
          seen_card_image_url: card?.image_uris?.normal,
        }),
      });

      const json = await response.json();
      console.log(json);
      setCard(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCard = async () => {
    try {
      console.log('Handle Add Card');
      //call to the scryfall API
      const response = await fetch('http://10.0.2.2:3000/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: card?.id,
          card_name: card?.name,
          card_image_url: card?.image_uris?.normal,
        }),
      });

      console.log('Card ID' + card?.id);
      console.log('Card Name' + card?.name);
      console.log('Card URL' + card?.image_uris?.normal);

      const data = await response.json();
      console.log('Added card:', data);
      await getRandomCard();
    } catch (err) {
      console.error('Error adding card:', err);
    }
  };

  const notInterested = async () => {
    await getRandomCard();
  };

  //runs when the page is loaded
  useEffect(() => {
    getRandomCard();
  }, []);

  //runs when card is not retrieved yet
  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Loading card...</Text>
      </View>
    );
  }

  //return HTML
  return (
    <View style={styles.container}>
      <Text style={styles.cardName}>{card.name}</Text>
      {card.image_uris?.normal && (
        <Image
          source={{ uri: card.image_uris.normal }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddCard}>
        <Text style={styles.buttonText}>Interested</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={notInterested}>
        <Text style={styles.buttonText}>Not Interested</Text>
      </TouchableOpacity>

      <Button
        title="View Interested"
        onPress={() => navigation.navigate('ViewCards')}
      />

      <Button
        title="Get Random Commander"
        onPress={() => navigation.navigate('RandomCommanders')}
      />

      <Button
        title="View All Seen Cards"
        onPress={() => navigation.navigate('ViewSeen')}
      />
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardImage: {
    width: 250,
    height: 350,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainPage;
