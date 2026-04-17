// src/screens/HomeScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Dimensions, SafeAreaView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';
import { FRASES_DIARIAS } from '../data/content';
import { FadeIn } from '../components';

const { width } = Dimensions.get('window');

const ACCIONES = [
  {
    id: 'write',
    emoji: '✍️',
    label: 'Escribir cómo\nme siento',
    sub: 'Un espacio solo tuyo',
    color: COLORS.primary,
    light: COLORS.primaryLight,
    screen: 'Write',
  },
  {
    id: 'animo',
    emoji: '💛',
    label: 'Necesito una\npalabra de ánimo',
    sub: 'Frases que abrazan',
    color: COLORS.lavenderDark,
    light: COLORS.lavenderLight,
    screen: 'Animo',
  },
  {
    id: 'videos',
    emoji: '🎬',
    label: 'Ver un mensaje\nque me ayude',
    sub: 'Videos motivacionales',
    color: COLORS.peach,
    light: COLORS.peachLight,
    screen: 'Videos',
  },
];

export default function HomeScreen({ navigation }) {
  const [frase, setFrase] = useState('');
  const [hora, setHora]   = useState('');
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const idx = Math.floor(Math.random() * FRASES_DIARIAS.length);
    setFrase(FRASES_DIARIAS[idx]);

    const h = new Date().getHours();
    if (h < 12) setHora('Buenos días');
    else if (h < 18) setHora('Buenas tardes');
    else setHora('Buenas noches');

    // Animación flotante suave para la tarjeta de frase
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -6, duration: 2800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue:  0, duration: 2800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <FadeIn delay={0}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.greeting}>{hora} ✨</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Breath')}
                style={styles.breathBtn}
              >
                <Text style={styles.breathEmoji}>🌬️</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.appName}>Luz Adentro</Text>
            <Text style={styles.tagline}>Nunca estás solo/a</Text>
          </View>
        </FadeIn>

        {/* Tarjeta de frase diaria */}
        <FadeIn delay={150}>
          <Animated.View
            style={[styles.fraseCard, { transform: [{ translateY: floatAnim }] }]}
          >
            <View style={styles.fraseDecoLeft} />
            <Text style={styles.fraseEmoji}>🌸</Text>
            <Text style={styles.fraseTexto}>{frase}</Text>
            <Text style={styles.fraseAtrib}>— Para ti, hoy</Text>
          </Animated.View>
        </FadeIn>

        {/* Sección de acciones */}
        <FadeIn delay={300}>
          <Text style={styles.seccionLabel}>¿Qué necesitas ahora?</Text>
        </FadeIn>

        {ACCIONES.map((a, i) => (
          <FadeIn key={a.id} delay={380 + i * 80}>
            <TouchableOpacity
              onPress={() => navigation.navigate(a.screen)}
              style={[styles.accionCard, { borderLeftColor: a.color }]}
              activeOpacity={0.85}
            >
              <View style={[styles.accionIconWrap, { backgroundColor: a.light }]}>
                <Text style={styles.accionEmoji}>{a.emoji}</Text>
              </View>
              <View style={styles.accionTextos}>
                <Text style={styles.accionLabel}>{a.label}</Text>
                <Text style={styles.accionSub}>{a.sub}</Text>
              </View>
              <Text style={[styles.accionArrow, { color: a.color }]}>→</Text>
            </TouchableOpacity>
          </FadeIn>
        ))}

        {/* Footer cálido */}
        <FadeIn delay={700}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Este es un espacio seguro para ti.{'\n'}
              Aquí no hay juicios, solo apoyo. 💙
            </Text>
          </View>
        </FadeIn>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 22, paddingBottom: 40, paddingTop: 16 },

  // Header
  header:    { marginBottom: 28 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  greeting:  { fontSize: 14, color: COLORS.textSoft, ...FONTS.body },
  breathBtn: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.full,
    padding: 10,
    ...SHADOW.card,
  },
  breathEmoji: { fontSize: 20 },
  appName:  { fontSize: 38, color: COLORS.text, lineHeight: 44, ...FONTS.display },
  tagline:  { fontSize: 14, color: COLORS.lavenderDark, marginTop: 4, ...FONTS.caption, letterSpacing: 1 },

  // Frase card
  fraseCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.xl,
    padding: 28,
    marginBottom: 32,
    overflow: 'hidden',
    ...SHADOW.glow,
  },
  fraseDecoLeft: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 5,
    backgroundColor: COLORS.lavender,
    borderTopLeftRadius: RADIUS.xl,
    borderBottomLeftRadius: RADIUS.xl,
  },
  fraseEmoji: { fontSize: 28, marginBottom: 12 },
  fraseTexto: {
    fontSize: 20,
    color: COLORS.text,
    lineHeight: 32,
    ...FONTS.display,
  },
  fraseAtrib: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 16,
    textAlign: 'right',
    ...FONTS.caption,
    fontStyle: 'italic',
  },

  // Sección
  seccionLabel: {
    fontSize: 13,
    color: COLORS.textSoft,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 14,
    ...FONTS.caption,
  },

  // Acción cards
  accionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    ...SHADOW.card,
  },
  accionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  accionEmoji:  { fontSize: 24 },
  accionTextos: { flex: 1 },
  accionLabel:  { fontSize: 16, color: COLORS.text, lineHeight: 22, ...FONTS.bodyBold },
  accionSub:    { fontSize: 12, color: COLORS.textSoft, marginTop: 2, ...FONTS.caption },
  accionArrow:  { fontSize: 20, fontWeight: '300' },

  // Footer
  footer: {
    marginTop: 8,
    padding: 20,
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.lavenderDark,
    textAlign: 'center',
    lineHeight: 22,
    ...FONTS.body,
  },
});
