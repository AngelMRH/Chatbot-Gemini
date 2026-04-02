🔧 1. Requisitos Previos

Antes de la instalación, agrega esto:

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js 18 o superior
- npm o yarn
- Cuenta en Google AI Studio
- Proyecto en Firebase (si usas Genkit con Firebase)
   2. Configuración Completa de la IA (Muy Importante)

No solo pongas la variable. Explica cómo obtenerla:

##  Configuración de Google Gemini API

1. Ve a https://aistudio.google.com/
2. Crea una API Key.
3. Copia la clave generada.
4. Crea un archivo `.env.local` en la raíz del proyecto.
5. Agrega:

GOOGLE_GENAI_API_KEY=tu_api_key_aqui

 3. Cómo Funciona la Arquitectura

Esto le da mucho nivel profesional:

##  Arquitectura del Proyecto

- `app/` → Rutas y vistas principales (App Router)
- `components/` → Componentes reutilizables (UI + Chatbot)
- `lib/ai/` → Configuración de Genkit y prompts
- `data/` → Catálogo interno de smartphones
- `utils/` → Funciones auxiliares (cálculo de descuentos, etc.)
   4. Ejemplo de Flujo de IA

Esto es clave para que sepan cómo implementarlo:

##  Flujo de Recomendación IA

1. El usuario describe sus necesidades.
2. El sistema analiza el catálogo interno.
3. Se priorizan dispositivos con:
   - Mejor rendimiento
   - Mejor relación calidad-precio
   - Ofertas activas
4. Gemini genera una recomendación personalizada.
5. (Opcional) Se convierte el texto a voz con TTS.
 5. Scripts Disponibles
##  Scripts

npm run dev      → Desarrollo
npm run build    → Build producción
npm run start    → Ejecutar producción
npm run lint     → Revisar código
 6. Variables de Entorno

Muy profesional agregar tabla:

##  Variables de Entorno

| Variable | Descripción |
|----------|------------|
| GOOGLE_GENAI_API_KEY | API Key de Google Gemini |
 7. Deploy (MUY importante)

Si usas Vercel:


- La API Key nunca debe subirse al repositorio.
- Usa `.env.local`
- Agrega `.env.local` a `.gitignore`
⭐ 9. Sección Final Profesional
## 👨‍💻 Autor

Desarrollado por Angel Ruiz  

