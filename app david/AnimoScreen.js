// src/screens/AnimoScreen.js
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Dimensions, SafeAreaView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';
import { BackButton, FadeIn } from '../components';
import { FRASES_ANIMO } from '../data/content';

const { width } = Dimensions.get('window');

export default function AnimoScreen({ navigation }) {
  const [activo, setActivo]     = useState(null);
  const [mostrarAd, setMostrarAd] = useState(false);
  const scales = useRef(FRASES_ANIMO.map(() => new Animated.Value(1))).current;

  const CARD_COLORS = [
    COLORS.primaryLight,
    COLORS.lavenderLight,
    COLORS.peachLight,
    '#D8F5E8',
    '#FFF3D6',
    COLORS.primaryLight,
    COLORS.lavenderLight,
    COLORS.peachLight,
  ];

  const handlePress = (i) => {
    setActivo(activo === i ? null : i);
    if (activo !== i) {
      setTimeout(() => setMostrarAd(true), 600);
      Animated.sequence([
        Animated.timing(scales[i], { toValue: 0.96, duration: 100, useNativeDriver: true }),
        Animated.timing(scales[i], { toValue: 1,    duration: 100, useNativeDriver: true }),
      ]).start();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <BackButton onPress={() => navigation.goBack()} />

        <FadeIn>
          <Text style={styles.titulo}>Una palabra de ánimo</Text>
          <Text style={styles.subtitulo}>
            Toca cualquier tarjeta para expandirla{'\n'}y recibir el mensaje completo.
          </Text>
        </FadeIn>

        <View style={styles.grid}>
          {FRASES_ANIMO.map((f, i) => (
            <FadeIn key={i} delay={i * 60} style={styles.gridItem}>
              <Animated.View style={{ transform: [{ scale: scales[i] }] }}>
                <TouchableOpacity
                  onPress={() => handlePress(i)}
                  style={[
                    styles.card,
                    { backgroundColor: CARD_COLORS[i % CARD_COLORS.length] },
                    activo === i && styles.cardActiva,
                  ]}
                  activeOpacity={0.9}
                >
                  <Text style={styles.cardEmoji}>{f.emoji}</Text>
                  <Text style={styles.cardTitulo}>{f.titulo}</Text>
                  {activo === i && (
                    <FadeIn>
                      <Text style={styles.cardTexto}>{f.texto}</Text>
                    </FadeIn>
                  )}
                  {activo !== i && (
                    <Text style={styles.cardHint}>Toca para leer ↓</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </FadeIn>
          ))}
        </View>

        {/* Anuncio post-acción */}
        {mostrarAd && (
          <FadeIn style={styles.adWrap}>
            <Text style={styles.adLabel}>Publicidad</Text>
            <Text style={styles.adTexto}>
              💙 Luz Adentro es gratis gracias a nuestros patrocinadores
            </Text>
          </FadeIn>
        )}

        {/* Frase extra al final */}
        <FadeIn delay={600}>
          <View style={styles.cierreCard}>
            <Text style={styles.cierreEmoji}>🌟</Text>
            <Text style={styles.cierreTexto}>
              Mereces ser tratado/a con la misma gentileza{'\n'}
              que le darías a alguien que amas.
            </Text>
          </View>
        </FadeIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 22, paddingBottom: 50, paddingTop: 20 },

  titulo:    { fontSize: 30, color: COLORS.text, marginBottom: 8, ...FONTS.display },
  subtitulo: { fontSize: 14, color: COLORS.textSoft, lineHeight: 22, marginBottom: 28, ...FONTS.body },

  grid:     { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '48%', marginBottom: 14 },

  card: {
    borderRadius: RADIUS.lg,
    padding: 18,
    minHeight: 130,
    justifyContent: 'flex-start',
    ...SHADOW.card,
  },
  cardActiva: {
    minHeight: 200,
    ...SHADOW.soft,
  },
  cardEmoji:  { fontSize: 28, marginBottom: 10 },
  cardTitulo: { fontSize: 15, color: COLORS.text, lineHeight: 20, ...FONTS.bodyBold },
  cardTexto: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginTop: 10,
    ...FONTS.body,
  },
  cardHint: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 8,
    ...FONTS.caption,
  },

  adWrap: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 20,
  },
  adLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    ...FONTS.caption,
  },
  adTexto: { fontSize: 12, color: COLORS.textSoft, textAlign: 'center', ...FONTS.body },

  cierreCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 22,
    alignItems: 'center',
    ...SHADOW.card,
    marginTop: 8,
  },
  cierreEmoji: { fontSize: 32, marginBottom: 12 },
  cierreTexto: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 26,
    ...FONTS.display,
    fontStyle: 'italic',
  },
});
