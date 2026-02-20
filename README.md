# Chatbot-Gemini - AI Smartphone Expert 📱✨

**Chatbot-Gemini** es una plataforma moderna de recomendación de smartphones que integra inteligencia artificial para ayudar a los usuarios a elegir el dispositivo perfecto mediante un catálogo interno dinámico.

## 🚀 Características Principales
- **Asistente de IA Inteligente**: Chatbot impulsado por **Google Gemini** y **Genkit**.
- **Voz de IA (TTS)**: Las recomendaciones pueden ser escuchadas con voces naturales.
- **Análisis Experto Individual**: Botón de análisis por IA para cada producto del catálogo.
- **Sistema de Ofertas Flash**: La IA prioriza teléfonos con descuentos y calcula el ahorro real para el usuario.
- **Interfaz Premium**: Diseño ultra-moderno con **ShadCN UI**, **Tailwind CSS** y animaciones de alta calidad.

## 🛠️ Stack Tecnológico
- **Framework**: Next.js 15 (App Router)
- **IA**: Firebase Genkit & Google Gemini (Modelo 2.5 Flash)
- **Estilos**: Tailwind CSS & ShadCN UI
- **Iconos**: Lucide React

## 📦 Instalación
1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Configurar variables de entorno**:
   Crea un archivo `.env` y añade tu clave de API de Google AI:
   ```env
   GOOGLE_GENAI_API_KEY=tu_api_key_aqui
   ```
3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## 🚀 Cómo subir a GitHub (SOLUCIÓN DEFINITIVA)

Si tienes errores al subir porque el repositorio se llama diferente o por ramas divergentes, ejecuta estos comandos **en la terminal** uno por uno:

1. **Configurar la URL correcta**:
   ```bash
   git remote set-url origin https://github.com/AngelMRH/Chatbot-Gemini.git
   ```

2. **Configurar el modo de unión**:
   ```bash
   git config pull.rebase false
   ```

3. **Sincronizar con el servidor (Permitiendo historias distintas)**:
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
   *(Si se abre un editor, ciérralo o presiona Ctrl+X)*

4. **Añadir y Confirmar cambios**:
   ```bash
   git add .
   git commit -m "Update: Chatbot-Gemini full features and premium UI"
   ```

5. **Subir definitivamente**:
   ```bash
   git push -u origin main
   ```

---
Proyecto creado y potenciado con Firebase Studio e Inteligencia Artificial.
