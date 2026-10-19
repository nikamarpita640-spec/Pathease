// B. Y. L. Nair Charitable Hospital, Mumbai Central
// Indoor Navigation Wayfinding Data Model
// Note: Geometry is an illustrative architectural layout designed for prototype validation
// and ready for survey-verified CAD/GeoJSON drop-in.

export const copy = {
  en: {
    eyebrow: 'NAIR HOSPITAL · MUMBAI CENTRAL',
    title: 'Where do you need to go?',
    start: 'Starting point',
    chooseStart: 'Choose your starting point',
    useLocation: 'Use my location',
    destinations: 'Add destinations',
    search: 'Search departments, rooms and services',
    add: 'Add',
    selected: 'Your selected path',
    routeHint: 'Stops stay in the order you choose.',
    startNav: 'Start navigation',
    empty: 'Your stops will appear here',
    needStop: 'Choose a starting point and add at least one stop.',
    nav: 'Navigation',
    destination: 'Current destination',
    next: 'Next stop',
    straight: 'Continue straight along the corridor',
    turnLeft: 'Turn left into the corridor',
    turnRight: 'Turn right into the corridor',
    turnLeftAhead: 'In {dist} m, turn left',
    turnRightAhead: 'In {dist} m, turn right',
    straightAhead: 'Continue straight for {dist} m',
    takeLiftUp: 'Take the lift or stairs to the 1st floor',
    takeLiftDown: 'Take the lift or stairs to the ground floor',
    approaching: 'Approaching {dest} ahead',
    arrived: 'You have arrived at {dest}',
    iveArrived: 'I’ve arrived',
    nextStopAction: 'Next destination',
    move: 'Advance checkpoint',
    exitNav: 'Exit',
    completed: 'You’ve arrived!',
    completeText: 'You have completed all your selected stops at Nair Hospital.',
    newRoute: 'Plan another route',
    floor: 'Floor',
    ground: 'Ground floor',
    first: '1st floor',
    stop: 'Stop',
    of: 'of',
    remaining: 'Remaining distance',
    estTime: 'Est. time',
    locationMsg: 'Select a mapped hospital entrance or checkpoint. Standard GPS is not reliable indoors.',
    noResults: 'No matching mapped destinations.',
    routeError: 'A valid indoor corridor route is not available for this stop. Please select another destination.',
    planning: 'Back to planner',
    destinationLabel: 'Destination',
    current: 'You are here',
    simulated: 'Preview movement',
    simulationNotice: 'Simulated preview · Indoor positioning (QR/BLE) ready',
    useMap: 'Illustrative wayfinding geometry · Hospital survey verification required for construction accuracy.',
    legendPosition: 'Your position',
    legendRoute: 'Corridor route',
    legendDest: 'Destination',
    recenter: 'Recenter',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    switchFloor: 'Switch floor',
    scanCheckpoint: 'Scan Checkpoint (QR)',
    scanNextQr: 'Scan Next Checkpoint',
    scanToStart: 'Scan QR at Your Location to Start',
    confirmedPosition: 'Confirmed Checkpoint',
    scanRequiredMsg: 'Please scan a registered hospital checkpoint to confirm your starting location.',
    unverifiedDestMsg: 'A verified indoor route to this destination is not available yet in the corridor directory.',
    checkpointPlacard: 'Checkpoint'
  },
  hi: {
    eyebrow: 'नायर अस्पताल · मुंबई सेंट्रल',
    title: 'आपको कहाँ जाना है?',
    start: 'शुरुआती स्थान',
    chooseStart: 'शुरुआती स्थान चुनें',
    useLocation: 'मेरा स्थान इस्तेमाल करें',
    destinations: 'जगह जोड़ें',
    search: 'विभाग, कमरे और सुविधाएँ खोजें',
    add: 'जोड़ें',
    selected: 'आपका चुना हुआ रास्ता',
    routeHint: 'आपके चुने हुए क्रम में ही पड़ाव रहेंगे।',
    startNav: 'रास्ता शुरू करें',
    empty: 'आपके चुने हुए पड़ाव यहाँ दिखेंगे',
    needStop: 'शुरुआती स्थान चुनें और कम से कम एक पड़ाव जोड़ें।',
    nav: 'मार्गदर्शन',
    destination: 'अभी का गंतव्य',
    next: 'अगला पड़ाव',
    straight: 'गलियारे में सीधे आगे बढ़ें',
    turnLeft: 'गलियारे में बाएँ मुड़ें',
    turnRight: 'गलियारे में दाएँ मुड़ें',
    turnLeftAhead: '{dist} मी. में बाएँ मुड़ें',
    turnRightAhead: '{dist} मी. में दाएँ मुड़ें',
    straightAhead: '{dist} मी. तक सीधे चलें',
    takeLiftUp: 'पहली मंज़िल के लिए लिफ्ट या सीढ़ियों का उपयोग करें',
    takeLiftDown: 'भूतल के लिए लिफ्ट या सीढ़ियों का उपयोग करें',
    approaching: '{dest} सामने है',
    arrived: 'आप {dest} पर पहुँच गए हैं',
    iveArrived: 'मैं पहुँच गया/गई',
    nextStopAction: 'अगला गंतव्य',
    move: 'अगला चेकपॉइंट',
    exitNav: 'बाहर निकलें',
    completed: 'आप पहुँच गए!',
    completeText: 'नायर अस्पताल में आपके सभी चुने हुए पड़ाव पूरे हो गए।',
    newRoute: 'नया रास्ता चुनें',
    floor: 'मंज़िल',
    ground: 'भूतल',
    first: 'पहली मंज़िल',
    stop: 'पड़ाव',
    of: 'में से',
    remaining: 'शेष दूरी',
    estTime: 'अनुमानित समय',
    locationMsg: 'अस्पताल में अपना शुरुआती चेकपॉइंट चुनें। बाह्य GPS अंदर सटीक नहीं होता।',
    noResults: 'कोई मिलती-जुलती जगह नहीं मिली।',
    routeError: 'इस जगह तक गलियारा मार्ग उपलब्ध नहीं है। दूसरी जगह चुनें।',
    planning: 'योजना पर वापस',
    destinationLabel: 'गंतव्य',
    current: 'आप यहाँ हैं',
    simulated: 'रास्ते का पूर्वावलोकन',
    simulationNotice: 'सिम्युलेटेड पूर्वावलोकन · इनडोर पोज़िशनिंग (QR/BLE) समर्थित',
    useMap: 'प्रतीकात्मक लेआउट · वास्तविक उपयोग से पूर्व ऑन-साइट सत्यापन आवश्यक है।',
    legendPosition: 'आपकी स्थिति',
    legendRoute: 'गलियारा मार्ग',
    legendDest: 'गंतव्य',
    recenter: 'पुनः केंद्रित करें',
    zoomIn: 'बड़ा करें',
    zoomOut: 'छोटा करें',
    switchFloor: 'मंज़िल बदलें',
    scanCheckpoint: 'चेकपॉइंट स्कैन करें (QR)',
    scanNextQr: 'अगला चेकपॉइंट स्कैन करें',
    scanToStart: 'शुरू करने के लिए अपना चेकपॉइंट QR स्कैन करें',
    confirmedPosition: 'सत्यापित चेकपॉइंट',
    scanRequiredMsg: 'कृपया अपना स्थान सत्यापित करने के लिए अस्पताल का QR चेकपॉइंट स्कैन करें।',
    unverifiedDestMsg: 'इस गंतव्य तक सत्यापित अंदरूनी रास्ता अभी उपलब्ध नहीं है।',
    checkpointPlacard: 'चेकपॉइंट'
  },
  mr: {
    eyebrow: 'नायर हॉस्पिटल · मुंबई सेंट्रल',
    title: 'तुम्हाला कुठे जायचे आहे?',
    start: 'सुरुवातीचे ठिकाण',
    chooseStart: 'सुरुवातीचे ठिकाण निवडा',
    useLocation: 'माझे स्थान वापरा',
    destinations: 'ठिकाण जोडा',
    search: 'विभाग, खोल्या आणि सुविधा शोधा',
    add: 'जोडा',
    selected: 'तुम्ही निवडलेला मार्ग',
    routeHint: 'थांबे तुम्ही निवडलेल्या क्रमानेच राहतील.',
    startNav: 'मार्ग सुरू करा',
    empty: 'तुमचे थांबे येथे दिसतील',
    needStop: 'सुरुवातीचे ठिकाण निवडा आणि किमान एक थांबा जोडा.',
    nav: 'मार्गदर्शन',
    destination: 'सध्याचे ठिकाण',
    next: 'पुढील थांबा',
    straight: 'कॉरिडॉरमधून सरळ पुढे जा',
    turnLeft: 'कॉरिडॉरमध्ये डावीकडे वळा',
    turnRight: 'कॉरिडॉरमध्ये उजवीकडे वळा',
    turnLeftAhead: '{dist} मी. मध्ये डावीकडे वळा',
    turnRightAhead: '{dist} मी. मध्ये उजवीकडे वळा',
    straightAhead: '{dist} मी. सरळ चालत राहा',
    takeLiftUp: 'पहिल्या मजल्यासाठी लिफ्ट किंवा जिना वापरा',
    takeLiftDown: 'तळमजल्यासाठी लिफ्ट किंवा जिना वापरा',
    approaching: '{dest} समोर आहे',
    arrived: 'तुम्ही {dest} येथे पोहोचला आहात',
    iveArrived: 'मी पोहोचलो/पोहोचले',
    nextStopAction: 'पुढील गंतव्य',
    move: 'पुढील चेकपॉईंट',
    exitNav: 'बाहेर पडा',
    completed: 'तुम्ही पोहोचलात!',
    completeText: 'नायर हॉस्पिटलमधील तुमचे सर्व निवडलेले थांबे पूर्ण झाले.',
    newRoute: 'नवीन मार्ग निवडा',
    floor: 'मजला',
    ground: 'तळमजला',
    first: 'पहिला मजला',
    stop: 'थांबा',
    of: 'पैकी',
    remaining: 'उरलेले अंतर',
    estTime: 'अंदाजे वेळ',
    locationMsg: 'रुग्णालयातील चेकपॉइंट निवडा. बाहेरचे GPS इमारतीमध्ये अचूक नसते.',
    noResults: 'जुळणारी ठिकाणे सापडली नाहीत.',
    routeError: 'या ठिकाणासाठी कॉरिडॉर मार्ग उपलब्ध नाही. दुसरे ठिकाण निवडा.',
    planning: 'प्लॅनरकडे परत',
    destinationLabel: 'गंतव्य',
    current: 'तुम्ही येथे आहात',
    simulated: 'मार्गाचे पूर्वावलोकन',
    simulationNotice: 'सिम्युलेटेड हालचाल · इनडोअर पोझिशनिंग (QR/BLE) सज्ज',
    useMap: 'प्रतीकात्मक मांडणी · हॉस्पिटलच्या प्रत्यक्ष तपासणीनंतरच वापरावे.',
    legendPosition: 'तुमची जागा',
    legendRoute: 'कॉरिडॉर मार्ग',
    legendDest: 'गंतव्य',
    recenter: 'मध्यभागी आणा',
    zoomIn: 'मोठे करा',
    zoomOut: 'लहान करा',
    switchFloor: 'मजला बदला',
    scanCheckpoint: 'चेकपॉईंट स्कॅन करा (QR)',
    scanNextQr: 'पुढील चेकपॉईंट स्कॅन करा',
    scanToStart: 'सुरू करण्यासाठी तुमचा चेकपॉईंट QR स्कॅन करा',
    confirmedPosition: 'निश्चित केलेला चेकपॉईंट',
    scanRequiredMsg: 'कृपया तुमचे ठिकाण निश्चित करण्यासाठी हॉस्पिटलचा QR चेकपॉईंट स्कॅन करा.',
    unverifiedDestMsg: 'या ठिकाणासाठी पडताळलेला अंतर्गत मार्ग उपलब्ध नाही.',
    checkpointPlacard: 'चेकपॉईंट'
  }
};

// Mapped places in Nair Hospital with their corresponding corridor graph nodes and metadata
export const places = [
  {
    id: 'entrance',
    name: { en: 'Main Hospital Entrance', hi: 'मुख्य अस्पताल प्रवेश द्वार', mr: 'मुख्य रुग्णालय प्रवेशद्वार' },
    short: { en: 'Main Entrance', hi: 'मुख्य प्रवेश', mr: 'मुख्य प्रवेश' },
    floor: 0,
    type: 'Entrance',
    node: 'node_entrance',
    room: null
  },
  {
    id: 'reception',
    name: { en: 'Reception / Enquiry', hi: 'रिसेप्शन / पूछताछ', mr: 'रिसेप्शन / चौकशी' },
    short: { en: 'Reception', hi: 'रिसेप्शन', mr: 'रिसेप्शन' },
    floor: 0,
    type: 'Service',
    node: 'node_reception',
    room: 'room_reception'
  },
  {
    id: 'emergency',
    name: { en: 'Casualty / Emergency Helpdesk', hi: 'आपातकालीन / कैजुअल्टी डेस्क', mr: 'तातडीची सेवा / कॅज्युअल्टी' },
    short: { en: 'Casualty / Emergency', hi: 'आपातकालीन', mr: 'कॅज्युअल्टी' },
    floor: 0,
    type: 'Emergency',
    node: 'node_emergency',
    room: 'room_emergency'
  },
  {
    id: 'billing',
    name: { en: 'Registration / Billing Counter', hi: 'पंजीकरण / बिलिंग काउंटर', mr: 'नोंदणी / बिलिंग काऊंटर' },
    short: { en: 'Registration & Billing', hi: 'पंजीकरण व बिलिंग', mr: 'नोंदणी व बिलिंग' },
    floor: 0,
    type: 'Service',
    node: 'node_billing',
    room: 'room_billing'
  },
  {
    id: 'pharmacy',
    name: { en: 'Central Pharmacy / Dispensary', hi: 'केंद्रीय फार्मेसी / दवाखाना', mr: 'मध्यवर्ती औषधालय' },
    short: { en: 'Pharmacy', hi: 'फार्मेसी', mr: 'औषधालय' },
    floor: 0,
    type: 'Service',
    node: 'node_pharmacy',
    room: 'room_pharmacy'
  },
  {
    id: 'radiology',
    name: { en: 'Sonography / Radiology · X-Ray / USG', hi: 'सोनोग्राफी / रेडियोलॉजी · एक्स-रे / USG', mr: 'सोनोग्राफी / रेडिओलॉजी · एक्स-रे / USG' },
    short: { en: 'Sonography / Radiology', hi: 'सोनोग्राफी / रेडियोलॉजी', mr: 'सोनोग्राफी / रेडिओलॉजी' },
    floor: 0,
    type: 'Diagnostics',
    node: 'node_radiology',
    room: 'room_radiology'
  },
  {
    id: 'pathology',
    name: { en: 'Central Pathology & Blood Collection', hi: 'पैथोलॉजी व रक्त संग्रह केंद्र', mr: 'पॅथॉलॉजी व रक्त नमुना केंद्र' },
    short: { en: 'Pathology Lab', hi: 'पैथोलॉजी लैब', mr: 'पॅथॉलॉजी लॅब' },
    floor: 0,
    type: 'Diagnostics',
    node: 'node_pathology',
    room: 'room_pathology'
  },
  {
    id: 'opd',
    name: { en: 'OPD Building · Ground Floor Consultation', hi: 'ओपीडी भवन · भूतल परामर्श कक्ष', mr: 'ओपीडी इमारत · तळमजला तपासणी कक्ष' },
    short: { en: 'General OPD', hi: 'ओपीडी भवन', mr: 'ओपीडी इमारत' },
    floor: 0,
    type: 'Department',
    node: 'node_opd',
    room: 'room_opd'
  },
  {
    id: 'ortho',
    name: { en: 'Orthopaedics OPD (OPD 14/15)', hi: 'ऑर्थोपेडिक्स ओपीडी (ओपीडी 14/15)', mr: 'ऑर्थोपेडिक्स ओपीडी (ओपीडी १४/१५)' },
    short: { en: 'Orthopaedics OPD', hi: 'ऑर्थोपेडिक्स', mr: 'ऑर्थोपेडिक्स' },
    floor: 0,
    type: 'Department',
    node: 'node_ortho',
    room: 'room_ortho'
  },
  {
    id: 'lift',
    name: { en: 'Central Lift & Stairwell Lobby', hi: 'केंद्रीय लिफ्ट व सीढ़ियाँ', mr: 'मध्यवर्ती लिफ्ट व जिना' },
    short: { en: 'Lift / Stairs', hi: 'लिफ्ट / सीढ़ियाँ', mr: 'लिफ्ट / जिना' },
    floor: 0,
    type: 'Connection',
    node: 'node_lift_g',
    room: 'room_lift_g'
  },
  {
    id: 'peds',
    name: { en: 'Paediatrics OPD · OPD 22 (1st Floor)', hi: 'बाल रोग ओपीडी · ओपीडी 22 (पहली मंज़िल)', mr: 'बालरोग ओपीडी · ओपीडी २२ (पहिला मजला)' },
    short: { en: 'Paediatrics OPD', hi: 'बाल रोग ओपीडी', mr: 'बालरोग ओपीडी' },
    floor: 1,
    type: 'Department',
    node: 'node_peds_1f',
    room: 'room_peds_1f'
  },
  {
    id: 'medicine',
    name: { en: 'Medicine OPD · 1st Floor', hi: 'मेडिसिन ओपीडी · पहली मंज़िल', mr: 'मेडिसिन ओपीडी · पहिला मजला' },
    short: { en: 'Medicine OPD', hi: 'मेडिसिन ओपीडी', mr: 'मेडिसिन ओपीडी' },
    floor: 1,
    type: 'Department',
    node: 'node_med_1f',
    room: 'room_med_1f'
  },
  {
    id: 'surgery',
    name: { en: 'Surgery OPD · 1st Floor', hi: 'सर्जरी ओपीडी · पहली मंज़िल', mr: 'सर्जरी ओपीडी · पहिला मजला' },
    short: { en: 'Surgery OPD', hi: 'सर्जरी ओपीडी', mr: 'सर्जरी ओपीडी' },
    floor: 1,
    type: 'Department',
    node: 'node_surg_1f',
    room: 'room_surg_1f'
  },
  {
    id: 'junction',
    name: { en: 'Central Corridor Crossway', hi: 'केंद्रीय गलियारा चौराहा', mr: 'मध्यवर्ती कॉरिडॉर चौक' },
    short: { en: 'Central Junction', hi: 'मुख्य चौराहा', mr: 'मुख्य चौक' },
    floor: 0,
    type: 'Checkpoint',
    node: 'c_mid_spine',
    room: null
  }
];

// Room geometry with subtle architectural warm beige styling
export const floorRooms = {
  0: [
    { id: 'room_emergency', x: 230, y: 540, w: 175, h: 90, label: 'EMERGENCY / CASUALTY', sub: 'Ground floor · Triage desk' },
    { id: 'room_reception', x: 495, y: 540, w: 175, h: 90, label: 'RECEPTION & ENQUIRY', sub: 'Information & Assistance' },
    { id: 'room_pharmacy', x: 50, y: 395, w: 108, h: 125, label: 'CENTRAL PHARMACY', sub: 'Dispensary & Medicine counter' },
    { id: 'room_ortho', x: 230, y: 400, w: 175, h: 88, label: 'ORTHOPAEDICS OPD', sub: 'OPD 14 / 15 · Consultation' },
    { id: 'room_billing', x: 495, y: 400, w: 175, h: 88, label: 'REGISTRATION & BILLING', sub: 'Patient tokens & Payments' },
    { id: 'room_bloodbank', x: 742, y: 395, w: 108, h: 125, label: 'BLOOD BANK', sub: 'Donor & Storage unit' },
    { id: 'room_lift_g', x: 230, y: 265, w: 175, h: 80, label: 'LIFT & STAIRS LOBBY', sub: 'Vertical Access · 1F Connection' },
    { id: 'room_opd', x: 495, y: 265, w: 175, h: 80, label: 'GENERAL OPD CLINIC', sub: 'Clinical Consultation' },
    { id: 'room_pathology', x: 230, y: 80, w: 175, h: 120, label: 'PATHOLOGY LABORATORY', sub: 'Clinical blood & sample tests' },
    { id: 'room_radiology', x: 495, y: 80, w: 175, h: 120, label: 'SONOGRAPHY / RADIOLOGY', sub: 'X-Ray · USG · CT Scan' },
    { id: 'room_admin', x: 50, y: 80, w: 108, h: 140, label: 'ADMIN / RECORDS', sub: 'Hospital Superintendent' },
    { id: 'room_store', x: 742, y: 80, w: 108, h: 140, label: 'MEDICAL STORE', sub: 'Clinical supplies' }
  ],
  1: [
    { id: 'room_waiting_1f', x: 230, y: 540, w: 440, h: 90, label: '1ST FLOOR WAITING HALL', sub: 'Patient seating & Nursing desk' },
    { id: 'room_surg_1f', x: 230, y: 400, w: 175, h: 88, label: 'SURGERY OPD', sub: 'Clinical Consultation' },
    { id: 'room_records_1f', x: 495, y: 400, w: 175, h: 88, label: 'SPECIALITY CLINICS', sub: 'Super-speciality departments' },
    { id: 'room_ward_west', x: 50, y: 395, w: 108, h: 125, label: 'DAY CARE WARD', sub: 'Observation unit' },
    { id: 'room_ward_east', x: 742, y: 395, w: 108, h: 125, label: 'SEMINAR ROOM', sub: 'Academic & Training' },
    { id: 'room_lift_1f', x: 230, y: 265, w: 175, h: 80, label: 'LIFT & STAIRS LOBBY', sub: 'Vertical Access · Ground Floor' },
    { id: 'room_med_1f', x: 495, y: 265, w: 175, h: 80, label: 'MEDICINE OPD', sub: 'Clinical Consultation' },
    { id: 'room_library_1f', x: 230, y: 80, w: 175, h: 120, label: 'MEDICAL LIBRARY', sub: 'TNMC & Nair Hospital' },
    { id: 'room_peds_1f', x: 495, y: 80, w: 175, h: 120, label: 'PAEDIATRICS OPD', sub: 'OPD 22 · Child Health' },
    { id: 'room_doctors_1f', x: 50, y: 80, w: 108, h: 140, label: 'FACULTY ROOMS', sub: 'Clinical specialists' },
    { id: 'room_immu_1f', x: 742, y: 80, w: 108, h: 140, label: 'IMMUNIZATION CLINIC', sub: 'Vaccination & Well-baby' }
  ]
};

// Connected indoor corridor graph nodes
// Each node has strict x, y coordinates and a floor index.
// Scale factor: 1 SVG pixel ≈ 0.22 meters.
export const graphNodes = {
  // Ground Floor Corridor Walkway Nodes
  node_entrance: { id: 'node_entrance', x: 450, y: 648, floor: 0, name: 'Main Entrance Door' },
  c_foyer_entrance: { id: 'c_foyer_entrance', x: 450, y: 585, floor: 0, name: 'Entrance Foyer' },
  c_foyer_junction: { id: 'c_foyer_junction', x: 450, y: 512, floor: 0, name: 'South Spine Junction' },
  c_south_west: { id: 'c_south_west', x: 185, y: 512, floor: 0, name: 'South-West Junction' },
  c_south_east: { id: 'c_south_east', x: 715, y: 512, floor: 0, name: 'South-East Junction' },
  c_mid_spine: { id: 'c_mid_spine', x: 450, y: 375, floor: 0, name: 'Central Crossway' },
  c_mid_west: { id: 'c_mid_west', x: 185, y: 375, floor: 0, name: 'West Corridor Mid' },
  c_mid_east: { id: 'c_mid_east', x: 715, y: 375, floor: 0, name: 'East Corridor Mid' },
  c_north_hub: { id: 'c_north_hub', x: 450, y: 230, floor: 0, name: 'North Spine Junction' },
  c_north_west: { id: 'c_north_west', x: 185, y: 230, floor: 0, name: 'North-West Junction' },
  c_north_east: { id: 'c_north_east', x: 715, y: 230, floor: 0, name: 'North-East Junction' },
  c_north_spine_end: { id: 'c_north_spine_end', x: 450, y: 100, floor: 0, name: 'North Wing Corridor' },

  // Ground Floor Room Doors and Interior Pins
  d_emergency: { id: 'd_emergency', x: 428, y: 585, floor: 0, name: 'Emergency Door' },
  node_emergency: { id: 'node_emergency', x: 317, y: 585, floor: 0, name: 'Emergency Counter' },

  d_reception: { id: 'd_reception', x: 472, y: 585, floor: 0, name: 'Reception Door' },
  node_reception: { id: 'node_reception', x: 582, y: 585, floor: 0, name: 'Reception Desk' },

  d_pharmacy: { id: 'd_pharmacy', x: 158, y: 455, floor: 0, name: 'Pharmacy Door' },
  node_pharmacy: { id: 'node_pharmacy', x: 104, y: 455, floor: 0, name: 'Pharmacy Counter' },

  d_ortho: { id: 'd_ortho', x: 428, y: 444, floor: 0, name: 'Ortho OPD Door' },
  node_ortho: { id: 'node_ortho', x: 317, y: 444, floor: 0, name: 'Orthopaedics Consultation' },

  d_billing: { id: 'd_billing', x: 472, y: 444, floor: 0, name: 'Billing Door' },
  node_billing: { id: 'node_billing', x: 582, y: 444, floor: 0, name: 'Billing Counter' },

  d_lift_g: { id: 'd_lift_g', x: 428, y: 305, floor: 0, name: 'Ground Lift Door' },
  node_lift_g: { id: 'node_lift_g', x: 317, y: 305, floor: 0, name: 'Ground Lift Lobby' },

  d_opd: { id: 'd_opd', x: 472, y: 305, floor: 0, name: 'General OPD Door' },
  node_opd: { id: 'node_opd', x: 582, y: 305, floor: 0, name: 'General OPD Clinic' },

  d_pathology: { id: 'd_pathology', x: 317, y: 208, floor: 0, name: 'Pathology Door' },
  node_pathology: { id: 'node_pathology', x: 317, y: 140, floor: 0, name: 'Pathology Desk' },

  d_radiology: { id: 'd_radiology', x: 582, y: 208, floor: 0, name: 'Radiology Door' },
  node_radiology: { id: 'node_radiology', x: 582, y: 140, floor: 0, name: 'Radiology Waiting' },

  // First Floor Corridor Walkway Nodes
  c1_foyer_junction: { id: 'c1_foyer_junction', x: 450, y: 512, floor: 1, name: '1F South Spine Junction' },
  c1_south_west: { id: 'c1_south_west', x: 185, y: 512, floor: 1, name: '1F South-West Junction' },
  c1_south_east: { id: 'c1_south_east', x: 715, y: 512, floor: 1, name: '1F South-East Junction' },
  c1_mid_spine: { id: 'c1_mid_spine', x: 450, y: 375, floor: 1, name: '1F Central Crossway' },
  c1_mid_west: { id: 'c1_mid_west', x: 185, y: 375, floor: 1, name: '1F West Corridor Mid' },
  c1_mid_east: { id: 'c1_mid_east', x: 715, y: 375, floor: 1, name: '1F East Corridor Mid' },
  c1_north_hub: { id: 'c1_north_hub', x: 450, y: 230, floor: 1, name: '1F North Spine Junction' },
  c1_north_west: { id: 'c1_north_west', x: 185, y: 230, floor: 1, name: '1F North-West Junction' },
  c1_north_east: { id: 'c1_north_east', x: 715, y: 230, floor: 1, name: '1F North-East Junction' },
  c1_north_spine_end: { id: 'c1_north_spine_end', x: 450, y: 100, floor: 1, name: '1F North Wing Corridor' },

  // First Floor Room Doors and Interior Pins
  d_lift_1f: { id: 'd_lift_1f', x: 428, y: 305, floor: 1, name: '1F Lift Door' },
  node_lift_1f: { id: 'node_lift_1f', x: 317, y: 305, floor: 1, name: '1F Lift Lobby' },

  d_surg_1f: { id: 'd_surg_1f', x: 428, y: 444, floor: 1, name: 'Surgery OPD Door' },
  node_surg_1f: { id: 'node_surg_1f', x: 317, y: 444, floor: 1, name: 'Surgery OPD Clinic' },

  d_med_1f: { id: 'd_med_1f', x: 472, y: 305, floor: 1, name: 'Medicine OPD Door' },
  node_med_1f: { id: 'node_med_1f', x: 582, y: 305, floor: 1, name: 'Medicine OPD Clinic' },

  d_peds_1f: { id: 'd_peds_1f', x: 582, y: 208, floor: 1, name: 'Paediatrics Door' },
  node_peds_1f: { id: 'node_peds_1f', x: 582, y: 140, floor: 1, name: 'Paediatrics OPD 22' }
};

// Walkable connected corridor edges
// Edges only exist along the white walkable corridors and through designated doorways.
// Routes are mathematically constrained to never penetrate walls or bypass corridors.
export const graphEdges = [
  // Ground Floor Corridors
  ['node_entrance', 'c_foyer_entrance'],
  ['c_foyer_entrance', 'c_foyer_junction'],
  ['c_foyer_junction', 'c_south_west'],
  ['c_foyer_junction', 'c_south_east'],
  ['c_foyer_junction', 'c_mid_spine'],
  ['c_south_west', 'c_mid_west'],
  ['c_south_east', 'c_mid_east'],
  ['c_mid_west', 'c_north_west'],
  ['c_mid_east', 'c_north_east'],
  ['c_mid_spine', 'c_north_hub'],
  ['c_north_hub', 'c_north_west'],
  ['c_north_hub', 'c_north_east'],
  ['c_north_hub', 'c_north_spine_end'],

  // Ground Floor Doorway Connections
  ['c_foyer_entrance', 'd_emergency'],
  ['d_emergency', 'node_emergency'],

  ['c_foyer_entrance', 'd_reception'],
  ['d_reception', 'node_reception'],

  ['c_mid_west', 'd_pharmacy'],
  ['d_pharmacy', 'node_pharmacy'],

  ['c_mid_spine', 'd_ortho'],
  ['d_ortho', 'node_ortho'],

  ['c_mid_spine', 'd_billing'],
  ['d_billing', 'node_billing'],

  ['c_mid_spine', 'd_lift_g'],
  ['d_lift_g', 'node_lift_g'],

  ['c_mid_spine', 'd_opd'],
  ['d_opd', 'node_opd'],

  ['c_north_hub', 'd_pathology'],
  ['d_pathology', 'node_pathology'],

  ['c_north_hub', 'd_radiology'],
  ['d_radiology', 'node_radiology'],

  // Vertical Core Link between Ground Floor and 1st Floor
  // Virtual transit weight: 35 pixels (~8 meters walking equivalent)
  ['node_lift_g', 'node_lift_1f', 35],

  // 1st Floor Corridors
  ['c1_foyer_junction', 'c1_south_west'],
  ['c1_foyer_junction', 'c1_south_east'],
  ['c1_foyer_junction', 'c1_mid_spine'],
  ['c1_south_west', 'c1_mid_west'],
  ['c1_south_east', 'c1_mid_east'],
  ['c1_mid_west', 'c1_north_west'],
  ['c1_mid_east', 'c1_north_east'],
  ['c1_mid_spine', 'c1_north_hub'],
  ['c1_north_hub', 'c1_north_west'],
  ['c1_north_hub', 'c1_north_east'],
  ['c1_north_hub', 'c1_north_spine_end'],

  // 1st Floor Doorway Connections
  ['c1_mid_spine', 'd_lift_1f'],
  ['d_lift_1f', 'node_lift_1f'],

  ['c1_mid_spine', 'd_surg_1f'],
  ['d_surg_1f', 'node_surg_1f'],

  ['c1_mid_spine', 'd_med_1f'],
  ['d_med_1f', 'node_med_1f'],

  ['c1_north_hub', 'd_peds_1f'],
  ['d_peds_1f', 'node_peds_1f']
];

export const SCALE_METERS_PER_PIXEL = 0.22;
