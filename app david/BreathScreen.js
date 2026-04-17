// src/screens/BreathScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, SafeAreaView, Dimensions,
} from 'react-native';
import { COLORS, RADIUS, FONTS } from '../theme';
import { BackButton, FadeIn } from '../components';

const { width } = Dimensions.get('window');
const SIZE = width * 0.6;

const CICLOS = [
  { fase: 'inhala', label: 'Inhala', duracion: 4000, color: '#7EC8D8', escala: 1.45 },
  { fase: 'sostén', label: 'Sostén',  duracion: 4000, color: '#FFD580', escala: 1.45 },
  { fase: 'exhala', label: 'Exhala', duracion: 4000, color: '#95E1C0', escala: 1.0  },
];

export default function BreathScreen({ navigation }) {
  const [activo, setActivo]       = useState(false);
  const [faseIdx, setFaseIdx]     = useState(0);
  const [contador, setContador]   = useState(4);
  const [ciclosCompletos, setCiclosCompletos] = useState(0);

  const scaleAnim   = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const glowAnim    = useRef(new Animated.Value(0)).current;

  const timerRef = useRef(null);
  const faseRef  = useRef(0);

  const limpiar = () => {
    clearTimeout(timerRef.current);
  };

  const ejecutarFase = (idx) => {
    faseRef.current = idx;
    const ciclo = CICLOS[idx];
    setFaseIdx(idx);
    setContador(4);

    // Animar círculo
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: ciclo.escala,
        duration: ciclo.duracion,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: ciclo.fase === 'exhala' ? 0.5 : 0.9,
        duration: ciclo.duracion,
        useNativeDriver: true,
      }),
    ]).start();

    // Countdown
    let c = 3;
    const tick = setInterval(() => {
      setContador(c);
      c--;
      if (c < 0) clearInterval(tick);
    }, 1000);

    timerRef.current = setTimeout(() => {
      const next = (idx + 1) % CICLOS.length;
      if (next === 0) setCiclosCompletos(prev => prev + 1);
      ejecutarFase(next);
    }, ciclo.duracion);
  };

  const iniciar = () => {
    setActivo(true);
    setCiclosCompletos(0);
    ejecutarFase(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  };

  const detener = () => {
    setActivo(false);
    limpiar();
    scaleAnim.setValue(1);
    opacityAnim.setValue(0.6);
    glowAnim.stopAnimation();
    glowAnim.setValue(0);
    setFaseIdx(0);
    setContador(4);
  };

  useEffect(() => () => limpiar(), []);

  const faseActual = CICLOS[faseIdx];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <BackButton onPress={() => { detener(); navigation.goBack(); }} light />

        <FadeIn>
          <Text style={styles.titulo}>Respiración 4-4-4</Text>
          <Text style={styles.subtitulo}>
            Sigue el ritmo del círculo para calmarte
          </Text>
        </FadeIn>

        {/* Círculo de respiración */}
        <View style={styles.circuloArea}>
          {/* Glow exterior */}
          <Animated.View
            style={[
              styles.circuloGlow,
              {
                opacity: glowAnim,
                backgroundColor: activo ? faseActual.color + '30' : 'transparent',
              },
            ]}
          />

          {/* Círculo animado */}
          <Animated.View
            style={[
              styles.circulo,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
                backgroundColor: activo ? faseActual.color + '55' : COLORS.primaryLight + '80',
                borderColor: activo ? faseActual.color : COLORS.primary + '40',
              },
            ]}
          />

          {/* Centro */}
          <View style={styles.circuloCentro}>
            {activo
              ? (
                <>
                  <Text style={[styles.contadorTexto, { color: faseActual.color }]}>
                    {contador}
                  </Text>
                  <Text style={styles.faseTexto}>{faseActual.label}</Text>
                </>
              )
              : (
                <Text style={styles.inicioTexto}>Listo{'\n'}para empezar</Text>
              )
            }
          </View>
        </View>

        {/* Instrucción */}
        {activo && (
          <FadeIn>
            <Text style={styles.instruccion}>
              {faseActual.fase === 'inhala' && 'Llena tus pulmones lentamente...'}
              {faseActual.fase === 'sostén' && 'Mantén el aire con suavidad...'}
              {faseActual.fase === 'exhala' && 'Suelta todo despacio...'}
            </Text>
          </FadeIn>
        )}

        {/* Ciclos completados */}
        {ciclosCompletos > 0 && (
          <View style={styles.ciclosBadge}>
            <Text style={styles.ciclosTexto}>✦ {ciclosCompletos} ciclos completados</Text>
          </View>
        )}

        {/* Botón */}
        <TouchableOpacity
          onPress={activo ? detener : iniciar}
          style={[styles.boton, activo && styles.botonDetener]}
          activeOpacity={0.85}
        >
          <Text style={styles.botonTexto}>
            {activo ? 'Detener' : '✦ Comenzar'}
          </Text>
        </TouchableOpacity>

        {/* Consejo */}
        <Text style={styles.consejo}>
          Este ejercicio activa tu sistema nervioso parasimpático{'\n'}
          y reduce la ansiedad en 2-3 minutos.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: COLORS.bgDark },
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },

  titulo:    { fontSize: 28, color: '#EEE', textAlign: 'center', ...FONTS.display, marginBottom: 4 },
  subtitulo: { fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', ...FONTS.caption, marginBottom: 30 },

  circuloArea: {
    width: SIZE + 80,
    height: SIZE + 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  circuloGlow: {
    position: 'absolute',
    width: SIZE + 80,
    height: SIZE + 80,
    borderRadius: (SIZE + 80) / 2,
  },
  circulo: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
  },
  circuloCentro: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contadorTexto: { fontSize: 56, fontWeight: '200', lineHeight: 64 },
  faseTexto:     { fontSize: 16, color: 'rgba(255,255,255,0.7)', ...FONTS.caption, letterSpacing: 2, textTransform: 'uppercase' },
  inicioTexto:   { fontSize: 16, color: 'rgba(255,255,255,0.5)', textAlign: 'center', ...FONTS.caption },

  instruccion: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 20,
    ...FONTS.body,
    fontStyle: 'italic',
  },

  ciclosBadge: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
  },
  ciclosTexto: { fontSize: 13, color: 'rgba(255,255,255,0.6)', ...FONTS.caption, letterSpacing: 1 },

  boton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 24,
  },
  botonDetener: { backgroundColor: 'rgba(255,255,255,0.15)' },
  botonTexto:   { color: '#fff', fontSize: 16, ...FONTS.bodyBold, letterSpacing: 0.5 },

  consejo: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    lineHeight: 18,
    ...FONTS.caption,
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 30,
  },
});
