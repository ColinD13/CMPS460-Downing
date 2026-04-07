import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RandomCommanders() {
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

  const getRandomCommander = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random?q=is%3Acommander', {
        headers: {
          'User-Agent': 'MyReactNativeApp (hockeydowning13@gmail.com)',
          Accept: 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      setCard(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCommander = async () => {
    try {
      console.log('Handle Add Card');
      const response = await fetch('http://10.0.2.2:3000/api/commanders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: card?.id,
          commander_name: card?.name,
          commander_image_url: card?.image_uris?.normal,
        }),
      });

      console.log('Card ID' + card?.id);
      console.log('Card Name' + card?.name);
      console.log('Card URL' + card?.image_uris?.normal);

      const data = await response.json();
      console.log('Added card:', data);
      await getRandomCommander();
    } catch (err) {
      console.error('Error adding card:', err);
    }
  };

  const notInterested = async () => {
    await getRandomCommander();
  };

  //runs when the page is loaded
  useEffect(() => {
    getRandomCommander();
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

      <TouchableOpacity style={styles.button} onPress={handleAddCommander}>
        <Text style={styles.buttonText}>Interested</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={notInterested}>
        <Text style={styles.buttonText}>Not Interested</Text>
      </TouchableOpacity>

      <Button
        title="View Interested"
        onPress={() => navigation.navigate('ViewCommanders')}
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

export default RandomCommanders;
