import React, { useState } from 'react';
import {
  View,
 Image, 
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { characters as initialData } from './data/characters';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

// ─── COMPONENTE: Header ───────────────────────────────────────────────────────
function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.skull}>💀</Text>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

// ─── COMPONENTE: CharacterCard ────────────────────────────────────────────────
function CharacterCard({ item, onPress }) {
  return (
    <View style={[styles.card, { backgroundColor: item.cardColor }]}>
      <Image style={styles.cardEmoji} source={item.foto} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardSub}>{item.monster}</Text>
      <Text style={styles.cardSub}>🎨 {item.color}</Text>

      <TouchableOpacity style={styles.detailBtn} onPress={() => onPress(item)}>
        <Text style={styles.detailBtnText}>Mais detalhes +</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── TELA HOME ────────────────────────────────────────────────────────────────
function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [characters] = useState(initialData);

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <CharacterCard
            item={item}
            onPress={(character) =>
              navigation.navigate('Detail', { character })
            }
          />
        )}
        contentContainerStyle={styles.grid}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum monster encontrado 👻</Text>
        }
      />
    </SafeAreaView>
  );
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#8B1A4A',
  },
  header: {
    backgroundColor: '#1A0A12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
  },
  skull: { fontSize: 22, marginHorizontal: 10 },
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
  searchIcon: { fontSize: 16, marginRight: 8 },
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
  cardEmoji: { width: 120, height: 120, marginBottom: 8, resizeMode: 'contain' },
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
  detailBtn: {
    marginTop: 12,
    backgroundColor: '#FF69B4',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  detailBtnText: {
    color: '#1A0A12',
    fontWeight: 'bold',
    fontSize: 11,
  },
  empty: {
    color: '#FF69B4',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});