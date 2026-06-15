/* NPK Fertilizer Calculator & Soil Health Advisor */

export const CROP_NPK_TARGETS = {
  rice: { n: 120, p: 60, k: 60 },
  wheat: { n: 120, p: 60, k: 40 },
  maize: { n: 120, p: 60, k: 40 },
  cotton: { n: 100, p: 50, k: 50 },
  sugarcane: { n: 150, p: 80, k: 80 },
  potato: { n: 120, p: 100, k: 120 },
  chickpea: { n: 20, p: 50, k: 20 },
  groundnut: { n: 25, p: 50, k: 75 }
};

/**
 * Calculates chemical fertilizer requirements and provides organic alternatives
 * @param {string} cropId - Target crop ID
 * @param {number} currentN - Soil N level (kg/ha)
 * @param {number} currentP - Soil P level (kg/ha)
 * @param {number} currentK - Soil K level (kg/ha)
 * @param {number} pH - Soil pH level
 * @returns {Object} - Detailed diagnostic report
 */
export function calculateFertilizers(cropId, currentN, currentP, currentK, pH) {
  const target = CROP_NPK_TARGETS[cropId] || { n: 100, p: 50, k: 50 };
  
  // Calculate deficits (cannot be negative)
  const defN = Math.max(0, target.n - currentN);
  const defP = Math.max(0, target.p - currentP);
  const defK = Math.max(0, target.k - currentK);

  /* 
    Standard Agronomic Calculations (kg per hectare):
    1. DAP (Diammonium Phosphate) has 46% P2O5 and 18% N.
       - DAP required = defP / 0.46
       - N supplied by DAP = DAP required * 0.18
    2. Remaining N needed = defN - N supplied by DAP
       - Urea required = remaining N / 0.46 (Urea is 46% N)
    3. MOP (Muriate of Potash) has 60% K2O.
       - MOP required = defK / 0.60
  */
  
  const dapRequired = Math.round(defP / 0.46);
  const nSuppliedByDap = dapRequired * 0.18;
  const remainingN = Math.max(0, defN - nSuppliedByDap);
  const ureaRequired = Math.round(remainingN / 0.46);
  const mopRequired = Math.round(defK / 0.60);

  // Organic Alternatives
  const organicRecommendations = [];
  if (defN > 0) {
    organicRecommendations.push({
      en: "Apply well-decomposed Farmyard Manure (FYM) or Vermicompost (2-3 tons/acre).",
      hi: "अच्छी तरह से सड़ी हुई गोबर की खाद या वर्मीकम्पोस्ट (2-3 टन/एकड़) डालें।"
    });
    organicRecommendations.push({
      en: "Sow green manure crops like Dhaincha or Sunn hemp and plough them back into the soil before main crop sowing.",
      hi: "ढैंचा या सनई जैसी हरी खाद की फसलें बोएं और मुख्य फसल बोने से पहले उन्हें मिट्टी में मिला दें।"
    });
  }
  if (defP > 0) {
    organicRecommendations.push({
      en: "Apply Bone Meal or Rock Phosphate (150-200 kg/acre) which release phosphorus slowly.",
      hi: "हड्डी का चूरा (बोन मील) या रॉक फास्फेट (150-200 किग्रा/एकड़) डालें, जो धीरे-धीरे फास्फोरस छोड़ते हैं।"
    });
    organicRecommendations.push({
      en: "Use Phosphate Solubilizing Bacteria (PSB) biofertilizer to unlock fixed soil phosphorus.",
      hi: "मिट्टी में जमे हुए फास्फोरस को सक्रिय करने के लिए पीएसबी (PSB) बायोफर्टिलाइजर का प्रयोग करें।"
    });
  }
  if (defK > 0) {
    organicRecommendations.push({
      en: "Apply Wood Ash (rich source of natural potash) or composted banana peels.",
      hi: "लकड़ी की राख (प्राकृतिक पोटाश का समृद्ध स्रोत) या केले के छिलके की खाद डालें।"
    });
  }

  // pH Diagnosis
  let phDiagnosis = { status: "", advice: { en: "", hi: "" } };
  if (pH < 6.0) {
    phDiagnosis.status = "Acidic";
    phDiagnosis.advice = {
      en: "Highly Acidic Soil. Apply agricultural lime (calcium carbonate) or dolomite (approx 500 kg/acre) to raise pH and improve nutrient availability.",
      hi: "अत्यधिक अम्लीय मिट्टी। पीएच स्तर को बढ़ाने और पोषक तत्वों की उपलब्धता में सुधार के लिए कृषि चूना (कैल्शियम कार्बोनेट) या डोलोमाइट (लगभग 500 किग्रा/एकड़) डालें।"
    };
  } else if (pH > 7.5) {
    phDiagnosis.status = "Alkaline";
    phDiagnosis.advice = {
      en: "Alkaline Soil. Apply agricultural gypsum (calcium sulfate) or elemental sulfur (approx 200 kg/acre) and increase organic compost usage to reduce pH.",
      hi: "क्षारीय मिट्टी। पीएच कम करने के लिए कृषि जिप्सम (कैल्शियम सल्फेट) या सल्फर (लगभग 200 किग्रा/एकड़) डालें और जैविक खाद का प्रयोग बढ़ाएं।"
    };
  } else {
    phDiagnosis.status = "Optimal";
    phDiagnosis.advice = {
      en: "Ideal pH range for crop nutrient absorption. Maintain soil structure by regular organic mulching.",
      hi: "फसलों के पोषक तत्व अवशोषण के लिए आदर्श पीएच रेंज। नियमित रूप से जैविक मल्चिंग करके मिट्टी की संरचना बनाए रखें।"
    };
  }

  return {
    target,
    current: { n: currentN, p: currentP, k: currentK },
    deficits: { n: defN, p: defP, k: defK },
    commercial: {
      urea: ureaRequired,
      dap: dapRequired,
      mop: mopRequired
    },
    organic: organicRecommendations,
    phDiagnosis
  };
}
