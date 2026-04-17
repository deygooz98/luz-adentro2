# 🌟 Luz Adentro v2.0 — App de Bienestar Emocional

Aplicación móvil de acompañamiento emocional con **IA empática**, construida con React Native + Expo.

---

## 📁 Estructura del proyecto

```
luz-adentro/
├── App.js                          ← Entrada + navegación
├── package.json
├── app.json
└── src/
    ├── theme/
    │   └── index.js                ← Colores, fuentes, sombras
    ├── data/
    │   └── content.js              ← Frases, videos, recursos de crisis
    ├── services/
    │   └── aiService.js            ← Integración con Claude AI
    ├── components/
    │   └── index.js                ← BackButton, PrimaryButton, Card, FadeIn, AdBanner
    └── screens/
        ├── HomeScreen.js           ← Pantalla principal con frase diaria
        ├── WriteScreen.js          ← Diario + respuesta empática IA
        ├── AnimoScreen.js          ← Tarjetas de motivación
        ├── VideosScreen.js         ← Videos motivacionales
        ├── BreathScreen.js         ← Respiración guiada 4-4-4
        └── ResponseScreen.js       ← Pantalla genérica de respuesta
```

---

## 🚀 Instalación y ejecución

### 1. Prerequisitos
- Node.js 18+ → https://nodejs.org
- Expo CLI: `npm install -g @expo/cli`

### 2. Instalar dependencias
```bash
cd luz-adentro
npm install
```

### 3. Ejecutar
```bash
npx expo start
```
- Presiona **`w`** para ver en el navegador
- Escanea el QR con **Expo Go** (App Store / Google Play) para verla en tu teléfono

---

## 🤖 Configurar la IA (Claude)

La app usa Claude para generar respuestas empáticas en `WriteScreen`.

1. Crea una cuenta en https://console.anthropic.com
2. Genera una API Key
3. En `src/services/aiService.js`, la API Key ya está configurada para usarse con el proxy de Expo.

> ⚠️ Para producción, **nunca pongas la API key en el cliente**. Usa un backend propio (Node.js/Express) que reciba los mensajes y llame a Claude de forma segura.

---

## 📱 Pantallas

| Pantalla | Descripción |
|---|---|
| **HomeScreen** | Frase diaria animada + 3 accesos principales + botón de respiración |
| **WriteScreen** | Diario privado con chips de sugerencia + respuesta empática de IA |
| **AnimoScreen** | Grid de tarjetas motivacionales expandibles |
| **VideosScreen** | Lista de videos motivacionales (abre YouTube) |
| **BreathScreen** | Ejercicio animado de respiración 4-4-4 con círculo pulsante |
| **ResponseScreen** | Pantalla genérica de mensaje de apoyo |

---

## 🎨 Diseño

- **Paleta**: Azul pizarra suave + lavanda + blanco crema + melocotón
- **Tipografía**: Serif para títulos/frases (calidez), sans-serif para UI
- **Animaciones**: FadeIn escalonado, círculo de respiración, botones con spring
- **Anuncios**: Solo después de completar una acción, discretos y no intrusivos

---

## 📦 Generar APK para Android

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

---

## 🔧 Personalizar

### Cambiar colores
Edita `src/theme/index.js` → `COLORS`

### Agregar frases
Edita `src/data/content.js` → `FRASES_DIARIAS` o `FRASES_ANIMO`

### Cambiar recursos de crisis
Edita `src/data/content.js` → `RECURSOS_CRISIS` con los números de tu país

### Cambiar el tono de la IA
Edita el `SYSTEM_PROMPT` en `src/services/aiService.js`

---

## ⚠️ Aviso importante

Esta app es de **apoyo emocional**, no de terapia. Asegúrate de:
- Incluir los números de crisis correctos para tu país
- Tener una política de privacidad antes de publicar
- No hacer afirmaciones terapéuticas en la descripción de la app
