// src/screens/ResponseScreen.js
// Pantalla genérica de respuesta/apoyo (puede usarse como destino de notificaciones)
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';
import { BackButton, PrimaryButton, FadeIn } from '../components';

export default function ResponseScreen({ navigation, route }) {
  const { mensaje, titulo } = route.params || {};

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton onPress={() => navigation.navigate('Home')} />

        <FadeIn>
          <Text style={styles.titulo}>{titulo || 'Un mensaje para ti'}</Text>
        </FadeIn>

        <FadeIn delay={100} style={styles.card}>
          <Text style={styles.emoji}>💙</Text>
          <Text style={styles.mensaje}>
            {mensaje || 'Estás haciendo lo mejor que puedes con lo que tienes. Eso siempre es suficiente.'}
          </Text>
        </FadeIn>

        <FadeIn delay={250}>
          <PrimaryButton
            label="Ir al inicio"
            onPress={() => navigation.navigate('Home')}
            style={{ marginTop: 24 }}
          />
        </FadeIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 24, paddingBottom: 60 },

  titulo: { fontSize: 28, color: COLORS.text, marginBottom: 24, ...FONTS.display },

  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: 28,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    ...SHADOW.soft,
    alignItems: 'flex-start',
  },
  emoji:   { fontSize: 32, marginBottom: 16 },
  mensaje: {
    fontSize: 18,
    color: COLORS.text,
    lineHeight: 30,
    ...FONTS.display,
    fontStyle: 'italic',
  },
});
