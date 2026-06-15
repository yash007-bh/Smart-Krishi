/* Smart Krishi Assistant - Application Coordinator & Event Router */

import { getCropRecommendations } from './crop-data.js';
import { calculateFertilizers } from './fertilizer.js';
import { searchPests, PESTS_DB } from './pest-data.js';
import { evaluateEligibility, SCHEMES_DB } from './scheme-data.js';
import { fetchWeatherData, searchLocation, DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOC_NAME } from './weather.js';

// Bilingual Translation Dictionary
const TRANSLATIONS = {
  en: {
    nav_dashboard: "Dashboard",
    nav_crop: "Crop Advisor",
    nav_fertilizer: "NPK Calculator",
    nav_weather: "Weather",
    nav_pests: "Pest Database",
    nav_schemes: "Gov Schemes",
    dash_greeting: "Good Morning, Farmer",
    dash_intro: "Welcome back to your dashboard. Check your live weather warnings, crop compatibility metrics, and fertilizer details below.",
    widget_crop_title: "Crop Recommendation",
    widget_crop_desc: "Find the best crop for your soil type and current sowing season.",
    widget_action_go: "Check Now",
    widget_weather_title: "Weather Status",
    widget_fert_title: "Nutrient Adjustments",
    widget_fert_desc: "Input NPK to calculate custom Urea, DAP, and compost doses.",
    widget_scheme_title: "Scheme Eligibility",
    widget_scheme_desc: "Check which government subsidies and benefits you qualify for.",
    dash_alert_title: "Live Farming Alerts",
    dash_tips_title: "Important Agricultural Advice",
    tip_tag_soil: "Soil Care",
    tip_body_soil: "Test soil health once every two years. Balanced chemical fertilizers combined with organic manure protect yield longevity.",
    tip_tag_irrigation: "Watering",
    tip_body_irrigation: "Use drip or sprinkler irrigation systems to conserve water. Irrigate in early mornings to minimize evaporation.",
    tip_tag_pest: "Pest Management",
    tip_body_pest: "Encourage natural predators and inspect leaves daily. Early spraying prevents wide outbreaks.",
    crop_title: "Crop Suitability Advisor",
    crop_subtitle: "Fill in soil parameters to calculate which crops will grow best on your farm.",
    form_parameters: "Farm Parameters",
    lbl_soil_type: "Soil Type",
    soil_alluvial: "Alluvial (जलोढ़)",
    soil_black: "Black (काली)",
    soil_red: "Red (लाल)",
    soil_laterite: "Laterite (लेटराइट)",
    soil_sandy: "Desert / Sandy (रेतीली)",
    soil_clayey: "Clayey (मटियार)",
    soil_loamy: "Loamy (दोमट)",
    lbl_season: "Sowing Season",
    season_kharif: "Kharif (Monsoon: Jun - Oct)",
    season_rabi: "Rabi (Winter: Oct - Apr)",
    season_zaid: "Zaid (Summer: Mar - Jun)",
    lbl_water: "Water Availability",
    water_low: "Low / Rainfed (कम / बारानी)",
    water_mod: "Moderate (मध्यम / नहरी-कुआं)",
    water_heavy: "Heavy Irrigation (अधिक / भरपूर सिंचाई)",
    lbl_ph: "Soil pH",
    lbl_temp: "Average Temp (°C)",
    btn_find_crops: "Find Suitable Crops",
    btn_listen: "Listen",
    empty_results_title: "No Calculations Run Yet",
    empty_results_desc: "Adjust the parameters on the left sidebar and click 'Find Suitable Crops' to calculate compatibility values.",
    fert_title: "Soil NPK Fertilizer Calculator",
    fert_subtitle: "Input crop type and current soil nutrients to calculate Urea, DAP, Potash, and manure recommendations.",
    fert_form_title: "Nutrient Inputs",
    lbl_target_crop: "Target Crop",
    lbl_nitrogen: "Nitrogen (kg/ha)",
    lbl_phosphorus: "Phosphorus (kg/ha)",
    lbl_potassium: "Potassium (kg/ha)",
    lbl_ph_soil: "Soil pH",
    btn_calc_doses: "Calculate Fertilizer Doses",
    fert_chart_title: "Nutrient Gap Analysis",
    lbl_target: "Target",
    lbl_current: "Current",
    lbl_agri_recipe: "Agronomic Recipe (per Hectare)",
    lbl_urea: "Urea (Nitrogen supply)",
    lbl_dap: "DAP (Phosphorus + N)",
    lbl_mop: "MOP (Potash supply)",
    lbl_organic_alternatives: "Organic Soil Builders",
    weather_title: "Real-time Weather & Alerts",
    weather_subtitle: "Locate your farm or search a town to load temperature, weekly forecasts, and localized agricultural action rules.",
    btn_search: "Search",
    btn_gps: "Use Live Location",
    weather_alert_title: "Agri-Weather Advisories",
    weekly_forecast: "Weekly 7-Day Forecast",
    pests_title: "Pests & Diseases Index",
    pests_subtitle: "Select a crop category or type a disease symptom to retrieve organic & chemical containment procedures.",
    tab_all: "All Crops",
    crop_rice: "Rice (धान)",
    crop_wheat: "Wheat (गेहूं)",
    crop_maize: "Maize (मक्का)",
    crop_cotton: "Cotton (कपास)",
    crop_sugarcane: "Sugarcane (गन्ना)",
    crop_potato: "Potato (आलू)",
    crop_chickpea: "Chickpea (चना)",
    crop_groundnut: "Groundnut (मूंगफली)",
    lbl_symptoms: "Symptoms",
    lbl_prevention: "Preventative Actions",
    lbl_treatments: "Treatment Protocols",
    lbl_organic_control: "Organic Remedies",
    lbl_chemical_control: "Chemical Solution",
    schemes_title: "Government Welfare Schemes",
    schemes_subtitle: "View welfare benefits and enter your profile parameters to identify exact financial matches.",
    elig_checker_title: "Match Schemes",
    lbl_occupation: "Occupation",
    occ_farmer: "Active Farmer (किसान)",
    occ_tenant: "Tenant/Sharecropper (बटाईदार)",
    occ_other: "Other / Non-farmer",
    lbl_age: "Age (Years)",
    lbl_land_holding: "Land Holding (Hectares)",
    lbl_hectare_help: "1 Hectare ≈ 2.47 Acres",
    lbl_taxpayer: "I pay Income Tax",
    btn_check_matches: "Check Matching Schemes",
    lbl_humidity: "Humidity:",
    lbl_wind: "Wind:",
    mob_nav_dash: "Home",
    mob_nav_crop: "Crops",
    mob_nav_fert: "NPK",
    mob_nav_weather: "Weather",
    mob_nav_pests: "Pests"
  },
  hi: {
    nav_dashboard: "डैशबोर्ड",
    nav_crop: "फसल सलाहकार",
    nav_fertilizer: "उर्वरक कैलकुलेटर",
    nav_weather: "मौसम",
    nav_pests: "रोग निर्देशिका",
    nav_schemes: "सरकारी योजनाएं",
    dash_greeting: "नमस्कार किसान भाई",
    dash_intro: "आपके डैशबोर्ड में आपका स्वागत है। नीचे अपनी लाइव मौसम चेतावनियाँ, फसल अनुकूलता विवरण और उर्वरक विवरण देखें।",
    widget_crop_title: "फसल अनुशंसा",
    widget_crop_desc: "अपनी मिट्टी के प्रकार और वर्तमान बुवाई के मौसम के लिए सर्वोत्तम फसल खोजें।",
    widget_action_go: "अभी जांचें",
    widget_weather_title: "मौसम की स्थिति",
    widget_fert_title: "पोषक तत्व खुराक",
    widget_fert_desc: "यूरिया, डीएपी और कम्पोस्ट की सही खुराक की गणना करने के लिए एनपीके दर्ज करें।",
    widget_scheme_title: "योजना पात्रता",
    widget_scheme_desc: "जांचें कि आप किन सरकारी सब्सिडी और वित्तीय लाभों के लिए पात्र हैं।",
    dash_alert_title: "कृषि चेतावनियाँ",
    dash_tips_title: "महत्वपूर्ण कृषि सलाह",
    tip_tag_soil: "मिट्टी की देखभाल",
    tip_body_soil: "हर दो साल में एक बार मिट्टी परीक्षण जरूर कराएं। संतुलित रासायनिक खादों के साथ जैविक खाद मिट्टी की ताकत बढ़ाती है।",
    tip_tag_irrigation: "सिंचाई प्रबंधन",
    tip_body_irrigation: "पानी बचाने के लिए ड्रिप या स्प्रिंकलर सिस्टम का उपयोग करें। वाष्पीकरण कम करने के लिए सुबह जल्दी पानी दें।",
    tip_tag_pest: "कीट नियंत्रण",
    tip_body_pest: "प्राकृतिक कीटभक्षी जीवों को बढ़ावा दें और पत्तियों की दैनिक जांच करें। शुरुआती छिड़काव बड़े रोग को रोकता है।",
    crop_title: "फसल उपयुक्तता सलाहकार",
    crop_subtitle: "अपनी मिट्टी के पैरामीटर भरें और जानें कि आपके खेत में कौन सी फसल सबसे अधिक उपज देगी।",
    form_parameters: "खेत के पैरामीटर",
    lbl_soil_type: "मिट्टी का प्रकार",
    soil_alluvial: "जलोढ़ (Alluvial)",
    soil_black: "काली मिट्टी (Black)",
    soil_red: "लाल मिट्टी (Red)",
    soil_laterite: "लेटराइट (Laterite)",
    soil_sandy: "बलुई / रेतीली (Sandy)",
    soil_clayey: "मटियार / चिकनी (Clayey)",
    soil_loamy: "दोमट मिट्टी (Loamy)",
    lbl_season: "बुवाई का मौसम",
    season_kharif: "खरीफ (मानसून: जून - अक्टूबर)",
    season_rabi: "रबी (सर्दियों: अक्टूबर - अप्रैल)",
    season_zaid: "जायद (गर्मी: मार्च - जून)",
    lbl_water: "पानी की उपलब्धता",
    water_low: "कम सिंचाई / बारानी (Low)",
    water_mod: "मध्यम (नहरी/कुआं - Moderate)",
    water_heavy: "अधिक सिंचाई / भरपूर पानी (Heavy)",
    lbl_ph: "मिट्टी का पीएच (pH)",
    lbl_temp: "औसत तापमान (°C)",
    btn_find_crops: "उपयुक्त फसलें खोजें",
    btn_listen: "सुनें",
    empty_results_title: "अभी कोई गणना नहीं की गई",
    empty_results_desc: "बाएं पैनल में मापदंडों को बदलें और फसल उपयुक्तता की जांच करने के लिए उपयुक्त फसल खोजें पर क्लिक करें।",
    fert_title: "मृदा एनपीके उर्वरक कैलकुलेटर",
    fert_subtitle: "लक्षित फसल और मिट्टी के मौजूदा पोषक तत्वों को दर्ज कर यूरिया, डीएपी, पोटाश और जैविक खाद की आवश्यक मात्रा निकालें।",
    fert_form_title: "पोषक तत्व रीडिंग",
    lbl_target_crop: "लक्षित फसल",
    lbl_nitrogen: "नाइट्रोजन (N - kg/ha)",
    lbl_phosphorus: "फास्फोरस (P - kg/ha)",
    lbl_potassium: "पोटेशियम (K - kg/ha)",
    lbl_ph_soil: "मिट्टी का पीएच (pH)",
    btn_calc_doses: "उर्वरक मात्रा की गणना करें",
    fert_chart_title: "पोषक तत्व अंतर विश्लेषण",
    lbl_target: "लक्ष्य",
    lbl_current: "वर्तमान",
    lbl_agri_recipe: "अनुशंसित खाद नुस्खा (प्रति हेक्टेयर)",
    lbl_urea: "यूरिया (नाइट्रोजन आपूर्ति)",
    lbl_dap: "डीएपी (डी.ए.पी. - फास्फोरस + N)",
    lbl_mop: "एमओपी (पोटाश आपूर्ति)",
    lbl_organic_alternatives: "जैविक मृदा सुधारक",
    weather_title: "मौसम पूर्वानुमान और अलर्ट",
    weather_subtitle: "तापमान, साप्ताहिक पूर्वानुमान और फसलों के लिए सुरक्षा चेतावनी देखने के लिए स्थान खोजें या जीपीएस चालू करें।",
    btn_search: "खोजें",
    btn_gps: "लाइव लोकेशन उपयोग करें",
    weather_alert_title: "कृषि-मौसम सलाह चेतावनी",
    weekly_forecast: "साप्ताहिक 7 दिवसीय पूर्वानुमान",
    pests_title: "कीट एवं रोग निर्देशिका",
    pests_subtitle: "रोग के जैविक और रासायनिक नियंत्रण जानने के लिए फसल चुनें या रोग के लक्षण लिखकर खोजें।",
    tab_all: "सभी फसलें",
    crop_rice: "धान (चावल)",
    crop_wheat: "गेहूं",
    crop_maize: "मक्का",
    crop_cotton: "कपास",
    crop_sugarcane: "गन्ना",
    crop_potato: "आलू",
    crop_chickpea: "चना",
    crop_groundnut: "मूंगफली",
    lbl_symptoms: "रोग के लक्षण",
    lbl_prevention: "बचाव के उपाय",
    lbl_treatments: "उपचार प्रोटोकॉल",
    lbl_organic_control: "जैविक समाधान",
    lbl_chemical_control: "रासायनिक समाधान",
    schemes_title: "सरकारी कल्याणकारी योजनाएं",
    schemes_subtitle: "सरकारी योजनाओं का लाभ देखें और अपनी प्रोफाइल भरकर जांचें कि आप किन वित्तीय लाभों के पात्र हैं।",
    elig_checker_title: "योजना मिलान",
    lbl_occupation: "व्यवसाय",
    occ_farmer: "सक्रिय किसान (जमीन मालिक)",
    occ_tenant: "बटाईदार/काश्तकार किसान",
    occ_other: "अन्य / गैर-किसान",
    lbl_age: "आयु (वर्ष)",
    lbl_land_holding: "भूमि स्वामित्व (हेक्टेयर)",
    lbl_hectare_help: "1 हेक्टेयर ≈ 2.47 एकड़",
    lbl_taxpayer: "मैं आयकर देता हूँ",
    btn_check_matches: "योग्य योजनाएं जांचें",
    lbl_humidity: "आर्द्रता (नमी):",
    lbl_wind: "हवा गति:",
    mob_nav_dash: "होम",
    mob_nav_crop: "फसलें",
    mob_nav_fert: "NPK",
    mob_nav_weather: "मौसम",
    mob_nav_pests: "रोग"
  }
};

// Global App States
let currentLang = "en";
let voiceActive = false;
let currentWeatherData = null;
let currentLat = DEFAULT_LAT;
let currentLon = DEFAULT_LON;
let activeTab = "dashboard";

// Web Speech Synthesis wrapper
const synth = window.speechSynthesis;

function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  if (!root) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-danger" : ""}`;
  if (type === "error") {
    toast.style.borderLeftColor = "var(--accent-secondary)";
  }
  toast.innerHTML = `
    <span>${message}</span>
  `;
  root.appendChild(toast);
  
  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

/**
 * Speech synthesizer
 */
function speakText(text) {
  if (!voiceActive || !synth) return;
  
  // Cancel current speech
  synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Find matching language voice
  const voices = synth.getVoices();
  let matchingVoice = null;
  
  if (currentLang === "hi") {
    // Look for Hindi voice
    matchingVoice = voices.find(v => v.lang.includes("hi-IN") || v.name.includes("Hindi") || v.name.includes("हिन्दी"));
    utterance.lang = "hi-IN";
    utterance.pitch = 1.0;
    utterance.rate = 0.9; // speak slightly slower for clarity
  } else {
    matchingVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB"));
    utterance.lang = "en-US";
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
  }
  
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }
  
  synth.speak(utterance);
}

/**
 * Page Tab Routing Switcher
 */
function switchTab(tabId) {
  activeTab = tabId;
  
  // Update nav link active status (Sidebar)
  document.querySelectorAll(".app-sidebar .nav-link").forEach(link => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update nav link active status (Mobile Bottom Bar)
  document.querySelectorAll(".app-bottom-nav .nav-link").forEach(link => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Update page-content active state
  document.querySelectorAll(".tab-content").forEach(tab => {
    if (tab.id === `tab-${tabId}`) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Renders the localized string keys based on data-tr properties
 */
function applyTranslations() {
  const dictionary = TRANSLATIONS[currentLang];
  
  // Update standard elements
  document.querySelectorAll("[data-tr]").forEach(elem => {
    const key = elem.getAttribute("data-tr");
    if (dictionary[key]) {
      // Check if it is input placeholder or standard text
      if (elem.tagName === "INPUT" && elem.hasAttribute("placeholder")) {
        elem.setAttribute("placeholder", dictionary[key]);
      } else {
        elem.textContent = dictionary[key];
      }
    }
  });

  // Update dashboard greetings based on hours
  updateGreeting();

  // Re-render modules that have loaded data
  if (currentWeatherData) {
    renderWeather(currentWeatherData);
  }
  
  // Re-run crop recommendation UI if calculations are present
  const resultsGrid = document.getElementById("crop-results-grid");
  if (resultsGrid && !resultsGrid.querySelector(".empty-state")) {
    calculateCropsUI();
  }

  // Re-run fertilizer dose results
  const fertRecipeCard = document.getElementById("fert-advice-card");
  if (fertRecipeCard && fertRecipeCard.style.display !== "none") {
    calculateFertilizerUI();
  }

  // Re-render pest catalog
  renderPestDatabase();

  // Re-render schemes list
  renderSchemesDatabase();
}

/**
 * Updates greeting based on hour
 */
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const greetingText = document.getElementById("dash-greeting");
  if (!greetingText) return;

  if (currentLang === "en") {
    if (hour < 12) greetingText.textContent = "Good Morning, Farmer";
    else if (hour < 17) greetingText.textContent = "Good Afternoon, Farmer";
    else greetingText.textContent = "Good Evening, Farmer";
  } else {
    if (hour < 12) greetingText.textContent = "शुभ प्रभात, किसान भाई";
    else if (hour < 17) greetingText.textContent = "नमस्कार, किसान भाई";
    else greetingText.textContent = "शुभ संध्या, किसान भाई";
  }
}

/**
 * Theme Manager
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (!icon) return;
  
  if (theme === "dark") {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />`;
  } else {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`;
  }
}

/**
 * Setup Weather Integration
 */
async function loadWeatherByCoords(lat, lon, customName = null) {
  // Update active coords label
  document.getElementById("lbl-active-coords").textContent = `Coords: ${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  
  // Show loading placeholder
  document.getElementById("dash-weather-val").textContent = "...";
  document.getElementById("dash-weather-desc").textContent = "Updating...";

  const weatherData = await fetchWeatherData(lat, lon);
  if (!weatherData) {
    showToast("Weather forecast could not be loaded.", "error");
    return;
  }

  currentWeatherData = weatherData;
  currentLat = lat;
  currentLon = lon;

  if (customName) {
    currentWeatherData.locName = customName;
  } else {
    currentWeatherData.locName = DEFAULT_LOC_NAME;
  }

  renderWeather(currentWeatherData);
  
  // Sync temperature to Crop form
  document.getElementById("inp-crop-temp").value = weatherData.current.temp;
  
  showToast(currentLang === "en" ? "Weather details updated!" : "मौसम विवरण अपडेट किया गया!");
}

function renderWeather(data) {
  // 1. Update Dashboard Widget
  document.getElementById("dash-weather-val").textContent = `${data.current.temp}°C`;
  document.getElementById("dash-weather-desc").textContent = data.current.text[currentLang];

  // 2. Update Weather Tab Elements
  document.getElementById("lbl-weather-city-name").textContent = data.locName[currentLang] || data.locName;
  document.getElementById("lbl-weather-temp").textContent = `${data.current.temp}°`;
  document.getElementById("lbl-weather-desc").textContent = data.current.text[currentLang];
  document.getElementById("lbl-weather-humidity").textContent = `${data.current.humidity}%`;
  document.getElementById("lbl-weather-wind").textContent = `${data.current.wind} km/h`;

  // Set local date string
  const opt = { weekday: 'long', day: 'numeric', month: 'long' };
  const langTag = currentLang === "en" ? "en-US" : "hi-IN";
  document.getElementById("lbl-weather-date").textContent = new Date().toLocaleDateString(langTag, opt);

  // Update weather card theme styling based on background type (clear, cloudy, rain)
  const weatherCard = document.getElementById("weather-card-element");
  weatherCard.setAttribute("data-weather", data.current.bg);

  // Render weather icon (using dynamic SVGs)
  const svgContainer = document.getElementById("lbl-weather-svg-container");
  svgContainer.innerHTML = getWeatherSVG(data.current.icon);

  // 3. Render Forecast Cards
  const forecastGrid = document.getElementById("weather-forecast-grid");
  forecastGrid.innerHTML = "";
  data.forecast.forEach(day => {
    const card = document.createElement("div");
    card.className = "forecast-day-card";
    card.innerHTML = `
      <span class="forecast-day-name">${day.dayName[currentLang]}</span>
      <div class="forecast-icon">${getWeatherSVG(day.icon)}</div>
      <div class="forecast-temps">
        <span class="temp-max">${day.tempMax}°</span>
        <span class="temp-min">${day.tempMin}°</span>
      </div>
      <span style="font-size:10px; color:var(--text-tertiary);">${day.rainProb}% Rain</span>
    `;
    forecastGrid.appendChild(card);
  });

  // 4. Render Agricultural Alerts
  const alertContainer = document.getElementById("weather-alerts-container");
  const dashAlertContainer = document.getElementById("dash-alerts-list");
  
  alertContainer.innerHTML = "";
  dashAlertContainer.innerHTML = "";

  data.alerts.forEach(alert => {
    const alertLvlClass = alert.level === "high" ? "alert-level-high" : (alert.level === "medium" ? "alert-level-medium" : "");
    const alertTextTitle = alert.title[currentLang];
    const alertTextDesc = alert.desc[currentLang];

    // Create weather advisory tab elements
    const item = document.createElement("div");
    item.className = `agri-warning-item ${alertLvlClass}`;
    item.innerHTML = `
      <div class="warning-item-title">${alertTextTitle}</div>
      <div>${alertTextDesc}</div>
    `;
    alertContainer.appendChild(item);

    // Create dashboard advisory list element
    const dashItem = document.createElement("li");
    dashItem.className = `alert-item ${alert.level === "high" ? "danger" : (alert.level === "medium" ? "warning" : "")}`;
    dashItem.innerHTML = `
      <div class="alert-item-content">
        <div class="alert-item-title">${alertTextTitle}</div>
        <div class="alert-item-time" style="color:var(--text-secondary); margin-top:2px;">${alertTextDesc}</div>
      </div>
    `;
    dashAlertContainer.appendChild(dashItem);
  });
}

function getWeatherSVG(iconType) {
  switch (iconType) {
    case "clear":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: #f5b041;"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.162 5.738a.75.75 0 010 1.06l-1.591 1.591a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zm11.676 0a.75.75 0 011.06 0l1.59 1.59a.75.75 0 11-1.06 1.061l-1.591-1.59a.75.75 0 010-1.061zM12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm15 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5h-2.25A.75.75 0 0118 12zM5.101 17.838a.75.75 0 011.06 0l1.591 1.59a.75.75 0 01-1.06 1.062l-1.591-1.59a.75.75 0 010-1.062zm12.738 0a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.591-1.59a.75.75 0 010-1.06zM12 18.75a.75.75 0 01.75.75V21.75a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75z"/></svg>`;
    case "cloudy":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: #cbd5e0;"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.275A3.75 3.75 0 0118 18H6.75a5.25 5.25 0 01-2.25-10.25z" clip-rule="evenodd" /></svg>`;
    case "rain":
    case "heavy-rain":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: #7fb3d5;"><path d="M12 3.75a5.25 5.25 0 00-5.187 4.41c-.482-.14-.984-.16-1.488-.06a4.5 4.5 0 00-3.57 3.57 4.5 4.5 0 003.57 5.187.75.75 0 11-.32 1.466 6 6 0 01-4.76-6.916 6 6 0 014.76-4.76c.404.08.811.08 1.216 0A6.75 6.75 0 0112 2.25a6.75 6.75 0 016.793 6.002.75.75 0 11-1.492.146 5.25 5.25 0 00-5.301-4.648z"/><path d="M12.75 14.25a.75.75 0 01-.75.75h-.01a.75.75 0 010-1.5h.01a.75.75 0 01.75.75zM9.75 16.5a.75.75 0 01-.75.75h-.01a.75.75 0 010-1.5h.01a.75.75 0 01.75.75zM15.75 16.5a.75.75 0 01-.75.75h-.01a.75.75 0 010-1.5h.01a.75.75 0 01.75.75z"/></svg>`;
    case "thunder":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: #ffd54f;"><path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" /></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="color: #cbd5e0;"><path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.275A3.75 3.75 0 0118 18H6.75a5.25 5.25 0 01-2.25-10.25z" clip-rule="evenodd" /></svg>`;
  }
}

/**
 * Crop Advisor UI Logic
 */
function calculateCropsUI() {
  const soilType = document.getElementById("inp-soil-type").value;
  const season = document.getElementById("inp-crop-season").value;
  const waterReq = document.getElementById("inp-crop-water").value;
  const ph = parseFloat(document.getElementById("inp-crop-ph").value);
  const temp = parseFloat(document.getElementById("inp-crop-temp").value);

  const inputs = { soilType, season, waterReq, ph, temp };
  const recommendations = getCropRecommendations(inputs);

  // Update counts
  const countLabel = document.getElementById("lbl-crop-count");
  if (currentLang === "en") {
    countLabel.textContent = `${recommendations.length} Crops Found`;
  } else {
    countLabel.textContent = `${recommendations.length} फसलें मिलीं`;
  }

  // Handle TTS speaker button
  const speakButton = document.getElementById("btn-speak-crops");
  if (recommendations.length > 0) {
    speakButton.style.display = "inline-flex";
    
    // Bind TTS data speak trigger
    speakButton.onclick = () => {
      let speechString = currentLang === "en" 
        ? `We found ${recommendations.length} suitable crops for your farm. ` 
        : `आपके खेत के लिए ${recommendations.length} उपयुक्त फसलें मिली हैं। `;
      
      recommendations.slice(0, 3).forEach((crop, idx) => {
        speechString += currentLang === "en" 
          ? `Rank ${idx + 1}: ${crop.name.en} with a match score of ${crop.score} percent. ` 
          : `क्रम संख्या ${idx + 1}: ${crop.name.hi}, जिसका मिलान प्रतिशत ${crop.score} है। `;
      });
      speakText(speechString);
    };
  } else {
    speakButton.style.display = "none";
  }

  const resultsGrid = document.getElementById("crop-results-grid");
  resultsGrid.innerHTML = "";

  if (recommendations.length === 0) {
    resultsGrid.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 50px; height:50px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3>${currentLang === "en" ? "No Crops Match Exactly" : "कोई फसल मैच नहीं हुई"}</h3>
        <p>${currentLang === "en" ? "Try adjusting pH ranges or watering parameters on the sidebar for a broader matching search." : "मिट्टी की नमी या पीएच रेंज बदलकर व्यापक परिणाम खोजें।"}</p>
      </div>
    `;
    return;
  }

  // Populate crop cards
  recommendations.forEach(crop => {
    const card = document.createElement("div");
    card.className = "crop-card";

    // Progress bar calculations
    const pct = crop.score;
    const progressPercent = Math.round((crop.progressEnd >= crop.progressStart ? (crop.progressEnd - crop.progressStart) : (12 - crop.progressStart + crop.progressEnd)) * 8.33);

    card.innerHTML = `
      <div class="crop-image-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18M3 12h18M12 3c3.5 0 6 3 6 6.5S15.5 16 12 16M12 3c-3.5 0-6 3-6 6.5S8.5 16 12 16" />
        </svg>
        <span class="crop-match-badge">${pct}% ${currentLang === 'en' ? 'Match' : 'मिलान'}</span>
      </div>
      <div class="crop-details">
        <h3 class="crop-name">${crop.name[currentLang]}</h3>
        <span class="crop-scientific">${crop.scientificName}</span>
        
        <p style="font-size:12px; color:var(--text-secondary); margin-bottom: 12px; height: 54px; overflow:hidden;">${crop.description[currentLang]}</p>
        
        <div class="crop-specs">
          <div class="crop-spec-item">
            <span class="crop-spec-label">${currentLang === 'en' ? 'Avg Yield' : 'औसत उपज'}</span>
            <span class="crop-spec-value">${crop.yield[currentLang]}</span>
          </div>
          <div class="crop-spec-item">
            <span class="crop-spec-label">${currentLang === 'en' ? 'Market Value' : 'बाजार मूल्य'}</span>
            <span class="crop-spec-value">${crop.marketValue[currentLang]}</span>
          </div>
          <div class="crop-spec-item">
            <span class="crop-spec-label">${currentLang === 'en' ? 'Spacing' : 'बुवाई दूरी'}</span>
            <span class="crop-spec-value">${crop.spacing[currentLang]}</span>
          </div>
          <div class="crop-spec-item">
            <span class="crop-spec-label">${currentLang === 'en' ? 'Depth' : 'बीज गहराई'}</span>
            <span class="crop-spec-value">${crop.depth[currentLang]}</span>
          </div>
        </div>

        <div class="crop-timeline">
          <div class="timeline-bar-label">
            <span>${currentLang === 'en' ? 'Sowing:' : 'बुवाई:'} ${crop.sowingMonths[currentLang]}</span>
          </div>
          <div class="timeline-bar">
            <div class="timeline-progress" style="width: ${progressPercent}%;"></div>
          </div>
        </div>
      </div>
    `;
    resultsGrid.appendChild(card);
  });
}

/**
 * Fertilizer Dose Math UI Update
 */
function calculateFertilizerUI() {
  const cropId = document.getElementById("inp-fert-crop").value;
  const currentN = parseInt(document.getElementById("inp-fert-n").value);
  const currentP = parseInt(document.getElementById("inp-fert-p").value);
  const currentK = parseInt(document.getElementById("inp-fert-k").value);
  const pH = parseFloat(document.getElementById("inp-fert-ph").value);

  const report = calculateFertilizers(cropId, currentN, currentP, currentK, pH);

  // 1. Update Nutrient Gap Chart rows
  const maxAxisVal = 160; // NPK scale max
  
  // N bars
  const fillTargetN = (report.target.n / maxAxisVal) * 100;
  const fillCurrentN = (report.current.n / maxAxisVal) * 100;
  document.getElementById("bar-n-target").style.width = `${fillTargetN}%`;
  document.getElementById("bar-n-current").style.width = `${fillCurrentN}%`;
  document.getElementById("lbl-n-target").textContent = `${report.target.n} kg`;
  document.getElementById("lbl-n-current").textContent = `${report.current.n} kg`;

  // P bars
  const fillTargetP = (report.target.p / maxAxisVal) * 100;
  const fillCurrentP = (report.current.p / maxAxisVal) * 100;
  document.getElementById("bar-p-target").style.width = `${fillTargetP}%`;
  document.getElementById("bar-p-current").style.width = `${fillCurrentP}%`;
  document.getElementById("lbl-p-target").textContent = `${report.target.p} kg`;
  document.getElementById("lbl-p-current").textContent = `${report.current.p} kg`;

  // K bars
  const fillTargetK = (report.target.k / maxAxisVal) * 100;
  const fillCurrentK = (report.current.k / maxAxisVal) * 100;
  document.getElementById("bar-k-target").style.width = `${fillTargetK}%`;
  document.getElementById("bar-k-current").style.width = `${fillCurrentK}%`;
  document.getElementById("lbl-k-target").textContent = `${report.target.k} kg`;
  document.getElementById("lbl-k-current").textContent = `${report.current.k} kg`;

  // 2. Update pH Advice Box
  const phStatusBox = document.getElementById("fert-ph-advice-box");
  const phStatusText = document.getElementById("fert-ph-status");
  const phDescText = document.getElementById("fert-ph-desc");

  phStatusText.textContent = `${currentLang === 'en' ? 'pH Status:' : 'पीएच स्तर:'} ${report.phDiagnosis.status}`;
  phDescText.textContent = report.phDiagnosis.advice[currentLang];
  
  if (report.phDiagnosis.status === "Optimal") {
    phStatusBox.className = "agri-warning-item";
    phStatusBox.style.borderLeftColor = "var(--accent-primary)";
  } else {
    phStatusBox.className = "agri-warning-item alert-level-medium";
    phStatusBox.style.borderLeftColor = "var(--accent-warm)";
  }

  // 3. Update Chemical Fertilizer Quantities
  document.getElementById("qty-urea").textContent = `${report.commercial.urea} kg/ha`;
  document.getElementById("qty-dap").textContent = `${report.commercial.dap} kg/ha`;
  document.getElementById("qty-mop").textContent = `${report.commercial.mop} kg/ha`;

  // 4. Update Organic Builders List
  const organicList = document.getElementById("list-organic-tips");
  organicList.innerHTML = "";
  report.organic.forEach(tipObj => {
    const li = document.createElement("li");
    li.textContent = tipObj[currentLang];
    organicList.appendChild(li);
  });

  // Display Recipe advice Card
  document.getElementById("fert-advice-card").style.display = "block";

  // Bind TTS click trigger
  document.getElementById("btn-speak-fert").onclick = () => {
    let ttsText = currentLang === "en"
      ? `For the selected crop, we calculated a fertilizer deficit. You should apply: ${report.commercial.urea} kilograms of Urea, ${report.commercial.dap} kilograms of DAP, and ${report.commercial.mop} kilograms of MOP per hectare. `
      : `चयनित फसल के लिए खाद की कमी का आकलन किया गया है। आपको प्रति हेक्टेयर ${report.commercial.urea} किलोग्राम यूरिया, ${report.commercial.dap} किलोग्राम डीएपी, और ${report.commercial.mop} किलोग्राम एमओपी पोटाश डालना चाहिए। `;
    
    ttsText += `${report.phDiagnosis.advice[currentLang]}`;
    speakText(ttsText);
  };
}

/**
 * Pest & Diseases Section Rendering
 */
function renderPestDatabase() {
  const activeCropFilter = document.querySelector("#pests-crop-tabs .pest-tab-btn.active").getAttribute("data-crop");
  const searchQuery = document.getElementById("inp-pest-search").value;

  const results = searchPests(activeCropFilter, searchQuery);
  const grid = document.getElementById("pests-results-grid");
  grid.innerHTML = "";

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 48px; height: 48px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <h3>${currentLang === 'en' ? 'No Diseases Found' : 'कोई बीमारी नहीं मिली'}</h3>
        <p>${currentLang === 'en' ? 'Try changing filters or typing other symptoms like spots or rust.' : 'फिल्टर बदलें या अन्य लक्षण जैसे पीले धब्बे या फंगस लिखकर खोजें।'}</p>
      </div>
    `;
    return;
  }

  results.forEach(pest => {
    const card = document.createElement("div");
    card.className = "pest-card";
    
    // Alert Level tag
    const alertTag = pest.severity === "high" 
      ? `<span class="badge badge-danger" style="position:absolute; top:12px; right:12px;">${currentLang === 'en' ? 'Severe' : 'गंभीर'}</span>`
      : `<span class="badge badge-warning" style="position:absolute; top:12px; right:12px;">${currentLang === 'en' ? 'Medium' : 'मध्यम'}</span>`;

    card.innerHTML = `
      <div class="pest-img-header">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        ${alertTag}
        <span class="pest-crop-tag">${pest.cropName[currentLang]}</span>
      </div>
      <div class="pest-card-body">
        <h3 class="pest-name">${pest.name[currentLang]}</h3>
        <span class="pest-scientific">${pest.scientificName}</span>
        <p class="pest-short-desc">${pest.description[currentLang]}</p>
        <button class="btn-primary btn-view-details" data-id="${pest.id}">
          <span data-tr="widget_action_go">${TRANSLATIONS[currentLang].widget_action_go}</span>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Bind view click handler to show details in modal
  document.querySelectorAll(".btn-view-details").forEach(btn => {
    btn.onclick = (e) => {
      const pId = e.currentTarget.getAttribute("data-id");
      openPestDetailsModal(pId);
    };
  });
}

function openPestDetailsModal(pestId) {
  const pest = PESTS_DB.find(p => p.id === pestId);
  if (!pest) return;

  // Populate Modal Fields
  document.getElementById("modal-pest-name").textContent = pest.name[currentLang];
  document.getElementById("modal-pest-scientific").textContent = pest.scientificName;
  document.getElementById("modal-pest-symptoms").textContent = pest.symptoms[currentLang];
  document.getElementById("modal-pest-prevention").textContent = pest.prevention[currentLang];
  document.getElementById("modal-pest-organic").textContent = pest.organicControl[currentLang];
  document.getElementById("modal-pest-chemical").textContent = pest.chemicalControl[currentLang];

  // Set TTS click readout trigger
  document.getElementById("btn-speak-pest-modal").onclick = () => {
    const textString = currentLang === "en"
      ? `Disease details for ${pest.name.en}. Symptoms are: ${pest.symptoms.en}. Prevention: ${pest.prevention.en}. Organic treatment: ${pest.organicControl.en}.`
      : `बीमारी का नाम है: ${pest.name.hi}। लक्षण: ${pest.symptoms.hi}। बचाव: ${pest.prevention.hi}। जैविक उपचार: ${pest.organicControl.hi}।`;
    speakText(textString);
  };

  // Open modal animation
  document.getElementById("pest-detail-modal").classList.add("active");
}

function closePestDetailsModal() {
  document.getElementById("pest-detail-modal").classList.remove("active");
  if (synth) synth.cancel(); // Stop talking on modal close
}

/**
 * Government Schemes directory & check matching profile UI
 */
function renderSchemesDatabase() {
  const container = document.getElementById("schemes-cards-list");
  container.innerHTML = "";

  SCHEMES_DB.forEach(scheme => {
    // Map scheme category style badges
    const badgeColorClass = scheme.category === "insurance" ? "badge-danger" : (scheme.category === "pension" ? "badge-warning" : "badge-success");
    
    const card = document.createElement("div");
    card.className = `scheme-card ${scheme.category}`;
    card.id = `scheme-card-${scheme.id}`;
    card.innerHTML = `
      <div class="scheme-header-row">
        <div class="scheme-title-block">
          <h3 class="scheme-name">${scheme.name[currentLang]}</h3>
          <span class="scheme-dept">${scheme.department[currentLang]}</span>
        </div>
        <span class="badge ${badgeColorClass}">${scheme.categoryLabel[currentLang]}</span>
      </div>
      <p class="scheme-description">${scheme.description[currentLang]}</p>
      
      <div class="scheme-details-grid">
        <div class="scheme-detail-col">
          <span class="scheme-detail-lbl">${currentLang === 'en' ? 'Benefit:' : 'सरकारी लाभ:'}</span>
          <span class="scheme-detail-val" style="color: var(--accent-primary);">${scheme.benefit[currentLang]}</span>
        </div>
        <div class="scheme-detail-col">
          <span class="scheme-detail-lbl">${currentLang === 'en' ? 'Eligibility:' : 'पात्रता विवरण:'}</span>
          <span class="scheme-detail-val">${scheme.eligibilityDesc[currentLang]}</span>
        </div>
        <div class="scheme-detail-col">
          <span class="scheme-detail-lbl">${currentLang === 'en' ? 'How to Apply:' : 'आवेदन का तरीका:'}</span>
          <span class="scheme-detail-val">${scheme.howToApply[currentLang]}</span>
        </div>
      </div>

      <div class="scheme-footer-row">
        <span class="scheme-eligibility-summary" id="elig-summary-${scheme.id}"></span>
        <button class="btn-control btn-speak-scheme" data-id="${scheme.id}" aria-label="Listen to scheme details">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 16px; height: 16px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75l-3.75-3.75H4.5A1.5 1.5 0 013 13.5v-3a1.5 1.5 0 011.5-1.5h3.75L12 5.25v13.5z" /></svg>
          <span data-tr="btn_listen">Listen</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Bind listen details button on schemes
  document.querySelectorAll(".btn-speak-scheme").forEach(btn => {
    btn.onclick = (e) => {
      const schId = e.currentTarget.getAttribute("data-id");
      const scheme = SCHEMES_DB.find(s => s.id === schId);
      if (!scheme) return;
      
      const ttsString = currentLang === "en"
        ? `Scheme details for ${scheme.name.en}. Provided by ${scheme.department.en}. Financial benefit: ${scheme.benefit.en}. Registration: ${scheme.howToApply.en}`
        : `योजना का नाम: ${scheme.name.hi}। संबंधित विभाग: ${scheme.department.hi}। योजना का लाभ: ${scheme.benefit.hi}। आवेदन प्रक्रिया: ${scheme.howToApply.hi}`;
      speakText(ttsString);
    };
  });
}

function evaluateEligibilityUI() {
  const age = parseInt(document.getElementById("inp-elig-age").value);
  const landArea = parseFloat(document.getElementById("inp-elig-land").value);
  const occupationType = document.getElementById("inp-elig-occupation").value;
  const isTaxpayer = document.getElementById("inp-elig-taxpayer").checked;

  const profile = { age, landArea, occupationType, isTaxpayer };
  const evaluatedSchemes = evaluateEligibility(profile);

  let eligibleCount = 0;

  evaluatedSchemes.forEach(scheme => {
    const card = document.getElementById(`scheme-card-${scheme.id}`);
    const summarySpan = document.getElementById(`elig-summary-${scheme.id}`);
    
    if (!card || !summarySpan) return;

    if (scheme.isEligible) {
      eligibleCount++;
      card.style.borderColor = "var(--accent-primary)";
      card.style.background = "var(--bg-secondary)";
      summarySpan.innerHTML = `
        <span class="badge badge-success">✓ ${currentLang === 'en' ? 'Eligible' : 'योग्य'}</span>
      `;
    } else {
      card.style.borderColor = "var(--accent-secondary)";
      // Highlight reasons why not eligible
      const failReasonText = scheme.reasons.map(r => r[currentLang]).join(", ");
      card.style.background = "var(--bg-tertiary)";
      summarySpan.innerHTML = `
        <span class="badge badge-danger">✗ ${currentLang === 'en' ? 'Ineligible' : 'अपात्र'}</span>
        <small style="color:var(--accent-secondary); margin-left: 10px; font-weight:600;">${failReasonText}</small>
      `;
    }
  });

  // Display top notification box matches count
  const resultsContainer = document.getElementById("elig-results-container");
  const resultsTitle = document.getElementById("lbl-elig-results-title");
  const resultsDesc = document.getElementById("lbl-elig-results-desc");

  resultsContainer.classList.add("active");
  
  if (currentLang === "en") {
    resultsTitle.textContent = `Match Found: ${eligibleCount} Schemes`;
    resultsDesc.textContent = `You fit the eligibility profile criteria for ${eligibleCount} out of ${evaluatedSchemes.length} schemes listed on the left. Green cards denote programs you can apply to immediately.`;
  } else {
    resultsTitle.textContent = `मैच मिला: ${eligibleCount} योजनाएं`;
    resultsDesc.textContent = `आप बाईं ओर सूचीबद्ध ${evaluatedSchemes.length} में से ${eligibleCount} योजनाओं के पात्रता मापदंडों में सही बैठते हैं। हरे रंग के बॉर्डर वाले कार्ड उन कार्यक्रमों को दर्शाते हैं जिन पर आप तुरंत आवेदन कर सकते हैं।`;
  }

  // Speak results summary if voice activated
  const ttsAnnounce = currentLang === "en"
    ? `Eligibility calculation completed. We found that you qualify for ${eligibleCount} government schemes.`
    : `पात्रता जांच पूरी हो गई है। हमें पता चला है कि आप ${eligibleCount} सरकारी योजनाओं के लिए पात्र हैं।`;
  speakText(ttsAnnounce);
  
  showToast(currentLang === "en" ? "Matches evaluated!" : "योजना मिलान संपन्न!");
}

/**
 * Bind DOM Event Listeners
 */
function bindEvents() {
  // Navigation Tabs (Sidebar + Bottom mobile navbar)
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = e.currentTarget.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Dashboard Tab redirect clicks
  document.querySelectorAll(".widget-action").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const destTab = e.currentTarget.getAttribute("data-goto");
      switchTab(destTab);
    });
  });

  // Language buttons (EN | HI)
  document.getElementById("btn-lang-en").onclick = () => {
    if (currentLang === "en") return;
    currentLang = "en";
    document.getElementById("btn-lang-en").classList.add("active");
    document.getElementById("btn-lang-hi").classList.remove("active");
    applyTranslations();
    showToast("Language changed to English");
  };

  document.getElementById("btn-lang-hi").onclick = () => {
    if (currentLang === "hi") return;
    currentLang = "hi";
    document.getElementById("btn-lang-hi").classList.add("active");
    document.getElementById("btn-lang-en").classList.remove("active");
    applyTranslations();
    showToast("भाषा बदलकर हिन्दी कर दी गई है");
  };

  // Dark/Light Theme Toggler
  document.getElementById("btn-theme-toggle").onclick = () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
    showToast(currentLang === 'en' ? `Theme switched to ${nextTheme}!` : `${nextTheme === 'dark' ? 'डार्क' : 'लाइट'} मोड सक्रिय किया गया!`);
  };

  // Voice Assistant speech toggler
  document.getElementById("btn-voice-toggle").onclick = () => {
    voiceActive = !voiceActive;
    const btnText = document.getElementById("lbl-voice-toggle");
    
    if (voiceActive) {
      btnText.textContent = currentLang === "en" ? "Voice: ON" : "आवाज: चालू";
      document.getElementById("btn-voice-toggle").style.backgroundColor = "var(--accent-primary-light)";
      document.getElementById("btn-voice-toggle").style.color = "var(--accent-primary)";
      
      const welcomeSpeech = currentLang === "en" 
        ? "Voice assistant activated. Click any listen icon to hear agriculture guidelines." 
        : "आवाज सहायक चालू कर दिया गया है। कृषि दिशा-निर्देश सुनने के लिए किसी भी स्पीकर आइकन पर क्लिक करें।";
      speakText(welcomeSpeech);
      showToast(currentLang === 'en' ? "Voice assistant enabled!" : "आवाज सहायक चालू हो गया है!");
    } else {
      btnText.textContent = currentLang === "en" ? "Voice: OFF" : "आवाज: बंद";
      document.getElementById("btn-voice-toggle").style.backgroundColor = "var(--bg-tertiary)";
      document.getElementById("btn-voice-toggle").style.color = "var(--text-primary)";
      
      if (synth) synth.cancel();
      showToast(currentLang === 'en' ? "Voice assistant disabled." : "आवाज सहायक बंद कर दिया गया है।");
    }
  };

  // Crop Advisor - pH slider updates label
  document.getElementById("inp-crop-ph").oninput = (e) => {
    document.getElementById("val-crop-ph").textContent = e.target.value;
  };

  // Crop Advisor Submit Click
  document.getElementById("btn-calculate-crops").onclick = () => {
    calculateCropsUI();
    showToast(currentLang === "en" ? "Crop list updated!" : "फसलों की सूची अपडेट की गई!");
  };

  // Fertilizer Sliders value readouts sync
  document.getElementById("inp-fert-n").oninput = (e) => {
    document.getElementById("val-fert-n").textContent = `${e.target.value} kg/ha`;
  };
  document.getElementById("inp-fert-p").oninput = (e) => {
    document.getElementById("val-fert-p").textContent = `${e.target.value} kg/ha`;
  };
  document.getElementById("inp-fert-k").oninput = (e) => {
    document.getElementById("val-fert-k").textContent = `${e.target.value} kg/ha`;
  };
  document.getElementById("inp-fert-ph").oninput = (e) => {
    document.getElementById("val-fert-ph").textContent = e.target.value;
  };

  // Fertilizer Submit Click
  document.getElementById("btn-calculate-fert").onclick = () => {
    calculateFertilizerUI();
    showToast(currentLang === "en" ? "Fertilizer recipe calculated!" : "उर्वरक की सही खुराक मापी गई!");
  };

  // Weather Search Click
  document.getElementById("btn-weather-search").onclick = async () => {
    const inputCity = document.getElementById("inp-weather-city").value.trim();
    if (!inputCity) {
      showToast("Please type a city name.", "error");
      return;
    }
    
    showToast(currentLang === 'en' ? "Searching city..." : "शहर खोजा जा रहा है...");
    const location = await searchLocation(inputCity);
    if (!location) {
      showToast(currentLang === 'en' ? "City not found. Try spelling in English." : "शहर नहीं मिला। कृपया अंग्रेजी में सही स्पेलिंग लिखें।", "error");
      return;
    }

    const localeName = { en: location.name, hi: location.name }; // geocoding API returns english names
    loadWeatherByCoords(location.lat, location.lon, localeName);
  };

  // Weather GPS geolocation click
  document.getElementById("btn-weather-gps").onclick = () => {
    if (!navigator.geolocation) {
      showToast("GPS is not supported by your browser.", "error");
      return;
    }

    showToast(currentLang === 'en' ? "Detecting GPS location..." : "जीपीएस लोकेशन पहचानी जा रही है...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude, { 
          en: "My Farm location", 
          hi: "मेरा खेत स्थान" 
        });
      },
      (err) => {
        console.error("GPS detection error:", err);
        showToast("Location access denied by browser.", "error");
      }
    );
  };

  // Weather Tab alert speaker
  document.getElementById("btn-speak-weather-alerts").onclick = () => {
    if (!currentWeatherData) return;
    
    let weatherAlertSpeech = currentLang === "en"
      ? `Today's current temperature in ${currentWeatherData.locName.en} is ${currentWeatherData.current.temp} degrees Celsius with ${currentWeatherData.current.text.en}. `
      : `आज ${currentWeatherData.locName.hi} का तापमान ${currentWeatherData.current.temp} डिग्री सेल्सियस है और मौसम ${currentWeatherData.current.text.hi} बना हुआ है। `;
    
    currentWeatherData.alerts.forEach((alert) => {
      weatherAlertSpeech += `${alert.title[currentLang]}. ${alert.desc[currentLang]}. `;
    });

    speakText(weatherAlertSpeech);
  };

  // Pest Database Search Input
  document.getElementById("inp-pest-search").oninput = () => {
    renderPestDatabase();
  };

  // Pest Database Crop Filter buttons
  document.querySelectorAll("#pests-crop-tabs .pest-tab-btn").forEach(btn => {
    btn.onclick = (e) => {
      document.querySelectorAll("#pests-crop-tabs .pest-tab-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderPestDatabase();
    };
  });

  // Modal Close buttons
  document.getElementById("btn-close-pest-modal").onclick = () => closePestDetailsModal();
  document.getElementById("pest-detail-modal").onclick = (e) => {
    if (e.target.id === "pest-detail-modal") closePestDetailsModal();
  };

  // Schemes Eligibility Submit
  document.getElementById("btn-run-elig-check").onclick = () => {
    evaluateEligibilityUI();
  };
}

/**
 * Initialize Web App
 */
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  bindEvents();
  
  // Apply initial language setup (English default)
  applyTranslations();

  // Load default location weather immediately (New Delhi)
  loadWeatherByCoords(DEFAULT_LAT, DEFAULT_LON, DEFAULT_LOC_NAME);
});

// Cancel speech synthesis if user closes browser window or tab
window.onbeforeunload = () => {
  if (synth) synth.cancel();
};
