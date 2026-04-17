// src/services/aiService.js
// Llama a la API de Claude para respuestas empáticas

const SYSTEM_PROMPT = `Eres "Luz", un acompañante emocional cálido, empático y compasivo dentro de la app "Luz Adentro". 
Tu rol es brindar apoyo emocional genuino, NO terapia clínica.

Reglas estrictas:
- Responde SIEMPRE en español, con un tono cálido como un amigo cercano que escucha de verdad
- Nunca uses lenguaje clínico, diagnósticos ni tecnicismos
- Valida primero las emociones antes de ofrecer perspectiva
- Mantén respuestas entre 3-5 oraciones: concisas pero profundas
- Termina siempre con una pregunta suave o una frase que invite a continuar
- Si detectas señales de crisis severa (menciones de hacerse daño), incluye al final: "Recuerda que puedes llamar a una línea de apoyo. En México: 800-290-0024"
- Nunca digas que eres una IA. Eres "Luz", un amigo que acompaña.
- Usa metáforas naturales (agua, luz, jardín, estaciones) cuando sea apropiado
- Evita frases vacías como "entiendo cómo te sientes" — sé específico con lo que el usuario dijo`;

export async function getEmpathicResponse(userMessage) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;

  } catch (error) {
    console.error('AI Service error:', error);
    // Respuesta de fallback empática
    return "Gracias por compartir eso conmigo. Lo que sientes tiene sentido, y es valioso que lo hayas puesto en palabras. A veces el solo hecho de escribirlo ya aligera un poco el peso. ¿Hay algo específico de lo que escribiste que quieras explorar más?";
  }
}
