import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { character } = route.params;

  const infos = [
    { label: '👾 Monstro', value: character.monster },
    { label: '⏳ Idade', value: character.age },
    { label: '🎨 Cor / Estilo', value: character.color },
    { label: '✨ Características', value: character.traits },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A12" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: character.cardColor }]}>
          <Image style={styles.heroImage} source={character.foto} />
          <Text style={styles.heroName}>{character.name}</Text>
          <Text style={styles.heroMonster}>{character.monster}</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>💀 Ficha da Personagem</Text>

          {infos.map((info, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ))}
        </View>

        {/* Back button bottom */}
        <TouchableOpacity style={styles.bottomBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.bottomBtnText}>🏠 Voltar para Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#8B1A4A',
  },
  header: {
    backgroundColor: '#1A0A12',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
  },
  backBtn: {
    backgroundColor: '#5C0F30',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  backText: {
    color: '#FF69B4',
    fontWeight: 'bold',
    fontSize: 13,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  content: {
    paddingBottom: 40,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroImage: {
    width: 150,
    height: 150,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  heroName: {
    color: '#FFD6EC',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroMonster: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    marginTop: 4,
  },

  // Info
  infoSection: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    color: '#FF69B4',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  infoRow: {
    backgroundColor: '#5C0F30',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,105,180,0.25)',
  },
  infoLabel: {
    color: '#FF69B4',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: '#FFD6EC',
    fontSize: 15,
    fontWeight: '500',
  },

  // Bottom button
  bottomBtn: {
    backgroundColor: '#FF69B4',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  bottomBtnText: {
    color: '#1A0A12',
    fontWeight: 'bold',
    fontSize: 15,
  },
});