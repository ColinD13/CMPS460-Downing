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

      const json = await response.json();
      console.log(json);
      setCard(json);

      //call to my api to send a card to the seen cards table
      const senCardResponse = await fetch('http://10.0.2.2:3000/api/seenCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: json?.id,
          seen_card_name: json?.name,
          seen_card_image_url: json?.image_uris?.normal,
        }),
      });
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
      <View style={styles.cardContainer}>
        <Text style={styles.cardName}>{card.name}</Text>
        {card.image_uris?.normal && (
          <Image
            source={{ uri: card.image_uris.normal }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={notInterested}>
          <Text style={styles.buttonText}>Not Interested</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewCards')}>
          <Text style={styles.buttonText}>View Interested</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RandomCommanders')}>
          <Text style={styles.buttonText}>Get Random Commander</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewSeen')}>
          <Text style={styles.buttonText}>View All Seen Cards</Text>
        </TouchableOpacity>        
      </View>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },

  cardName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },

  cardImage: {
    width: 260,
    height: 360,
    borderRadius: 12,
  },

  buttonGroup: {
    width: '100%',
    gap: 10,
    marginBottom: 15,
  },

  primaryButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButton: {
    backgroundColor: '#e74c3c',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MainPage;
