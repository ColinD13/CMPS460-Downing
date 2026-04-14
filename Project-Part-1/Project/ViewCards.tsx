import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

function ViewCards() {
  const navigation = useNavigation<any>();
  const [cards, setCards] = useState<Card[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  //call when page opened
  useEffect(() => {
    displayInterestedCards();
  }, []);

  //render the cards from the array of cards
  const renderCards = ({ item }: { item: Card }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardName}>{item.card_name}</Text>

      {item.card_image_url && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CardImage', {
              imageUrl: item.card_image_url,
            });
          }}
        >
          <Image
            source={{ uri: item.card_image_url }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );

  //filter the cards
  const filteredCards = cards.filter(card =>
    card.card_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return <Text>Loading cards...</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search cards..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />

        <FlatList
          data={filteredCards}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCards}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </KeyboardAvoidingView>
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ViewCards;
