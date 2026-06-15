/* Government Schemes Database & Matcher */

export const SCHEMES_DB = [
  {
    id: "pm-kisan",
    name: {
      en: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      hi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)"
    },
    department: {
      en: "Ministry of Agriculture & Farmers Welfare",
      hi: "कृषि एवं किसान कल्याण मंत्रालय"
    },
    category: "subsidy",
    categoryLabel: { en: "Direct Benefit", hi: "सीधा लाभ" },
    benefit: {
      en: "₹6,000 per year paid in three equal installments of ₹2,000 directly to bank accounts.",
      hi: "₹6,000 प्रति वर्ष, ₹2,000 की तीन समान किश्तों में सीधे बैंक खातों में।"
    },
    eligibilityDesc: {
      en: "All landholding farmer families. Excludes institutional landowners, government employees, income taxpayers, and professionals.",
      hi: "सभी भूमिधारक किसान परिवार। संस्थागत भूस्वामियों, सरकारी कर्मचारियों, आयकर दाताओं और पेशेवरों को छोड़कर।"
    },
    howToApply: {
      en: "Register online via the PM-Kisan portal, or visit the nearest Common Service Centre (CSC) or local revenue officer (Patwari).",
      hi: "पीएम-किसान पोर्टल के माध्यम से ऑनलाइन पंजीकरण करें, या निकटतम सामान्य सेवा केंद्र (सीएससी) या स्थानीय पटवारी से संपर्क करें।"
    },
    rules: {
      requireFarmer: true,
      maxLand: null, // Open to all sizes now, though originally limited
      minAge: 18,
      maxAge: null,
      excludeTaxpayers: true
    },
    description: {
      en: "An initiative by the Government of India to provide income support to all landholding farmer families across the country.",
      hi: "देश भर के सभी भूमिधारक किसान परिवारों को आय सहायता प्रदान करने के लिए भारत सरकार की एक पहल।"
    }
  },
  {
    id: "pmfby",
    name: {
      en: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      hi: "पीएमएफबीवाई (प्रधानमंत्री फसल बीमा योजना)"
    },
    department: {
      en: "Ministry of Agriculture & Farmers Welfare",
      hi: "कृषि एवं किसान कल्याण मंत्रालय"
    },
    category: "insurance",
    categoryLabel: { en: "Crop Insurance", hi: "फसल बीमा" },
    benefit: {
      en: "Comprehensive insurance coverage against crop failure due to natural disasters, pests, or disease. Farmers pay a low premium: 2% for Kharif, 1.5% for Rabi, and 5% for horticultural crops.",
      hi: "प्राकृतिक आपदाओं, कीटों या बीमारी के कारण फसल खराब होने पर व्यापक बीमा सुरक्षा। किसान कम प्रीमियम देते हैं: खरीफ के लिए 2%, रबी के लिए 1.5%, और बागवानी फसलों के लिए 5%।"
    },
    eligibilityDesc: {
      en: "All farmers, including tenant and sharecropper farmers growing notified crops in notified areas are eligible.",
      hi: "सभी किसान, जिनमें अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले बटाईदार और काश्तकार किसान शामिल हैं।"
    },
    howToApply: {
      en: "Apply through the National Crop Insurance Portal (NCIP), cooperating banks, or registered insurance agents within designated deadlines.",
      hi: "अधिसूचित समय सीमा के भीतर राष्ट्रीय फसल बीमा पोर्टल (NCIP), सहकारी बैंकों या पंजीकृत बीमा एजेंटों के माध्यम से आवेदन करें।"
    },
    rules: {
      requireFarmer: true,
      maxLand: null,
      minAge: 18,
      maxAge: null,
      excludeTaxpayers: false
    },
    description: {
      en: "Yield-based crop insurance scheme to provide financial safety nets for farmers facing crop losses from sowing to post-harvest.",
      hi: "बोने से लेकर कटाई के बाद तक फसल नुकसान का सामना करने वाले किसानों को वित्तीय सुरक्षा चक्र प्रदान करने के लिए उपज-आधारित फसल बीमा योजना।"
    }
  },
  {
    id: "pmksy",
    name: {
      en: "PMKSY (PM Krishi Sinchayee Yojana - Micro Irrigation)",
      hi: "पीएमकेएसवाई (प्रधानमंत्री कृषि सिंचाई योजना - सूक्ष्म सिंचाई)"
    },
    department: {
      en: "Department of Agriculture, Cooperation & Farmers Welfare",
      hi: "कृषि, सहकारिता एवं किसान कल्याण विभाग"
    },
    category: "subsidy",
    categoryLabel: { en: "Irrigation Subsidy", hi: "सिंचाई सब्सिडी" },
    benefit: {
      en: "Up to 55% subsidy for Small & Marginal farmers and 45% subsidy for other farmers to install Drip or Sprinkler Irrigation systems ('More Crop Per Drop').",
      hi: "ड्रिप या स्प्रिंकलर सिंचाई प्रणाली स्थापित करने के लिए छोटे और सीमांत किसानों को 55% तक और अन्य किसानों को 45% तक की सब्सिडी।"
    },
    eligibilityDesc: {
      en: "Farmers owning land with an accessible water source. Cooperative members and leaseholders (minimum 7 years lease remaining) are also eligible.",
      hi: "सुलभ जल स्रोत वाली भूमि के मालिक किसान। सहकारी सदस्य और पट्टाधारक (कम से कम 7 वर्ष का पट्टा शेष) भी पात्र हैं।"
    },
    howToApply: {
      en: "Submit an application to the district horticulture/agriculture department office or online through state micro-irrigation portals.",
      hi: "जिला बागवानी/कृषि विभाग कार्यालय में या राज्य सूक्ष्म सिंचाई पोर्टल के माध्यम से ऑनलाइन आवेदन जमा करें।"
    },
    rules: {
      requireFarmer: true,
      maxLand: null,
      minAge: 18,
      maxAge: null,
      excludeTaxpayers: false
    },
    description: {
      en: "Focuses on improving water-use efficiency at the farm level through micro-irrigation technologies to ensure 'Har Khet Ko Pani'.",
      hi: "हर खेत को पानी सुनिश्चित करने के लिए सूक्ष्म सिंचाई तकनीकों के माध्यम से कृषि स्तर पर पानी के उपयोग की दक्षता में सुधार लाने पर ध्यान केंद्रित करता है।"
    }
  },
  {
    id: "pm-kmy",
    name: {
      en: "PM-KMY (Pradhan Mantri Kisan Maan-Dhan Yojana)",
      hi: "पीएम-केएमवाई (प्रधानमंत्री किसान मान-धन योजना)"
    },
    department: {
      en: "Ministry of Agriculture & Farmers Welfare (jointly with LIC)",
      hi: "कृषि एवं किसान कल्याण मंत्रालय (एलआईसी के साथ संयुक्त रूप से)"
    },
    category: "pension",
    categoryLabel: { en: "Pension Scheme", hi: "पेंशन योजना" },
    benefit: {
      en: "A assured monthly pension of ₹3,000 after attaining the age of 60 years. Requires monthly contribution of ₹55 to ₹200 depending on entry age.",
      hi: "60 वर्ष की आयु प्राप्त करने के बाद ₹3,000 की सुनिश्चित मासिक पेंशन। प्रवेश आयु के आधार पर ₹55 से ₹200 का मासिक योगदान आवश्यक है।"
    },
    eligibilityDesc: {
      en: "Small and Marginal Farmers (SMFs) aged between 18 to 40 years, owning cultivable land up to 2 hectares.",
      hi: "18 से 40 वर्ष की आयु के छोटे और सीमांत किसान (SMFs), जिनके पास 2 हेक्टेयर तक कृषि योग्य भूमि है।"
    },
    howToApply: {
      en: "Visit the nearest Common Service Centre (CSC) with Aadhaar card and Savings Bank account details.",
      hi: "आधार कार्ड और बचत बैंक खाते के विवरण के साथ निकटतम सामान्य सेवा केंद्र (सीएससी) पर जाएं।"
    },
    rules: {
      requireFarmer: true,
      maxLand: 2.0, // Strictly <= 2 hectares (Small and Marginal Farmers)
      minAge: 18,
      maxAge: 40,  // Only for entry age 18-40
      excludeTaxpayers: true
    },
    description: {
      en: "A voluntary and contributory pension scheme for old age protection and social security of Small and Marginal Farmers.",
      hi: "छोटे और सीमांत किसानों के बुढ़ापे की सुरक्षा और सामाजिक सुरक्षा के लिए एक स्वैच्छिक और अंशदायी पेंशन योजना।"
    }
  },
  {
    id: "soil-health-card",
    name: {
      en: "Soil Health Card Scheme",
      hi: "मृदा स्वास्थ्य कार्ड योजना"
    },
    department: {
      en: "Ministry of Agriculture & Farmers Welfare",
      hi: "कृषि एवं किसान कल्याण मंत्रालय"
    },
    category: "free-service",
    categoryLabel: { en: "Soil Testing", hi: "मिट्टी परीक्षण" },
    benefit: {
      en: "Free soil testing and customized report analyzing 12 chemical parameters, alongside recommended dosages of fertilizers and soil amendments.",
      hi: "निःशुल्क मिट्टी परीक्षण और 12 रासायनिक मापदंडों का विश्लेषण करने वाली अनुकूलित रिपोर्ट, साथ ही खादों और मिट्टी सुधारकों की अनुशंसित खुराक।"
    },
    eligibilityDesc: {
      en: "All landholding farmers across India are eligible. Offered completely free once every two years.",
      hi: "भारत भर के सभी भूमिधारक किसान पात्र हैं। हर दो साल में एक बार पूरी तरह से मुफ्त में प्रदान की जाती है।"
    },
    howToApply: {
      en: "Contact local agriculture extension officers, block development offices, or submit soil samples at the nearest Soil Testing Lab.",
      hi: "स्थानीय कृषि विस्तार अधिकारियों, ब्लॉक विकास कार्यालयों से संपर्क करें, या निकटतम मृदा परीक्षण प्रयोगशाला में मिट्टी के नमूने जमा करें।"
    },
    rules: {
      requireFarmer: true,
      maxLand: null,
      minAge: 18,
      maxAge: null,
      excludeTaxpayers: false
    },
    description: {
      en: "Helps farmers understand their soil quality, saving costs on excessive fertilizer usage and improving yield crop choices.",
      hi: "किसानों को उनकी मिट्टी की गुणवत्ता समझने में मदद करता है, जिससे अत्यधिक उर्वरक उपयोग पर लागत बचती है और फसल की उपज में सुधार होता है।"
    }
  }
];

/**
 * Match schemes based on farmer demographic profile
 * @param {Object} profile - { age, landArea, occupationType, isTaxpayer }
 * @returns {Array} - Array of matched schemes with status tags
 */
export function evaluateEligibility(profile) {
  const { age, landArea, occupationType, isTaxpayer } = profile;
  
  const isFarmer = occupationType === "farmer";

  return SCHEMES_DB.map(scheme => {
    const rules = scheme.rules;
    const reasons = [];
    let isEligible = true;

    // Check occupation
    if (rules.requireFarmer && !isFarmer) {
      isEligible = false;
      reasons.push({
        en: "Must be a practicing farmer.",
        hi: "कृषि करने वाला किसान होना चाहिए।"
      });
    }

    // Check age limits
    if (rules.minAge && age < rules.minAge) {
      isEligible = false;
      reasons.push({
        en: `Minimum age is ${rules.minAge} years.`,
        hi: `न्यूनतम आयु ${rules.minAge} वर्ष होनी चाहिए।`
      });
    }
    if (rules.maxAge && age > rules.maxAge) {
      isEligible = false;
      reasons.push({
        en: `Maximum entry age is ${rules.maxAge} years.`,
        hi: `अधिकतम प्रवेश आयु ${rules.maxAge} वर्ष है।`
      });
    }

    // Check landholding size
    if (rules.maxLand && landArea > rules.maxLand) {
      isEligible = false;
      reasons.push({
        en: `Land holding exceeds limit of ${rules.maxLand} hectares.`,
        hi: `भूमि का स्वामित्व ${rules.maxLand} हेक्टेयर की सीमा से अधिक है।`
      });
    }

    // Check tax status
    if (rules.excludeTaxpayers && isTaxpayer) {
      isEligible = false;
      reasons.push({
        en: "Income taxpayers are excluded.",
        hi: "आयकर दाताओं को इस योजना से बाहर रखा गया है।"
      });
    }

    return {
      ...scheme,
      isEligible,
      reasons
    };
  });
}
