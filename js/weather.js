/* Real-time Weather Integration & Smart Agricultural Warnings */

export const DEFAULT_LAT = 28.6139; // New Delhi
export const DEFAULT_LON = 77.2090;
export const DEFAULT_LOC_NAME = { en: "New Delhi", hi: "नई दिल्ली" };
const DEFAULT_STATE = { en: "Delhi", hi: "दिल्ली" };

// WMO Weather Codes to text & basic condition key mapping
const WEATHER_CODES = {
  0: { text: { en: "Clear sky", hi: "साफ आसमान" }, icon: "clear", bg: "clear" },
  1: { text: { en: "Mainly clear", hi: "मुख्यतः साफ" }, icon: "clear", bg: "clear" },
  2: { text: { en: "Partly cloudy", hi: "आंशिक रूप से बादल" }, icon: "cloudy", bg: "cloudy" },
  3: { text: { en: "Overcast", hi: "घने बादल" }, icon: "cloudy", bg: "cloudy" },
  45: { text: { en: "Foggy", hi: "कोहरा" }, icon: "fog", bg: "cloudy" },
  48: { text: { en: "Depositing rime fog", hi: "बर्फ़ीला कोहरा" }, icon: "fog", bg: "cloudy" },
  51: { text: { en: "Light drizzle", hi: "हल्की बूंदाबांदी" }, icon: "rain", bg: "rain" },
  53: { text: { en: "Moderate drizzle", hi: "मध्यम बूंदाबांदी" }, icon: "rain", bg: "rain" },
  55: { text: { en: "Dense drizzle", hi: "घनी बूंदाबांदी" }, icon: "rain", bg: "rain" },
  61: { text: { en: "Slight rain", hi: "हल्की बारिश" }, icon: "rain", bg: "rain" },
  63: { text: { en: "Moderate rain", hi: "मध्यम बारिश" }, icon: "rain", bg: "rain" },
  65: { text: { en: "Heavy rain", hi: "भारी बारिश" }, icon: "heavy-rain", bg: "rain" },
  80: { text: { en: "Slight rain showers", hi: "हल्की बौछारें" }, icon: "rain", bg: "rain" },
  81: { text: { en: "Moderate rain showers", hi: "मध्यम बौछारें" }, icon: "rain", bg: "rain" },
  82: { text: { en: "Violent rain showers", hi: "तेज मूसलाधार बौछारें" }, icon: "heavy-rain", bg: "rain" },
  95: { text: { en: "Thunderstorm", hi: "गरज के साथ आंधी" }, icon: "thunder", bg: "rain" },
  96: { text: { en: "Thunderstorm with slight hail", hi: "गरज और ओलावृष्टि" }, icon: "thunder", bg: "rain" },
  99: { text: { en: "Thunderstorm with heavy hail", hi: "भारी ओलावृष्टि और आंधी" }, icon: "thunder", bg: "rain" }
};

/**
 * Fallback translation helper for weather labels
 */
function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { 
    text: { en: "Unknown conditions", hi: "अज्ञात मौसम" }, 
    icon: "cloudy", 
    bg: "cloudy" 
  };
}

/**
 * Fetches coordinates for a given city name
 * @param {string} cityName - Name of the city to search
 * @returns {Promise<Object>} - Coordinates & metadata or null
 */
export async function searchLocation(cityName) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.results && data.results.length > 0) {
      const res = data.results[0];
      return {
        lat: res.latitude,
        lon: res.longitude,
        name: res.name,
        admin1: res.admin1 || "",
        country: res.country || ""
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
}

/**
 * Fetches real-time weather details
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} - Weather forecast database
 */
export async function fetchWeatherData(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  try {
    // Fetch daily and hourly data from Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode,windspeed_10m_max,relative_humidity_2m_max&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data || !data.current_weather) {
      throw new Error("Invalid response structure from weather API.");
    }
    
    return parseWeatherData(data);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return null;
  }
}

/**
 * Parses Raw API response into cleaner structure
 */
function parseWeatherData(apiData) {
  const current = apiData.current_weather;
  const daily = apiData.daily;
  
  // Format current conditions
  const currentDetails = getWeatherInfo(current.weathercode);
  
  // Weather metrics
  const parsedCurrent = {
    temp: Math.round(current.temperature),
    wind: current.windspeed,
    code: current.weathercode,
    text: currentDetails.text,
    icon: currentDetails.icon,
    bg: currentDetails.bg,
    humidity: daily.relative_humidity_2m_max[0] || 65, // approximation for current humidity
    rainProb: daily.precipitation_probability_max[0] || 0
  };

  // Format 7-Day Forecast
  const forecast = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysOfWeekHi = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
  
  for (let i = 0; i < daily.time.length; i++) {
    const dateObj = new Date(daily.time[i]);
    const dayIndex = dateObj.getDay();
    const cond = getWeatherInfo(daily.weathercode[i]);
    
    forecast.push({
      date: daily.time[i],
      dayName: { en: daysOfWeek[dayIndex], hi: daysOfWeekHi[dayIndex] },
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      rainProb: daily.precipitation_probability_max[i],
      text: cond.text,
      icon: cond.icon
    });
  }

  // Generate agricultural alerts based on daily conditions
  const alerts = generateAgriculturalAlerts(parsedCurrent, forecast[0], forecast[1]);

  return {
    current: parsedCurrent,
    forecast: forecast,
    alerts: alerts
  };
}

/**
 * Heuristic rules for farming advisory
 */
function generateAgriculturalAlerts(current, today, tomorrow) {
  const alerts = [];

  // Rule 1: High Rain Alert (Pesticide/Spraying block)
  if (today.rainProb > 60 || tomorrow.rainProb > 60 || [61, 63, 65, 81, 82].includes(current.code)) {
    alerts.push({
      level: "high",
      title: { 
        en: "Postpone Spray & Fertilizer Applications", 
        hi: "दवा छिड़काव और खाद डालना स्थगित करें" 
      },
      desc: {
        en: `Rain probability is high (${Math.max(today.rainProb, tomorrow.rainProb)}%). Avoid applying chemical sprays as they will wash off. Clear drainage paths.`,
        hi: `बारिश की संभावना अधिक है (${Math.max(today.rainProb, tomorrow.rainProb)}%)। रसायनों के छिड़काव से बचें क्योंकि वे बह जाएंगे। जल निकासी के रास्तों को साफ करें।`
      }
    });
  }

  // Rule 2: Thunderstorm risk
  if ([95, 96, 99].includes(current.code)) {
    alerts.push({
      level: "high",
      title: { 
        en: "Severe Weather: Thunderstorm Warning", 
        hi: "खराब मौसम: आंधी-तूफान की चेतावनी" 
      },
      desc: {
        en: "Lightning and thunderstorm active in your area. Secure loose farm equipment, shelter livestock, and do not work in open fields.",
        hi: "आपके क्षेत्र में आंधी और बिजली चमकना सक्रिय है। कृषि उपकरणों को सुरक्षित करें, पशुओं को छांव में रखें और खुले खेतों में काम न करें।"
      }
    });
  }

  // Rule 3: Extreme Heat Stress (irrigation guide)
  if (today.tempMax >= 38) {
    alerts.push({
      level: "medium",
      title: { 
        en: "Crop Heat Stress Advisory", 
        hi: "फसलों के लिए ऊष्मा तनाव (हीट स्ट्रेस) सलाह" 
      },
      desc: {
        en: `Temperatures reaching ${today.tempMax}°C. Apply light irrigation in early morning or late evening. Mulch around crops to retain soil moisture.`,
        hi: `तापमान ${today.tempMax}°C तक पहुंच रहा है। सुबह जल्दी या शाम को हल्की सिंचाई करें। मिट्टी की नमी बनाए रखने के लिए फसलों के चारों ओर मल्चिंग करें।`
      }
    });
  }

  // Rule 4: Frost risk / Cold wave
  if (today.tempMin <= 8) {
    alerts.push({
      level: "medium",
      title: { 
        en: "Frost & Cold Advisory", 
        hi: "पाला और शीत लहर की सलाह" 
      },
      desc: {
        en: `Low temperature drop of ${today.tempMin}°C. High risk of frost damage in sensitive crops. Irrigate lightly or burn crop residue on boundaries to create heat smokes.`,
        hi: `तापमान गिरकर ${today.tempMin}°C तक आ रहा है। पाला पड़ने का खतरा है। हल्की सिंचाई करें या गर्मी पैदा करने के लिए खेत के किनारों पर सूखी पत्तियां जलाकर धुंआ करें।`
      }
    });
  }

  // Rule 5: Fungal blight / Rust conditions (High humidity + moderate temperatures)
  if (current.humidity >= 85 && current.temp >= 18 && current.temp <= 30) {
    alerts.push({
      level: "medium",
      title: { 
        en: "High Fungal Infection Risk", 
        hi: "फंगल (कवक) संक्रमण का उच्च खतरा" 
      },
      desc: {
        en: `High relative humidity (${current.humidity}%) and warm weather. Monitor leaves for blast spots, powdery mildew, or rust symptoms daily.`,
        hi: `उच्च सापेक्ष आर्द्रता (${current.humidity}%) और गर्म मौसम। ब्लास्ट स्पॉट्स, ख़स्ता फफूंदी या रतुआ (रस्ट) के लक्षणों के लिए प्रतिदिन पत्तियों की निगरानी करें।`
      }
    });
  }

  // Default clean alert if nothing matches
  if (alerts.length === 0) {
    alerts.push({
      level: "low",
      title: { 
        en: "Ideal Farming Weather", 
        hi: "खेती के लिए अनुकूल मौसम" 
      },
      desc: {
        en: "Conditions are excellent for weeding, harvesting, sowing, and routine pesticide/fertilizer spray activities.",
        hi: "निराई, कटाई, बुवाई और सामान्य छिड़काव गतिविधियों के लिए मौसम बहुत अनुकूल है।"
      }
    });
  }

  return alerts;
}
