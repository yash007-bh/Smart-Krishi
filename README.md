# Smart Krishi Assistant (स्मार्ट कृषि सहायक)

A modern, mobile-responsive, client-side web application designed to help farmers with crop recommendations, fertilizer suggestions, real-time weather forecasts, disease diagnostics, and government scheme updates.

---

## 🌟 Key Features

*   🌾 **Crop Suitability Advisor**: Input soil type, season, water capacity, average temperature, and pH levels to get a ranked list of compatible crops based on our custom agronomic scoring engine.
*   🧪 **Soil NPK Fertilizer Calculator**: Input target crop and current Nitrogen, Phosphorus, Potassium (N-P-K) levels in your soil to receive chemical dose recommendations (Urea, DAP, MOP) alongside natural organic alternatives and soil pH diagnostics.
*   ☁️ **Weather Forecasts & Smart Advisories**: Real-time 7-day weather forecast with custom agricultural notifications (alerts on heavy rain spraying blocks, extreme heatwave irrigation, frost control, and humidity-related fungal risks).
*   🐛 **Pest & Disease Encyclopedia**: Searchable index of common diseases affecting major crops, detailing visual symptoms, preventative steps, organic remedies, and chemical spray targets.
*   📋 **Government Scheme Matcher**: Input farmer age, landholding acreage, occupation category, and tax status to match eligibility against welfare programs (PM-KISAN, PMFBY, Soil Health Card, PMKSY, PM-KMY).
*   🌐 **Accessibility first**:
    *   **Bilingual interface**: Switch instantly between **English** and **Hindi (हिन्दी)**.
    *   **Voice Assistant (Text-to-Speech)**: Read agricultural alerts, crop values, treatments, and scheme matches aloud in English or Hindi.
    *   **Sleek Dark Mode**: Shift design tones from an earthy sage light theme to a premium dark theme.

---

## 🛠️ Tech Stack

*   **HTML5 & CSS3**: Custom grid layout shell, sliding carousels, horizontal nutrient charts, and native overlays.
*   **JavaScript (ES Modules)**: Modular structure using clean `import`/`export` keywords.
*   **Weather APIs**: Connecting to the public **Open-Meteo REST API** and **Open-Meteo Geocoding API** for location-based forecast queries with no API key requirement.
*   **Build Tool**: **Vite** for local serving and optimized production bundling.

---

## 📁 Project Structure

```
smart-krishi-assistant/
├── index.html           # Structural HTML application shell
├── package.json         # Scripts and package definitions
├── README.md            # Project documentation
├── css/
│   ├── variables.css    # Colors, fonts, and dark mode tokens
│   ├── main.css         # Navigation bars, layouts, and typography
│   ├── dashboard.css    # Welcome banner and widget styles
│   ├── crop-advisor.css # Soil forms and recommendation card grids
│   ├── fertilizer.css   # Comparative NPK graph and recipe grids
│   ├── weather.css      # Current temp displays and weekly strips
│   ├── pests.css        # Search filter and treatment modal overrides
│   └── schemes.css      # Eligibility checklist and categories borders
└── js/
    ├── app.js           # Main coordinator, translations, and speech synthesis
    ├── crop-data.js     # Crop recommendations scoring calculations
    ├── fertilizer.js    # Chemical/organic NPK deficit equations
    ├── pest-data.js     # Disease database search logic
    ├── scheme-data.js   # Welfare schemes evaluator engine
    └── weather.js       # Weather REST integrations & agri-alerts rules
```

---

## 🚀 How to Run Locally

### Prerequisites
*   [Node.js](https://nodejs.org/) (version 18 or above recommended)

### Installation
1.  Navigate into the project directory:
    ```bash
    cd /Users/yashvardhansingh/.gemini/antigravity/scratch/smart-krishi-assistant
    ```
2.  Install dependencies (Vite dev server):
    ```bash
    npm install
    ```

### Running the Development Server
Launch the local development server:
```bash
npm run dev
```
Open your browser and navigate to the local host address printed in the terminal (default: `http://localhost:5173`).

### Building for Production
To bundle and compile all CSS and modular JavaScript files into highly optimized production assets, run:
```bash
npm run build
```
The compiled build output will be stored inside the `dist/` directory. You can preview the production bundle locally by running:
```bash
npm run preview
```
