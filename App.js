import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { characters as initialData } from './data/characters.js';

function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.skull}>💀</Text>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function CharacterCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.cardColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.monster}</Text>
      <Text style={styles.cardSub}>🎨 {item.color}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState(initialData);

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardPress = (character) => {
    Alert.alert(
      `${character.emoji} ${character.name}`,
      `Monstro: ${character.monster}\nIdade: ${character.age}\nEstilo: ${character.color}\n\n✨ ${character.traits}`,
      [
        { text: 'Fechar', style: 'cancel' },
        {
          text: '🗑 Remover',
          style: 'destructive',
          onPress: () =>
            setCharacters((prev) => prev.filter((c) => c.id !== character.id)),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A12" />
      <Header title="Monster Guide" />

      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar monster..."
          placeholderTextColor="#AA6688"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CharacterCard item={item} onPress={handleCardPress} />
        )}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum monster encontrado 👻</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0e0d0d',
  },

  // Header
  header: {
    backgroundColor: '#c50364',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
  },
  skull: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    backgroundColor: '#5C0F30',
    borderRadius: 30,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    fontSize: 14,
  },

  grid: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  cardEmoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  cardName: {
    color: '#FFD6EC',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },

  // Empty
  empty: {
    color: '#FF69B4',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});