/* Pest and Disease Database */

export const PESTS_DB = [
  {
    id: "rice-blast",
    cropId: "rice",
    cropName: { en: "Rice", hi: "धान" },
    name: { en: "Rice Blast", hi: "धान का झोंका रोग (ब्लास्ट)" },
    scientificName: "Magnaporthe oryzae",
    severity: "high",
    symptoms: {
      en: "Spindle-shaped spots on leaves with gray centers and brown borders. Leaf lesions can enlarge and kill the entire leaf. Can also affect node joints and neck of the grain panicle causing lodging.",
      hi: "पत्तियों पर तकुआ के आकार के धब्बे जिनके बीच का हिस्सा धूसर (सलेटी) और किनारे भूरे रंग के होते हैं। धब्बे बड़े होकर पूरी पत्ती को सुखा सकते हैं। यह तने की गांठों और बालियों को भी प्रभावित कर सकता है।"
    },
    prevention: {
      en: "Use resistant crop varieties. Avoid excessive Nitrogen fertilizer application. Maintain proper water management and clean field bunds.",
      hi: "प्रतिरोधी किस्मों का उपयोग करें। नाइट्रोजन युक्त खाद का अत्यधिक उपयोग न करें। पानी का उचित प्रबंधन रखें और मेढ़ों को साफ रखें।"
    },
    organicControl: {
      en: "Spray Pseudomonas fluorescens formulation @ 10g/liter of water or spray Neem oil (3%) at early stages of symptom appearance.",
      hi: "स्यूडोमोनास फ्लोरेसेंस 10 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें या शुरुआती लक्षणों पर नीम के तेल (3%) का छिड़काव करें।"
    },
    chemicalControl: {
      en: "Spray Tricyclazole 75 WP @ 0.6 g/liter of water or Carbendazim 50 WP @ 1 g/liter.",
      hi: "ट्राइसाइक्लाजोल 75 WP को 0.6 ग्राम प्रति लीटर पानी में या कार्बेन्डाजिम 50 WP को 1 ग्राम प्रति लीटर पानी में मिलाकर स्प्रे करें।"
    },
    description: {
      en: "One of the most destructive fungal diseases of rice, capable of causing total crop failure under warm, humid conditions.",
      hi: "धान के सबसे विनाशकारी कवक (फंगस) जनित रोगों में से एक, जो गर्म और आर्द्र परिस्थितियों में पूरी फसल को नष्ट कर सकता है।"
    }
  },
  {
    id: "rice-blight",
    cropId: "rice",
    cropName: { en: "Rice", hi: "धान" },
    name: { en: "Bacterial Leaf Blight", hi: "जीवाणु झुलसा रोग (बीएलबी)" },
    scientificName: "Xanthomonas oryzae",
    severity: "high",
    symptoms: {
      en: "Yellowish-wavy stripes start from leaf tips and margins, moving downwards. Leaves dry up, giving a burnt appearance (kresek stage in young plants). White crusty drops may appear on leaves in humid mornings.",
      hi: "पत्तियों की नोक और किनारों से शुरू होकर नीचे की ओर जाने वाली पीली-लहरदार धारियां। पत्तियां सूख जाती हैं जिससे वे झुलसी हुई दिखती हैं। आर्द्र सुबह के समय पत्तियों पर सफेद पपड़ीदार बूंदें दिखाई दे सकती हैं।"
    },
    prevention: {
      en: "Ensure seed treatment before sowing. Avoid splashing irrigation water from infected fields. Grow resistant cultivars.",
      hi: "बुवाई से पहले बीज शोधन अवश्य करें। संक्रमित खेतों से सिंचाई का पानी बहकर स्वस्थ खेतों में न जाने दें। प्रतिरोधी किस्मों का चयन करें।"
    },
    organicControl: {
      en: "Spray fresh cow dung extract (5%) or Neem Seed Kernel Extract (NSKE 5%). Avoid spraying when wind speeds are high.",
      hi: "ताजे गाय के गोबर का घोल (5%) या नीम बीज गिरी का अर्क (NSKE 5%) बनाकर छिड़काव करें। तेज हवा चलने पर छिड़काव से बचें।"
    },
    chemicalControl: {
      en: "Spray Agrimycin-100 (15-20g) + Copper Oxychloride (500g) mixed in 200 liters of water per acre.",
      hi: "एकड़ भर के लिए 200 लीटर पानी में एग्रीमाइसिन-100 (15-20 ग्राम) + कॉपर ऑक्सीक्लोराइड (500 ग्राम) मिलाकर छिड़काव करें।"
    },
    description: {
      en: "A bacterial disease that affects photosynthesis by destroying leaf tissues, leading to poor grain filling.",
      hi: "एक जीवाणु जनित रोग जो पत्तियों के ऊतकों को नष्ट करके प्रकाश संश्लेषण को प्रभावित करता है, जिससे दाने ठीक से नहीं भर पाते।"
    }
  },
  {
    id: "wheat-rust",
    cropId: "wheat",
    cropName: { en: "Wheat", hi: "गेहूं" },
    name: { en: "Yellow (Stripe) Rust", hi: "पीला रतुआ (येलो रस्ट)" },
    scientificName: "Puccinia striiformis",
    severity: "high",
    symptoms: {
      en: "Yellowish-orange powdery pustules arranged in linear stripes along the leaf veins. The yellow powder rubs off easily on fingers or clothing.",
      hi: "पत्तियों की नसों के समानांतर पीली-नारंगी रंग की पाउडर जैसी धारियां बन जाती हैं। छूने पर यह पीला पाउडर उंगलियों या कपड़ों पर आसानी से लग जाता है।"
    },
    prevention: {
      en: "Sow seeds early (before mid-November). Cultivate rust-resistant varieties approved for your region.",
      hi: "समय पर बुवाई करें (15 नवंबर से पहले)। अपने क्षेत्र के लिए स्वीकृत पीला रतुआ रोधी किस्मों की खेती करें।"
    },
    organicControl: {
      en: "Spray fermented sour buttermilk (diluted 1:10 with water) or Vermiwash spray to suppress fungal spore germination.",
      hi: "कवक बीजाणुओं के अंकुरण को रोकने के लिए खट्टी छाछ (पानी के साथ 1:10 अनुपात में) या वर्मीवॉश का छिड़काव करें।"
    },
    chemicalControl: {
      en: "Spray Propiconazole 25 EC @ 1 ml/liter of water (200 ml in 200 liters of water per acre) immediately upon spotting symptoms.",
      hi: "लक्षण दिखते ही प्रोपिकोनाजोल 25 EC का 1 मिलीलीटर प्रति लीटर पानी (200 मिलीलीटर दवा 200 लीटर पानी में प्रति एकड़) की दर से छिड़काव करें।"
    },
    description: {
      en: "A wind-borne fungal disease that thrives in cool, humid temperatures and can quickly spread across large agricultural zones.",
      hi: "हवा से फैलने वाला एक फंगल रोग जो ठंडे, नम मौसम में तेजी से बढ़ता है और बड़े कृषि क्षेत्रों में फैल सकता है।"
    }
  },
  {
    id: "potato-blight",
    cropId: "potato",
    cropName: { en: "Potato", hi: "आलू का पछेती झुलसा (लेट ब्लाइट)" },
    name: { en: "Late Blight", hi: "पछेती झुलसा रोग" },
    scientificName: "Phytophthora infestans",
    severity: "high",
    symptoms: {
      en: "Water-soaked dark green/black lesions on leaf margins. Under humid conditions, a white downy growth appears on the lower side of leaves. Tubers show brownish dry rot inside.",
      hi: "पत्तियों के किनारों पर काले/गहरे हरे रंग के भीगे हुए धब्बे। नम वातावरण में पत्तियों के निचले हिस्से पर सफेद रंग की रुई जैसी फंगस दिखती है। आलू के अंदर भूरे रंग की सूखी सड़न दिखाई देती है।"
    },
    prevention: {
      en: "Use certified disease-free seed tubers. Space rows properly to ensure ventilation. Destroy previous crop residues.",
      hi: "प्रमाणित रोगमुक्त बीज कंदों का उपयोग करें। हवा के आवागमन के लिए कतारों की दूरी सही रखें। पुरानी फसल के अवशेषों को नष्ट कर दें।"
    },
    organicControl: {
      en: "Foliar spray of Trichoderma viride @ 5g/liter or Copper Hydroxide formulations.",
      hi: "ट्राइकोडेर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर पत्तियों पर छिड़काव करें या कॉपर हाइड्रॉक्साइड का छिड़काव करें।"
    },
    chemicalControl: {
      en: "Spray Mancozeb 75 WP @ 2g/liter of water as prophylactic, or Metalaxyl + Mancozeb (Ridomil) @ 2.5g/liter upon infection.",
      hi: "बचाव के लिए मैनकोजेब 75 WP 2 ग्राम प्रति लीटर पानी में, या संक्रमण होने पर मेटालैक्सिल + मैनकोजेब (रिडोमिल) 2.5 ग्राम प्रति लीटर पानी में मिलाकर स्प्रे करें।"
    },
    description: {
      en: "Historically famous for causing the Irish Potato Famine, this disease destroys leaves and rots tubers rapidly in damp cool weather.",
      hi: "ऐतिहासिक रूप से आयरिश आलू अकाल का कारण बनने वाला यह रोग, ठंडे और नम मौसम में पत्तियों को नष्ट कर देता है और आलू को तेजी से सड़ाता है।"
    }
  },
  {
    id: "cotton-bollworm",
    cropId: "cotton",
    cropName: { en: "Cotton", hi: "कपास" },
    name: { en: "American Bollworm", hi: "अमेरिकी सुंडी (डोका सुंडी)" },
    scientificName: "Helicoverpa armigera",
    severity: "high",
    symptoms: {
      en: "Holes in square buds and bolls. Caterpillars feed with their heads inside the boll and bodies hanging outside. Presence of dark green droppings on leaves.",
      hi: "कलियों और गूलर (बॉल्स) में छिद्र होना। सुंडियां गूलर के अंदर अपना सिर घुसाकर खाती हैं और उनका शरीर बाहर लटका रहता है। पत्तियों पर गहरे हरे रंग के मल की उपस्थिति।"
    },
    prevention: {
      en: "Sow Bt Cotton varieties. Plant trap crops like Okra or Marigold around the field borders. Install pheromone traps (5 per acre).",
      hi: "बीटी कपास (Bt Cotton) किस्मों की बुवाई करें। खेत की सीमाओं पर भिंडी या गेंदा जैसी जाल फसलें (ट्रैप क्रॉप्स) लगाएं। फेरोमोन ट्रैप (5 प्रति एकड़) लगाएं।"
    },
    organicControl: {
      en: "Spray Neem Seed Kernel Extract (NSKE 5%) or apply Bacillus thuringiensis (Bt) formulation @ 2g/liter of water.",
      hi: "नीम बीज गिरी का अर्क (NSKE 5%) स्प्रे करें या बैसिलस थुरिंजिएंसिस (Bt) घोल 2 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।"
    },
    chemicalControl: {
      en: "Spray Spinosad 45 SC @ 0.3 ml/liter or Emamectin Benzoate 5 SG @ 0.4 g/liter of water.",
      hi: "स्पिनोसैड 45 SC को 0.3 मिलीलीटर या एमामेक्टिन बेंजोएट 5 SG को 0.4 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।"
    },
    description: {
      en: "A devastating chewing pest that attacks squares, flowers, and bolls, leading to massive lint quality and yield reduction.",
      hi: "एक विनाशकारी चबाने वाला कीट जो कपास के फूलों, कलियों और गूलर पर हमला करता है, जिससे रुई की गुणवत्ता और उपज में भारी कमी आती है।"
    }
  }
];

/**
 * Filter diseases by crop and search query
 * @param {string} cropFilter - Crop ID or 'all'
 * @param {string} query - Search string
 * @returns {Array} - Matching pests
 */
export function searchPests(cropFilter, query = "") {
  return PESTS_DB.filter(pest => {
    const matchesCrop = cropFilter === "all" || pest.cropId === cropFilter;
    
    const term = query.toLowerCase().trim();
    const matchesQuery = !term || 
      pest.name.en.toLowerCase().includes(term) || 
      pest.name.hi.toLowerCase().includes(term) || 
      pest.scientificName.toLowerCase().includes(term) ||
      pest.cropName.en.toLowerCase().includes(term) ||
      pest.cropName.hi.toLowerCase().includes(term) ||
      pest.symptoms.en.toLowerCase().includes(term) ||
      pest.symptoms.hi.toLowerCase().includes(term);

    return matchesCrop && matchesQuery;
  });
}
