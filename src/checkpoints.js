// Checkpoint Registry for B. Y. L. Nair Hospital
// Every checkpoint represents a physical QR plaque mounted on walls, columns, or doors.
// Position updates occur ONLY when a valid checkpoint is scanned.

export const checkpointRegistry = {
  'CP-ENT-01': {
    id: 'CP-ENT-01',
    qrPayload: 'CP-ENT-01',
    nodeId: 'node_entrance',
    building: 'Main OPD Building',
    wing: 'Entrance Foyer',
    floor: 0,
    coordinates: { x: 450, y: 648 },
    name: {
      en: 'Main Entrance Door Checkpoint',
      hi: 'मुख्य प्रवेश द्वार चेकपॉइंट',
      mr: 'मुख्य प्रवेशद्वार चेकपॉईंट'
    },
    description: {
      en: 'Plaque adjacent to Security Desk and Hospital Casualty gate',
      hi: 'सुरक्षा डेस्क और आपातकालीन द्वार के पास लगा फलक',
      mr: 'सुरक्षा चौकी आणि तातडीच्या प्रवेशद्वाराजवळील फलक'
    }
  },
  'CP-FOYER-01': {
    id: 'CP-FOYER-01',
    qrPayload: 'CP-FOYER-01',
    nodeId: 'c_foyer_junction',
    building: 'Main OPD Building',
    wing: 'South Spine Junction',
    floor: 0,
    coordinates: { x: 450, y: 512 },
    name: {
      en: 'Central Foyer Junction Checkpoint',
      hi: 'केंद्रीय फ़ोयर चौराहा चेकपॉइंट',
      mr: 'मध्यवर्ती दालन चौक चेकपॉईंट'
    },
    description: {
      en: 'Column placard facing Reception and Emergency Triage',
      hi: 'रिसेप्शन और आपातकालीन वार्ड के सामने खंभे पर लगा फलक',
      mr: 'रिसेप्शन आणि कॅज्युअल्टीसमोरील खांबावरील फलक'
    }
  },
  'CP-MIDSPINE-01': {
    id: 'CP-MIDSPINE-01',
    qrPayload: 'CP-MIDSPINE-01',
    nodeId: 'c_mid_spine',
    building: 'Main OPD Building',
    wing: 'Central Corridor Crossway',
    floor: 0,
    coordinates: { x: 450, y: 375 },
    name: {
      en: 'Central Corridor Crossway Checkpoint',
      hi: 'केंद्रीय गलियारा चौराहा चेकपॉइंट',
      mr: 'मध्यवर्ती कॉरिडॉर चौक चेकपॉईंट'
    },
    description: {
      en: 'Overhead crossway sign between OPD Building and Lift Lobby',
      hi: 'ओपीडी भवन और लिफ्ट लॉबी के बीच चौराहे पर लगा फलक',
      mr: 'ओपीडी इमारत आणि लिफ्ट लॉबीमधील चौकातील फलक'
    }
  },
  'CP-LIFT-G01': {
    id: 'CP-LIFT-G01',
    qrPayload: 'CP-LIFT-G01',
    nodeId: 'node_lift_g',
    building: 'Main OPD Building',
    wing: 'Vertical Transit Core',
    floor: 0,
    coordinates: { x: 317, y: 305 },
    name: {
      en: 'Ground Floor Elevator & Stair Lobby',
      hi: 'भूतल लिफ्ट व सीढ़ी लॉबी चेकपॉइंट',
      mr: 'तळमजला लिफ्ट व जिना लॉबी चेकपॉईंट'
    },
    description: {
      en: 'Wall panel outside Ground Floor Lifts 1 & 2',
      hi: 'भूतल लिफ्ट 1 और 2 के बाहर दीवार पर लगा फलक',
      mr: 'तळमजला लिफ्ट १ आणि २ बाहेरील भिंतीवरील फलक'
    }
  },
  'CP-LIFT-1F01': {
    id: 'CP-LIFT-1F01',
    qrPayload: 'CP-LIFT-1F01',
    nodeId: 'node_lift_1f',
    building: 'Main OPD Building',
    wing: 'Vertical Transit Core',
    floor: 1,
    coordinates: { x: 317, y: 305 },
    name: {
      en: '1st Floor Elevator & Stair Lobby',
      hi: 'पहली मंज़िल लिफ्ट व सीढ़ी लॉबी चेकपॉइंट',
      mr: 'पहिला मजला लिफ्ट व जिना लॉबी चेकपॉईंट'
    },
    description: {
      en: 'Wall panel outside 1st Floor Lifts 1 & 2',
      hi: 'पहली मंज़िल लिफ्ट 1 और 2 के बाहर दीवार पर लगा फलक',
      mr: 'पहिला मजला लिफ्ट १ आणि २ बाहेरील भिंतीवरील फलक'
    }
  },
  'CP-NORTH-HUB-01': {
    id: 'CP-NORTH-HUB-01',
    qrPayload: 'CP-NORTH-HUB-01',
    nodeId: 'c_north_hub',
    building: 'Main OPD Building',
    wing: 'North Diagnostic Wing',
    floor: 0,
    coordinates: { x: 450, y: 230 },
    name: {
      en: 'North Diagnostic Hub Checkpoint',
      hi: 'उत्तर डायग्नोस्टिक हब चेकपॉइंट',
      mr: 'उत्तर डायग्नोस्टिक केंद्र चेकपॉईंट'
    },
    description: {
      en: 'Corridor junction column outside Radiology and Pathology',
      hi: 'रेडियोलॉजी और पैथोलॉजी के बाहर गलियारा जंक्शन पर लगा फलक',
      mr: 'रेडिओलॉजी आणि पॅथॉलॉजीबाहेरील कॉरिडॉर जंक्शन फलक'
    }
  },
  'CP-NORTH-HUB-1F': {
    id: 'CP-NORTH-HUB-1F',
    qrPayload: 'CP-NORTH-HUB-1F',
    nodeId: 'c1_north_hub',
    building: 'Main OPD Building',
    wing: '1st Floor North Wing',
    floor: 1,
    coordinates: { x: 450, y: 230 },
    name: {
      en: '1st Floor Paediatrics Corridor Hub',
      hi: 'पहली मंज़िल बाल रोग गलियारा हब',
      mr: 'पहिला मजला बालरोग कॉरिडॉर केंद्र'
    },
    description: {
      en: 'Corridor junction outside OPD 22 Paediatrics',
      hi: 'ओपीडी 22 बाल रोग विभाग के बाहर गलियारा जंक्शन पर लगा फलक',
      mr: 'ओपीडी २२ बालरोग विभागाबाहेरील कॉरिडॉर जंक्शन फलक'
    }
  },
  'CP-BILL-01': {
    id: 'CP-BILL-01',
    qrPayload: 'CP-BILL-01',
    nodeId: 'node_billing',
    building: 'Main OPD Building',
    wing: 'East Service Wing',
    floor: 0,
    coordinates: { x: 582, y: 444 },
    name: {
      en: 'Central Registration & Billing Counter Checkpoint',
      hi: 'केंद्रीय पंजीकरण व बिलिंग काउंटर चेकपॉइंट',
      mr: 'मध्यवर्ती नोंदणी व बिलिंग काऊंटर चेकपॉईंट'
    },
    description: {
      en: 'Wall plaque beside Patient Token Counter 1',
      hi: 'टोकन काउंटर 1 के पास दीवार पर लगा फलक',
      mr: 'टोकन काऊंटर १ जवळील भिंतीवरील फलक'
    }
  },
  'CP-PHARM-01': {
    id: 'CP-PHARM-01',
    qrPayload: 'CP-PHARM-01',
    nodeId: 'node_pharmacy',
    building: 'Main OPD Building',
    wing: 'West Service Wing',
    floor: 0,
    coordinates: { x: 104, y: 455 },
    name: {
      en: 'Central Pharmacy Dispensary Desk Checkpoint',
      hi: 'केंद्रीय फार्मेसी वितरण काउंटर चेकपॉइंट',
      mr: 'मध्यवर्ती औषधालय वितरण काऊंटर चेकपॉईंट'
    },
    description: {
      en: 'Plaque mounted at Pharmacy Window 2',
      hi: 'फार्मेसी खिड़की 2 पर लगा फलक',
      mr: 'औषधालय खिडकी २ वरील फलक'
    }
  },
  'CP-RAD-01': {
    id: 'CP-RAD-01',
    qrPayload: 'CP-RAD-01',
    nodeId: 'node_radiology',
    building: 'Main OPD Building',
    wing: 'Diagnostics Wing',
    floor: 0,
    coordinates: { x: 582, y: 140 },
    name: {
      en: 'Sonography & Radiology Waiting Lobby Checkpoint',
      hi: 'सोनोग्राफी व रेडियोलॉजी प्रतीक्षा क्षेत्र चेकपॉइंट',
      mr: 'सोनोग्राफी व रेडिओलॉजी प्रतीक्षा कक्ष चेकपॉईंट'
    },
    description: {
      en: 'Plaque outside Ultrasound / X-Ray Consultation Desk',
      hi: 'अल्ट्रासाउंड / एक्स-रे परामर्श डेस्क के बाहर लगा फलक',
      mr: 'अल्ट्रासाउंड / एक्स-रे तपासणी कक्षाबाहेरील फलक'
    }
  },
  'CP-PEDS-01': {
    id: 'CP-PEDS-01',
    qrPayload: 'CP-PEDS-01',
    nodeId: 'node_peds_1f',
    building: 'Main OPD Building',
    wing: '1st Floor Child Health',
    floor: 1,
    coordinates: { x: 582, y: 140 },
    name: {
      en: 'Paediatrics OPD 22 Entrance Checkpoint',
      hi: 'बाल रोग ओपीडी 22 प्रवेश द्वार चेकपॉइंट',
      mr: 'बालरोग ओपीडी २२ प्रवेशद्वार चेकपॉईंट'
    },
    description: {
      en: 'Doorway plaque at OPD 22 Consultation Room',
      hi: 'ओपीडी 22 परामर्श कक्ष के दरवाजे पर लगा फलक',
      mr: 'ओपीडी २२ तपासणी कक्षाच्या दरवाजावरील फलक'
    }
  }
};

/**
 * Validate and resolve scanned QR payload
 * Supports raw ID string, JSON payload, or URL with checkpoint parameter.
 */
export function validateCheckpointQr(payload) {
  if (!payload || typeof payload !== 'string') {
    return {
      valid: false,
      error: 'Invalid QR code data. Please scan a genuine PathEase checkpoint plaque.'
    };
  }

  const raw = payload.trim();
  let candidateId = raw;

  // 1. JSON payload support: { "type": "checkpoint", "id": "CP-ENT-01" }
  if (raw.startsWith('{') && raw.endsWith('}')) {
    try {
      const parsed = JSON.parse(raw);
      candidateId = parsed.id || parsed.checkpointId || parsed.checkpoint || candidateId;
    } catch {
      // ignore JSON parse error and fallback to raw string
    }
  }

  // 2. URL payload support: https://pathease.nair.gov.in/scan?id=CP-ENT-01
  if (raw.includes('checkpoint') || raw.includes('id=')) {
    try {
      const url = new URL(raw);
      const q = url.searchParams.get('id') || url.searchParams.get('checkpoint');
      if (q) candidateId = q;
    } catch {
      const match = raw.match(/[?&](?:id|checkpoint)=([A-Za-z0-9_-]+)/);
      if (match) candidateId = match[1];
    }
  }

  const normalized = candidateId.trim().toUpperCase();
  const matched = checkpointRegistry[normalized];

  if (!matched) {
    return {
      valid: false,
      scannedText: raw,
      error: `Unregistered Checkpoint: "${candidateId}". This QR code is not in Nair Hospital's verified indoor checkpoint directory.`
    };
  }

  return {
    valid: true,
    checkpoint: matched
  };
}

/**
 * Get checkpoint corresponding to a graph node, if any
 */
export function getCheckpointForNode(nodeId) {
  return Object.values(checkpointRegistry).find((cp) => cp.nodeId === nodeId) || null;
}
