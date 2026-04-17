// src/screens/WriteScreen.js
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  ScrollView, KeyboardAvoidingView, Platform,
  SafeAreaView, TouchableOpacity, Animated,
} from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';
import { BackButton, PrimaryButton, FadeIn } from '../components';
import { getEmpathicResponse } from '../services/aiService';

const SUGERENCIAS = [
  "Hoy me siento ansioso/a porque...",
  "Lo que más me pesa ahora mismo es...",
  "Me cuesta aceptar que...",
  "Hoy necesito...",
];

export default function WriteScreen({ navigation }) {
  const [texto, setTexto]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [mostrarAd, setMostrarAd] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handleEnviar = async () => {
    if (!texto.trim() || loading) return;
    setLoading(true);
    setRespuesta('');

    const res = await getEmpathicResponse(texto);
    setRespuesta(res);
    setLoading(false);

    // Anuncio discreto post-acción
    setTimeout(() => setMostrarAd(true), 800);

    // Animación pulso en el corazón
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1,   duration: 200, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackButton onPress={() => navigation.goBack()} />

          <FadeIn delay={0}>
            <Text style={styles.titulo}>¿Cómo te sientes?</Text>
            <Text style={styles.subtitulo}>
              Este espacio es completamente tuyo.{'\n'}
              Escribe sin filtros, sin juicio.
            </Text>
          </FadeIn>

          {/* Sugerencias */}
          {!texto && (
            <FadeIn delay={100}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sugerenciasRow}>
                {SUGERENCIAS.map((s, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setTexto(s)}
                    style={styles.sugerenciaChip}
                  >
                    <Text style={styles.sugerenciaTexto}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </FadeIn>
          )}

          {/* Input */}
          <FadeIn delay={200}>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Aquí puedes escribir todo lo que necesites decir..."
                placeholderTextColor={COLORS.textMuted}
                value={texto}
                onChangeText={setTexto}
                textAlignVertical="top"
                autoCorrect={false}
              />
              <Text style={styles.charCount}>{texto.length} caracteres</Text>
            </View>
          </FadeIn>

          <PrimaryButton
            label={loading ? '' : '✦  Enviar y recibir apoyo'}
            loading={loading}
            onPress={handleEnviar}
            disabled={!texto.trim()}
            style={styles.btnEnviar}
          />

          {/* Respuesta de la IA */}
          {(respuesta || loading) && (
            <FadeIn delay={0} style={styles.respuestaWrap}>
              <View style={styles.respuestaHeader}>
                <Animated.Text style={[styles.luzEmoji, { transform: [{ scale: pulseAnim }] }]}>
                  💙
                </Animated.Text>
                <Text style={styles.luzNombre}>Luz te responde</Text>
              </View>
              {loading
                ? (
                  <View style={styles.loadingDots}>
                    <Text style={styles.dotsText}>Escuchando...</Text>
                  </View>
                )
                : (
                  <Text style={styles.respuestaTexto}>{respuesta}</Text>
                )
              }
            </FadeIn>
          )}

          {/* Anuncio discreto */}
          {mostrarAd && (
            <FadeIn delay={0} style={styles.adWrap}>
              <Text style={styles.adLabel}>Publicidad</Text>
              <Text style={styles.adTexto}>
                🌿 Este espacio gratuito es posible gracias a nuestros patrocinadores
              </Text>
            </FadeIn>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 22, paddingBottom: 60, paddingTop: 20 },

  titulo:    { fontSize: 30, color: COLORS.text, marginBottom: 8, ...FONTS.display },
  subtitulo: { fontSize: 14, color: COLORS.textSoft, lineHeight: 22, marginBottom: 22, ...FONTS.body },

  sugerenciasRow: { marginBottom: 16 },
  sugerenciaChip: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sugerenciaTexto: { fontSize: 12, color: COLORS.lavenderDark, ...FONTS.body },

  inputWrap: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 18,
    ...SHADOW.card,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  input: {
    fontSize: 16,
    color: COLORS.text,
    minHeight: 180,
    lineHeight: 26,
    ...FONTS.body,
  },
  charCount: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginTop: 8,
    ...FONTS.caption,
  },

  btnEnviar: { marginBottom: 24 },

  respuestaWrap: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 22,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    ...SHADOW.soft,
    marginBottom: 16,
  },
  respuestaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  luzEmoji:   { fontSize: 22, marginRight: 8 },
  luzNombre:  { fontSize: 13, color: COLORS.primary, ...FONTS.bodyBold, letterSpacing: 0.5 },
  respuestaTexto: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 28,
    ...FONTS.body,
    fontStyle: 'italic',
  },
  loadingDots: { alignItems: 'center', paddingVertical: 12 },
  dotsText:    { color: COLORS.textSoft, ...FONTS.body, fontSize: 14 },

  adWrap: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
});
