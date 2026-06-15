/* Crop Database & Recommendation Scoring Engine */

export const CROPS_DB = [
  {
    id: "rice",
    name: { en: "Rice (Paddy)", hi: "धान (चावल)" },
    scientificName: "Oryza sativa",
    soilTypes: ["clayey", "alluvial", "loamy"],
    seasons: ["kharif"],
    waterReq: "heavy",
    phMin: 5.5,
    phMax: 7.2,
    tempMin: 20,
    tempMax: 37,
    yield: { en: "3.5 - 5.5 Tons/Hectare", hi: "3.5 - 5.5 टन/हेक्टेयर" },
    spacing: { en: "20cm x 15cm spacing", hi: "20 सेमी x 15 सेमी" },
    depth: { en: "2 - 3 cm deep", hi: "2 - 3 सेमी" },
    marketValue: { en: "High", hi: "उच्च" },
    sowingMonths: { en: "June - July", hi: "जून - जुलाई" },
    harvestingMonths: { en: "October - November", hi: "अक्टूबर - नवंबर" },
    progressStart: 5, // June (0-indexed)
    progressEnd: 10,  // November
    description: {
      en: "Requires stagnant water and high humidity. Best grown in clayey soils that retain moisture.",
      hi: "खड़े पानी और उच्च आर्द्रता की आवश्यकता होती है। नमी बनाए रखने वाली मटियार मिट्टी में सबसे अच्छा उगता है।"
    }
  },
  {
    id: "wheat",
    name: { en: "Wheat", hi: "गेहूं" },
    scientificName: "Triticum aestivum",
    soilTypes: ["loamy", "alluvial", "clayey"],
    seasons: ["rabi"],
    waterReq: "moderate",
    phMin: 6.0,
    phMax: 7.5,
    tempMin: 10,
    tempMax: 25,
    yield: { en: "3.0 - 4.5 Tons/Hectare", hi: "3.0 - 4.5 टन/हेक्टेयर" },
    spacing: { en: "22.5cm row spacing", hi: "22.5 सेमी कतार दूरी" },
    depth: { en: "4 - 5 cm deep", hi: "4 - 5 सेमी" },
    marketValue: { en: "Medium-High", hi: "मध्यम-उच्च" },
    sowingMonths: { en: "November - December", hi: "नवंबर - दिसंबर" },
    harvestingMonths: { en: "March - April", hi: "मार्च - अप्रैल" },
    progressStart: 10,
    progressEnd: 3,
    description: {
      en: "Thrives in cool weather and requires fertile, well-drained loamy soils.",
      hi: "ठंडे मौसम में फलता-फूलता है और इसके लिए उपजाऊ, अच्छी जल निकासी वाली दोमट मिट्टी की आवश्यकता होती है।"
    }
  },
  {
    id: "maize",
    name: { en: "Maize (Corn)", hi: "मक्का" },
    scientificName: "Zea mays",
    soilTypes: ["alluvial", "red", "loamy"],
    seasons: ["kharif", "rabi"],
    waterReq: "moderate",
    phMin: 5.8,
    phMax: 7.2,
    tempMin: 18,
    tempMax: 32,
    yield: { en: "2.5 - 4.0 Tons/Hectare", hi: "2.5 - 4.0 टन/हेक्टेयर" },
    spacing: { en: "60cm x 20cm spacing", hi: "60 सेमी x 20 सेमी" },
    depth: { en: "3 - 5 cm deep", hi: "3 - 5 सेमी" },
    marketValue: { en: "Medium", hi: "मध्यम" },
    sowingMonths: { en: "June - July (Kharif) / Oct (Rabi)", hi: "जून - जुलाई (खरीफ) / अक्टूबर (रबी)" },
    harvestingMonths: { en: "Sept - Oct (Kharif) / Feb (Rabi)", hi: "सितंबर - अक्टूबर (खरीफ) / फरवरी (रबी)" },
    progressStart: 5,
    progressEnd: 9,
    description: {
      en: "Requires warm weather and fertile, deep soils rich in organic matter.",
      hi: "गर्म मौसम और जैविक पदार्थों से भरपूर गहरी, उपजाऊ मिट्टी की आवश्यकता होती है।"
    }
  },
  {
    id: "cotton",
    name: { en: "Cotton", hi: "कपास" },
    scientificName: "Gossypium hirsutum",
    soilTypes: ["black", "alluvial"],
    seasons: ["kharif"],
    waterReq: "moderate",
    phMin: 6.0,
    phMax: 8.0,
    tempMin: 21,
    tempMax: 35,
    yield: { en: "1.5 - 2.5 Tons/Hectare", hi: "1.5 - 2.5 टन/हेक्टेयर" },
    spacing: { en: "75cm x 30cm spacing", hi: "75 सेमी x 30 सेमी" },
    depth: { en: "4 - 6 cm deep", hi: "4 - 6 सेमी" },
    marketValue: { en: "High", hi: "उच्च" },
    sowingMonths: { en: "May - June", hi: "मई - जून" },
    harvestingMonths: { en: "October - December", hi: "अक्टूबर - दिसंबर" },
    progressStart: 4,
    progressEnd: 11,
    description: {
      en: "Requires deep, moisture-retentive black soil (Regur) and plenty of sunny weather.",
      hi: "गहरी, नमी धारण करने वाली काली मिट्टी (रेगुर) और भरपूर धूप वाले मौसम की आवश्यकता होती है।"
    }
  },
  {
    id: "sugarcane",
    name: { en: "Sugarcane", hi: "गन्ना" },
    scientificName: "Saccharum officinarum",
    soilTypes: ["alluvial", "black", "loamy"],
    seasons: ["kharif"],
    waterReq: "heavy",
    phMin: 6.5,
    phMax: 7.5,
    tempMin: 20,
    tempMax: 40,
    yield: { en: "70 - 100 Tons/Hectare", hi: "70 - 100 टन/हेक्टेयर" },
    spacing: { en: "90cm row width", hi: "90 सेमी कतार चौड़ाई" },
    depth: { en: "8 - 10 cm deep setts", hi: "8 - 10 सेमी गहरा" },
    marketValue: { en: "High", hi: "उच्च" },
    sowingMonths: { en: "Jan - March (Spring) / Oct (Autumn)", hi: "जनवरी - मार्च / अक्टूबर" },
    harvestingMonths: { en: "Dec - March (Takes 10-12 months)", hi: "दिसंबर - मार्च (10-12 महीने लगते हैं)" },
    progressStart: 0,
    progressEnd: 11,
    description: {
      en: "Long duration crop requiring rich heavy soils and regular, high irrigation.",
      hi: "लंबी अवधि की फसल जिसके लिए समृद्ध भारी मिट्टी और नियमित, अधिक सिंचाई की आवश्यकता होती है।"
    }
  },
  {
    id: "potato",
    name: { en: "Potato", hi: "आलू" },
    scientificName: "Solanum tuberosum",
    soilTypes: ["sandy", "loamy", "alluvial"],
    seasons: ["rabi"],
    waterReq: "moderate",
    phMin: 5.0,
    phMax: 6.5,
    tempMin: 15,
    tempMax: 22,
    yield: { en: "20 - 30 Tons/Hectare", hi: "20 - 30 टन/हेक्टेयर" },
    spacing: { en: "60cm x 20cm spacing", hi: "60 सेमी x 20 सेमी" },
    depth: { en: "5 - 8 cm deep tubers", hi: "5 - 8 सेमी गहरा" },
    marketValue: { en: "Medium", hi: "मध्यम" },
    sowingMonths: { en: "October - November", hi: "अक्टूबर - नवंबर" },
    harvestingMonths: { en: "February - March", hi: "फरवरी - मार्च" },
    progressStart: 9,
    progressEnd: 2,
    description: {
      en: "Requires loose, well-drained sandy loamy soils. Prefers slightly acidic soil.",
      hi: "ढीली, अच्छी जल निकासी वाली रेतीली दोमट मिट्टी की आवश्यकता होती है। थोड़ी अम्लीय मिट्टी पसंद करता है।"
    }
  },
  {
    id: "chickpea",
    name: { en: "Chickpea (Gram)", hi: "चना" },
    scientificName: "Cicer arietinum",
    soilTypes: ["loamy", "clayey", "laterite"],
    seasons: ["rabi"],
    waterReq: "low",
    phMin: 6.0,
    phMax: 8.0,
    tempMin: 15,
    tempMax: 30,
    yield: { en: "1.2 - 2.0 Tons/Hectare", hi: "1.2 - 2.0 टन/हेक्टेयर" },
    spacing: { en: "30cm x 10cm spacing", hi: "30 सेमी x 10 सेमी" },
    depth: { en: "5 - 7 cm deep", hi: "5 - 7 सेमी" },
    marketValue: { en: "High", hi: "उच्च" },
    sowingMonths: { en: "October - November", hi: "अक्टूबर - नवंबर" },
    harvestingMonths: { en: "February - April", hi: "फरवरी - अप्रैल" },
    progressStart: 9,
    progressEnd: 3,
    description: {
      en: "Drought resistant legume crop. Thrives in moderate clayey and loamy soils without water logging.",
      hi: "सूखा प्रतिरोधी तिलहन/दलहन फसल। जलभराव के बिना मध्यम मटियार और दोमट मिट्टी में फलता-फूलता है।"
    }
  },
  {
    id: "groundnut",
    name: { en: "Groundnut (Peanut)", hi: "मूंगफली" },
    scientificName: "Arachis hypogaea",
    soilTypes: ["sandy", "loamy", "red"],
    seasons: ["kharif"],
    waterReq: "low",
    phMin: 6.0,
    phMax: 7.5,
    tempMin: 22,
    tempMax: 30,
    yield: { en: "1.8 - 2.8 Tons/Hectare", hi: "1.8 - 2.8 टन/हेक्टेयर" },
    spacing: { en: "30cm x 10cm spacing", hi: "30 सेमी x 10 सेमी" },
    depth: { en: "5 cm deep", hi: "5 सेमी" },
    marketValue: { en: "High", hi: "उच्च" },
    sowingMonths: { en: "June - July", hi: "जून - जुलाई" },
    harvestingMonths: { en: "October - November", hi: "अक्टूबर - नवंबर" },
    progressStart: 5,
    progressEnd: 10,
    description: {
      en: "Requires loose sandy loamy soils so pods can easily penetrate the earth.",
      hi: "ढीली रेतीली दोमट मिट्टी की आवश्यकता होती है ताकि मूंगफली की फली आसानी से जमीन में प्रवेश कर सके।"
    }
  }
];

/**
 * Scoring Engine to recommend crops
 * @param {Object} input - { soilType, ph, waterReq, season, temp }
 * @returns {Array} - Array of crops with compatibility scores
 */
export function getCropRecommendations(input) {
  const { soilType, ph, waterReq, season, temp } = input;
  
  return CROPS_DB.map(crop => {
    let score = 0;
    
    // 1. Soil Type Match (Max 35 points)
    if (crop.soilTypes.includes(soilType)) {
      score += 35;
    } else {
      // Check partial matches or logical nearby soils (e.g. loamy is close to alluvial/clayey)
      if (soilType === "loamy" && (crop.soilTypes.includes("alluvial") || crop.soilTypes.includes("clayey"))) {
        score += 15;
      }
    }

    // 2. Sowing Season Match (Max 25 points)
    if (crop.seasons.includes(season)) {
      score += 25;
    }

    // 3. Temperature Range Match (Max 20 points)
    if (temp >= crop.tempMin && temp <= crop.tempMax) {
      score += 20;
    } else {
      // Small penalty if within 5 degrees
      const diffMin = Math.abs(temp - crop.tempMin);
      const diffMax = Math.abs(temp - crop.tempMax);
      if (diffMin <= 5 || diffMax <= 5) {
        score += 8;
      }
    }

    // 4. Water Requirement Match (Max 10 points)
    if (crop.waterReq === waterReq) {
      score += 10;
    } else {
      // Moderate matching
      if ((crop.waterReq === "moderate" && (waterReq === "low" || waterReq === "heavy")) ||
          (crop.waterReq === "low" && waterReq === "moderate") ||
          (crop.waterReq === "heavy" && waterReq === "moderate")) {
        score += 5;
      }
    }

    // 5. pH Range Match (Max 10 points)
    if (ph >= crop.phMin && ph <= crop.phMax) {
      score += 10;
    } else {
      // Partial matching if within 0.8 pH units
      const diff = Math.min(Math.abs(ph - crop.phMin), Math.abs(ph - crop.phMax));
      if (diff <= 0.8) {
        score += 5;
      }
    }

    return {
      ...crop,
      score: score
    };
  })
  .filter(crop => crop.score >= 50) // only show crops with > 50% match
  .sort((a, b) => b.score - a.score);
}
