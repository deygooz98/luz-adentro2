// src/screens/VideosScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Linking, SafeAreaView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';
import { BackButton, FadeIn } from '../components';
import { VIDEOS_MOTIVACIONALES } from '../data/content';

export default function VideosScreen({ navigation }) {
  const [visto, setVisto]     = useState(null);
  const [mostrarAd, setMostrarAd] = useState(false);

  const abrirVideo = async (video) => {
    setVisto(video.id);
    setMostrarAd(true);
    try {
      await Linking.openURL(video.url);
    } catch (e) {
      console.warn('No se pudo abrir el video:', e);
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
          <Text style={styles.titulo}>Mensajes que ayudan</Text>
          <Text style={styles.subtitulo}>
            Videos cortos seleccionados para acompañarte{'\n'}
            en los momentos que más los necesitas.
          </Text>
        </FadeIn>

        {VIDEOS_MOTIVACIONALES.map((v, i) => (
          <FadeIn key={v.id} delay={i * 80}>
            <TouchableOpacity
              onPress={() => abrirVideo(v)}
              style={[styles.videoCard, visto === v.id && styles.videoCardVisto]}
              activeOpacity={0.85}
            >
              <View style={[styles.thumbnailWrap, { backgroundColor: v.color }]}>
                <Text style={styles.thumbnailEmoji}>{v.emoji}</Text>
                <View style={styles.playBtn}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitulo}>{v.titulo}</Text>
                <Text style={styles.videoDesc}>{v.descripcion}</Text>
                <View style={styles.videoMeta}>
                  <Text style={styles.videoDuracion}>⏱ {v.duracion}</Text>
                  {visto === v.id && (
                    <Text style={styles.videoVisto}>✓ Visto</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </FadeIn>
        ))}

        {/* Anuncio discreto post-acción */}
        {mostrarAd && (
          <FadeIn style={styles.adWrap}>
            <Text style={styles.adLabel}>Publicidad</Text>
            <Text style={styles.adTexto}>
              🎬 Contenido gratuito gracias a nuestros patrocinadores
            </Text>
          </FadeIn>
        )}

        <FadeIn delay={600}>
          <View style={styles.notaWrap}>
            <Text style={styles.notaTexto}>
              💡 Los videos se abren en YouTube.{'\n'}
              Recuerda: puedes pausar y regresar cuando necesites.
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

  videoCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    marginBottom: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    ...SHADOW.card,
  },
  videoCardVisto: {
    borderWidth: 2,
    borderColor: COLORS.success,
  },

  thumbnailWrap: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 100,
  },
  thumbnailEmoji: { fontSize: 36 },
  playBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: RADIUS.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { fontSize: 12, color: '#fff', marginLeft: 2 },

  videoInfo:   { flex: 1, padding: 16, justifyContent: 'center' },
  videoTitulo: { fontSize: 15, color: COLORS.text, marginBottom: 4, ...FONTS.bodyBold },
  videoDesc:   { fontSize: 12, color: COLORS.textSoft, marginBottom: 8, ...FONTS.body },
  videoMeta:   { flexDirection: 'row', alignItems: 'center', gap: 12 },
  videoDuracion: { fontSize: 11, color: COLORS.textMuted, ...FONTS.caption },
  videoVisto:  { fontSize: 11, color: COLORS.success, ...FONTS.bodyBold },

  adWrap: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 16,
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

  notaWrap: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    padding: 16,
    marginTop: 4,
  },
  notaTexto: {
    fontSize: 13,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 20,
    ...FONTS.body,
  },
});
