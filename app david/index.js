// src/components/index.js
// Componentes reutilizables de UI

import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SHADOW, FONTS } from '../theme';

// ── BackButton ────────────────────────────────────────────────────────────────
export function BackButton({ onPress, light = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={[styles.backArrow, light && { color: 'rgba(255,255,255,0.8)' }]}>←</Text>
      <Text style={[styles.backText, light && { color: 'rgba(255,255,255,0.8)' }]}>Volver</Text>
    </TouchableOpacity>
  );
}

// ── PrimaryButton ─────────────────────────────────────────────────────────────
export function PrimaryButton({ label, onPress, disabled, loading, color, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const bg = color || COLORS.primary;

  const press = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start();
    onPress && onPress();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={press}
        disabled={disabled || loading}
        style={[styles.primaryBtn, { backgroundColor: bg }, (disabled || loading) && { opacity: 0.5 }]}
        activeOpacity={0.85}
      >
        {loading
          ? <ActivityIndicator color="#fff" size="small" />
          : <Text style={styles.primaryBtnText}>{label}</Text>
        }
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

// ── FadeIn wrapper ────────────────────────────────────────────────────────────
export function FadeIn({ children, delay = 0, style }) {
  const opacity   = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity,    { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

// ── AdBanner (simulado, discreto) ────────────────────────────────────────────
export function AdBanner() {
  return (
    <View style={styles.adBanner}>
      <Text style={styles.adLabel}>Publicidad</Text>
      <Text style={styles.adText}>Este espacio gratuito es posible gracias a nuestros patrocinadores 💙</Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 4,
  },
  backArrow: { fontSize: 18, color: COLORS.primary, marginRight: 6 },
  backText:  { fontSize: 15, color: COLORS.primary, ...FONTS.body },

  primaryBtn: {
    borderRadius: RADIUS.full,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    ...SHADOW.soft,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    letterSpacing: 0.5,
    ...FONTS.bodyBold,
  },

  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    padding: 22,
    ...SHADOW.card,
  },

  adBanner: {
    backgroundColor: COLORS.lavenderLight,
    borderRadius: RADIUS.md,
    padding: 14,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  adLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    ...FONTS.caption,
  },
  adText: {
    fontSize: 13,
    color: COLORS.textSoft,
    textAlign: 'center',
    ...FONTS.body,
  },
});
