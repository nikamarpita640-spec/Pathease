import React, { useState } from 'react';
import {
  Navigation as NavIcon,
  MapPin,
  Compass,
  CheckCircle2,
  Building2,
  Route,
  ArrowRight,
  Languages,
  ChevronDown,
  Menu,
  X,
  QrCode,
  CornerUpRight,
  Check,
  Search,
  Sparkles,
  Footprints
} from 'lucide-react';

const copy = {
  en: {
    brandSubtitle: 'Hospital Indoor Navigation',
    navHome: 'Home',
    navHowItWorks: 'How It Works',
    navFeatures: 'Features',
    navAbout: 'About',
    navGetStarted: 'Get Started',
    eyebrow: 'B. Y. L. NAIR HOSPITAL · MUMBAI CENTRAL',
    heroTitle: 'Every Step to Better Care.',
    heroSubtitle:
      'Find your way around the hospital with clear, simple indoor navigation. Spend less time searching and more time focusing on what matters.',
    startNavigating: 'Start Navigating',
    howItWorksBtn: 'How It Works',
    badgeQr: 'Physical QR Checkpoints',
    badgeFloors: 'Ground & 1st Floor Mapped',
    badgeGps: 'Reliable Indoor Corridor Paths',
    previewBadge: 'Indoor Route Preview',
    previewFloor: 'Ground Floor · Main Building',
    previewTurn: 'In 15 m, turn right into Central Corridor',
    previewEst: '2 min walk · 95 m to OPD 12',
    howTitle: 'How It Works',
    howEyebrow: 'SIMPLE 3-STEP WAYFINDING',
    howSubtitle: 'Navigate hospital corridors with clarity, step by step.',
    step1Title: 'Select Your Destination',
    step1Desc: 'Choose the hospital department or room you need to visit.',
    step2Title: 'Follow Your Route',
    step2Desc: 'View a clear indoor route and step-by-step directions.',
    step3Title: 'Reach Your Destination',
    step3Desc: 'Follow the available navigation guidance to find your destination.',
    featTitle: 'Features',
    featEyebrow: 'PURPOSE-BUILT WAYFINDING',
    featSubtitle: 'Designed to help patients and visitors navigate with comfort and speed.',
    feat1Title: 'Indoor hospital wayfinding',
    feat1Desc: 'Direct corridor paths connect OPDs, diagnostic laboratories, registration counters, and wards across floors.',
    feat2Title: 'Multiple destination planning',
    feat2Desc: 'Add and order multiple appointments or tests so you can visit every department efficiently.',
    feat3Title: 'Clear, step-by-step directions',
    feat3Desc: 'Corridor-accurate guidance and turn instructions derived from actual hospital layouts.',
    feat4Title: 'A simple, accessible interface',
    feat4Desc: 'High-contrast text, clear visual hierarchy, and instant trilingual translation in English, Marathi, and Hindi.',
    aboutTitle: 'About PathEase at Nair Hospital',
    aboutEyebrow: 'HOSPITAL CAMPUS CONTEXT',
    aboutText1:
      'B. Y. L. Nair Charitable Hospital in Mumbai Central is a bustling civic healthcare centre serving thousands of patients every day across multiple wings and floors.',
    aboutText2:
      'PathEase simplifies your visit by replacing confusing hallways and signage with structured indoor directions. Whether visiting an OPD clinic, pharmacy, or diagnostic lab, you can navigate with confidence.',
    statFloors: '2 Floors',
    statFloorsLabel: 'Ground & 1st Floor',
    statDest: '25+ Destinations',
    statDestLabel: 'OPDs, Labs & Services',
    statQr: '10 Checkpoints',
    statQrLabel: 'Physical QR Placards',
    ctaTitle: 'Your destination is closer than you think.',
    ctaSubtitle: 'Begin planning your route through Nair Hospital now.',
    ctaButton: 'Get Started',
    footerBrand: 'PathEase · Nair Hospital Wayfinding',
    footerNote: 'Physical QR Checkpoint Indoor Navigation · Illustrative architectural floor-plan geometry.'
  },
  mr: {
    brandSubtitle: 'रुग्णालय अंतर्गत दिशादर्शन',
    navHome: 'मुख्यपृष्ठ',
    navHowItWorks: 'कसे कार्य करते',
    navFeatures: 'वैशिष्ट्ये',
    navAbout: 'माहिती',
    navGetStarted: 'सुरुवात करा',
    eyebrow: 'बी. वाय. एल. नायर रुग्णालय · मुंबई सेंट्रल',
    heroTitle: 'चांगल्या उपचारांसाठी प्रत्येक पाऊल.',
    heroSubtitle:
      'स्पष्ट आणि सोप्या अंतर्गत दिशादर्शनासह रुग्णालयात तुमचा मार्ग शोधा. शोधण्यात कमी वेळ आणि आरोग्यावर अधिक लक्ष केंद्रित करा.',
    startNavigating: 'दिशादर्शन सुरू करा',
    howItWorksBtn: 'कसे कार्य करते',
    badgeQr: 'भौतिक क्यूआर चेकपॉइंट्स',
    badgeFloors: 'तळमजला आणि पहिला मजला',
    badgeGps: 'अचूक अंतर्गत कॉरिडोअर मार्ग',
    previewBadge: 'मार्ग पूर्वदृश्य',
    previewFloor: 'तळमजला · मुख्य इमारत',
    previewTurn: '१५ मीटर अंतरावर सेंट्रल कॉरिडोअरमध्ये उजवीकडे वळा',
    previewEst: '२ मिनिटे चालणे · ९५ मीटर अंतर',
    howTitle: 'कसे कार्य करते',
    howEyebrow: '३ सोप्या पायऱ्यांमध्ये मार्गक्रमण',
    howSubtitle: 'रुग्णालयाच्या कॉरिडोअरमध्ये आत्मविश्वासाने आणि सहजतेने फिरा.',
    step1Title: 'तुमचे गंतव्यस्थान निवडा',
    step1Desc: 'सूचीमधून तुम्हाला भेट द्यायचा असलेला विभाग किंवा खोली निवडा.',
    step2Title: 'तुमच्या मार्गाचे अनुसरण करा',
    step2Desc: 'स्पष्ट अंतर्गत मार्ग आणि वळण-दर-वळण सूचना पहा.',
    step3Title: 'गंतव्यस्थानी पोहोचा',
    step3Desc: 'गंतव्यस्थानी शांतपणे पोहोचण्यासाठी उपलब्ध मार्गदर्शनाचे अनुसरण करा.',
    featTitle: 'वैशिष्ट्ये',
    featEyebrow: 'रुग्णालय मार्गदर्शनासाठी विशेष रचना',
    featSubtitle: 'रुग्ण आणि नातेवाईकांचा गोंधळ दूर करण्यासाठी तयार केले गेले.',
    feat1Title: 'रुग्णालय अंतर्गत दिशादर्शन',
    feat1Desc: 'मजल्यांवर बाह्यरुग्ण विभाग (OPD), प्रयोगशाळा, एक्स-रे आणि वॉर्ड सहज शोधा.',
    feat2Title: 'एकाधिक ठिकाणांचे नियोजन',
    feat2Desc: 'एकाच फेरीत सर्व कामे पूर्ण करण्यासाठी अनेक तपासण्या आणि भेटी क्रमाने जोडा.',
    feat3Title: 'स्पष्ट, वळण-दर-वळण सूचना',
    feat3Desc: 'रुग्णालयाच्या प्रत्यक्ष कॉरिडोअर रचनेवर आधारित सरळ आणि अचूक दिशानिर्देश.',
    feat4Title: 'सोपा, सुलभ इंटरफेस',
    feat4Desc: 'मोठी अक्षरे, स्पष्ट बटणे आणि इंग्रजी, मराठी व हिंदीमध्ये झटपट भाषांतर.',
    aboutTitle: 'नायर रुग्णालयातील पाथईझ बद्दल',
    aboutEyebrow: 'परिसर दिशादर्शन उपक्रम',
    aboutText1:
      'बी. वाय. एल. नायर धर्मादाय रुग्णालय हे मुंबईतील प्रमुख वैद्यकीय केंद्रांपैकी एक आहे, जे दररोज हजारो रुग्णांना सेवा देते.',
    aboutText2:
      'पाथईझ रुग्णांना आणि त्यांच्या कुटुंबीयांना विविध इमारतींमध्ये मार्ग शोधणे सोपे करते.',
    statFloors: '२ मजले',
    statFloorsLabel: 'तळमजला व पहिला मजला',
    statDest: '२५+ ठिकाणे',
    statDestLabel: 'ओपीडी, लॅब्स व सेवा',
    statQr: '१० चेकपॉइंट्स',
    statQrLabel: 'भौतिक क्यूआर फलक',
    ctaTitle: 'तुमचे गंतव्यस्थान तुमच्या विचारापेक्षा जवळ आहे.',
    ctaSubtitle: 'नायर रुग्णालयात तुमचा मार्ग नियोजन सुरू करा.',
    ctaButton: 'सुरुवात करा',
    footerBrand: 'पाथईझ · नायर रुग्णालय दिशादर्शन',
    footerNote: 'भौतिक क्यूआर चेकपॉईंट अंतर्गत दिशादर्शन.'
  },
  hi: {
    brandSubtitle: 'अस्पताल इनडोर नेविगेशन',
    navHome: 'होम',
    navHowItWorks: 'यह कैसे काम करता है',
    navFeatures: 'विशेषताएं',
    navAbout: 'हमारे बारे में',
    navGetStarted: 'शुरू करें',
    eyebrow: 'बी. वाई. एल. नायर अस्पताल · मुंबई सेंट्रल',
    heroTitle: 'बेहतर देखभाल के लिए हर कदम।',
    heroSubtitle:
      'स्पष्ट, सरल इनडोर नेविगेशन के साथ अस्पताल में अपना रास्ता खोजें। भटकने में कम समय और ज़रूरी काम पर अधिक ध्यान दें।',
    startNavigating: 'नेविगेशन शुरू करें',
    howItWorksBtn: 'यह कैसे काम करता है',
    badgeQr: 'भौतिक क्यूआर चेकपॉइंट्स',
    badgeFloors: 'भूतल और प्रथम तल',
    badgeGps: 'सटीक इनडोर कॉरिडोर मार्ग',
    previewBadge: 'रूट पूर्वावलोकन',
    previewFloor: 'भूतल · मुख्य भवन',
    previewTurn: '१५ मीटर में सेंट्रल कॉरिडोर में दाएं मुड़ें',
    previewEst: '२ मिनट की पैदल दूरी · ९५ मीटर',
    howTitle: 'यह कैसे काम करता है',
    howEyebrow: '३ आसान चरणों में रास्ता खोजें',
    howSubtitle: 'अस्पताल के गलियारों में आसानी और आत्मविश्वास के साथ चलें।',
    step1Title: 'अपना गंतव्य चुनें',
    step1Desc: 'जिस विभाग या कमरे में जाना है उसे सूची में से चुनें।',
    step2Title: 'अपने मार्ग का अनुसरण करें',
    step2Desc: 'स्पष्ट इनडोर मार्ग और चरण-दर-चरण निर्देश देखें।',
    step3Title: 'अपने गंतव्य पर पहुंचें',
    step3Desc: 'समय पर अपने गंतव्य तक पहुंचने के लिए उपलब्ध मार्गदर्शन का पालन करें।',
    featTitle: 'विशेषताएं',
    featEyebrow: 'स्वास्थ्य सेवा नेविगेशन के लिए निर्मित',
    featSubtitle: 'मरीजों और परिजनों की चिंता व भ्रम को दूर करने के लिए विशेष रूप से डिज़ाइन किया गया।',
    feat1Title: 'अस्पताल इनडोर वेफाइंडिंग',
    feat1Desc: 'विभिन्न तलों पर ओपीडी, प्रयोगशालाएं, जांच केंद्र और वार्ड आसानी से खोजें।',
    feat2Title: 'एकाधिक गंतव्यों का नियोजन',
    feat2Desc: 'एक ही यात्रा में सभी काम पूरे करने के लिए कई स्टॉप क्रमबद्ध जोड़ें।',
    feat3Title: 'स्पष्ट, चरण-दर-चरण निर्देश',
    feat3Desc: 'गलियारे की वास्तविक संरचना पर आधारित सरल और सटीक मोड़ निर्देश।',
    feat4Title: 'सरल और सुलभ इंटरफ़ेस',
    feat4Desc: 'स्पष्ट अक्षर, बड़े बटन और अंग्रेजी, मराठी व हिंदी में तुरंत अनुवाद।',
    aboutTitle: 'नायर अस्पताल में पाथईज़ के बारे में',
    aboutEyebrow: 'परिसर नेविगेशन पहल',
    aboutText1:
      'बी. वाई. एल. नायर चैरिटेबल अस्पताल मुंबई का एक प्रमुख चिकित्सा संस्थान है, जहां प्रतिदिन हजारों मरीज आते हैं।',
    aboutText2:
      'पाथईज़ मरीजों और उनके परिजनों को अस्पताल में बिना भटके सही विभाग तक पहुंचने में मदद करता है।',
    statFloors: '२ तल',
    statFloorsLabel: 'भूतल और प्रथम तल',
    statDest: '२५+ गंतव्य',
    statDestLabel: 'ओपीडी, लैब और सेवाएं',
    statQr: '१० चेकपॉइंट्स',
    statQrLabel: 'भौतिक क्यूआर फलक',
    ctaTitle: 'आपकी मंजिल आपकी सोच से भी करीब है।',
    ctaSubtitle: 'नायर अस्पताल में अपना रास्ता प्लान करना शुरू करें।',
    ctaButton: 'शुरू करें',
    footerBrand: 'पाथईज़ · नायर अस्पताल वेफाइंडिंग',
    footerNote: 'भौतिक क्यूआर चेकपॉइंट इनडोर नेविगेशन।'
  }
};

export default function LandingPage({ onStartNavigating, lang = 'en', setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = copy[lang] || copy.en;

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="landing-page">
      {/* A. Navigation Bar */}
      <header className="landing-navbar">
        <div className="landing-nav-container">
          <div
            className="brand landing-nav-brand"
            onClick={() => scrollTo('hero')}
            role="button"
            tabIndex={0}
            title="PathEase Home"
          >
            <span className="brand-mark">
              <NavIcon size={22} />
            </span>
            <span>
              <strong>PathEase</strong>
              <small>{t.brandSubtitle}</small>
            </span>
          </div>

          <nav className={`landing-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button
              type="button"
              className="landing-nav-link"
              onClick={() => scrollTo('hero')}
            >
              {t.navHome}
            </button>
            <button
              type="button"
              className="landing-nav-link"
              onClick={() => scrollTo('how-it-works')}
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              className="landing-nav-link"
              onClick={() => scrollTo('features')}
            >
              {t.navFeatures}
            </button>
            <button
              type="button"
              className="landing-nav-link"
              onClick={() => scrollTo('about')}
            >
              {t.navAbout}
            </button>

            <div className="landing-nav-mobile-action">
              <button
                type="button"
                className="landing-btn-primary"
                onClick={onStartNavigating}
              >
                <span>{t.navGetStarted}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </nav>

          <div className="landing-nav-right">
            {setLang && (
              <label className="language landing-language-select">
                <Languages size={16} />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="mr">मराठी</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <ChevronDown size={14} />
              </label>
            )}

            <button
              type="button"
              className="landing-btn-primary landing-nav-cta"
              onClick={onStartNavigating}
            >
              <span>{t.navGetStarted}</span>
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              className="landing-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* B. Hero Section */}
      <section id="hero" className="landing-hero-section">
        <div className="landing-hero-container">
          <div className="landing-hero-content">
            <div className="landing-eyebrow-chip">
              <Building2 size={14} />
              <span>{t.eyebrow}</span>
            </div>

            <h1 className="landing-hero-heading">{t.heroTitle}</h1>

            <p className="landing-hero-description">{t.heroSubtitle}</p>

            <div className="landing-hero-cta-group">
              <button
                type="button"
                className="landing-btn-primary landing-hero-primary-btn"
                onClick={onStartNavigating}
              >
                <span>{t.startNavigating}</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="landing-btn-secondary"
                onClick={() => scrollTo('how-it-works')}
              >
                <Compass size={18} />
                <span>{t.howItWorksBtn}</span>
              </button>
            </div>

            <div className="landing-hero-badges">
              <div className="landing-hero-badge-item">
                <span className="landing-badge-dot"></span>
                <span>{t.badgeQr}</span>
              </div>
              <div className="landing-hero-badge-item">
                <span className="landing-badge-dot"></span>
                <span>{t.badgeFloors}</span>
              </div>
              <div className="landing-hero-badge-item">
                <span className="landing-badge-dot"></span>
                <span>{t.badgeGps}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Tasteful Indoor Wayfinding & Floor-plan Illustration */}
          <div className="landing-hero-visual-card">
            <div className="landing-map-preview-header">
              <div className="landing-preview-status">
                <span className="landing-live-indicator"></span>
                <span>{t.previewBadge}</span>
              </div>
              <span className="landing-preview-floor-tag">{t.previewFloor}</span>
            </div>

            <div className="landing-map-canvas-wrap">
              <svg
                viewBox="0 0 520 380"
                className="landing-map-svg"
                aria-label="Floor plan and route illustration"
              >
                <defs>
                  <filter id="heroShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e293b" floodOpacity="0.08" />
                  </filter>
                  <pattern id="landingGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#ebe6dd" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* Campus Background Texture */}
                <rect width="520" height="380" fill="#f4efe7" rx="14" />
                <rect width="520" height="380" fill="url(#landingGrid)" opacity="0.6" rx="14" />

                {/* Building Footprint */}
                <rect
                  x="30"
                  y="30"
                  width="460"
                  height="320"
                  rx="12"
                  fill="#ffffff"
                  stroke="#dcd3c4"
                  strokeWidth="1.5"
                  filter="url(#heroShadow)"
                />

                {/* Hospital Department Rooms */}
                {/* Emergency Room */}
                <rect x="44" y="44" width="130" height="80" rx="6" fill="#fcf3f3" stroke="#ecd7d7" strokeWidth="1" />
                <text x="109" y="82" fill="#993b3b" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  Emergency OPD
                </text>
                <text x="109" y="98" fill="#b06b6b" fontSize="8.5" textAnchor="middle">
                  Casualty / Triage
                </text>

                {/* Central Registration */}
                <rect x="44" y="140" width="130" height="85" rx="6" fill="#f5f7f2" stroke="#dbe3d4" strokeWidth="1" />
                <text x="109" y="178" fill="#446452" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  Registration
                </text>
                <text x="109" y="194" fill="#6f8979" fontSize="8.5" textAnchor="middle">
                  OPD Tokens · G-01
                </text>

                {/* Diagnostic & Imaging */}
                <rect x="44" y="240" width="130" height="96" rx="6" fill="#f0f5fa" stroke="#d5e1ee" strokeWidth="1" />
                <text x="109" y="284" fill="#2c5270" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  Radiology & X-Ray
                </text>
                <text x="109" y="300" fill="#64829e" fontSize="8.5" textAnchor="middle">
                  Diagnostic Wing
                </text>

                {/* Central Pharmacy */}
                <rect x="346" y="44" width="130" height="80" rx="6" fill="#f8f4fb" stroke="#e3dbe9" strokeWidth="1" />
                <text x="411" y="82" fill="#623d7c" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  Central Pharmacy
                </text>
                <text x="411" y="98" fill="#8d6e9f" fontSize="8.5" textAnchor="middle">
                  Dispensary G-05
                </text>

                {/* Target OPD Room 12 */}
                <rect x="346" y="140" width="130" height="85" rx="6" fill="#e8f4ed" stroke="#b6dcc2" strokeWidth="1.5" />
                <text x="411" y="176" fill="#1b5a37" fontSize="11" fontWeight="700" textAnchor="middle">
                  OPD Clinic 12
                </text>
                <text x="411" y="193" fill="#2e7c4f" fontSize="9" fontWeight="500" textAnchor="middle">
                  Medicine Consultation
                </text>

                {/* Lift & Stair Lobby */}
                <rect x="346" y="240" width="130" height="96" rx="6" fill="#fbf8f0" stroke="#ebdcb5" strokeWidth="1" />
                <text x="411" y="284" fill="#7a6225" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  Lift & Stairs Lobby
                </text>
                <text x="411" y="300" fill="#998348" fontSize="8.5" textAnchor="middle">
                  Access to 1st Floor
                </text>

                {/* Hallway Corridors */}
                <rect x="186" y="44" width="148" height="292" fill="#ffffff" />
                <line x1="186" y1="44" x2="186" y2="336" stroke="#e6dfd4" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="334" y1="44" x2="334" y2="336" stroke="#e6dfd4" strokeWidth="1" strokeDasharray="3 3" />

                {/* Corridor label */}
                <text x="260" y="70" fill="#9aada0" fontSize="9" fontWeight="600" letterSpacing="0.8" textAnchor="middle">
                  CENTRAL CORRIDOR
                </text>

                {/* Navigation Route Line (Main Entrance to OPD 12) */}
                {/* Starting from Entrance (bottom of central corridor) */}
                <path
                  d="M 260 336 L 260 182 L 346 182"
                  fill="none"
                  stroke="#286b46"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 260 336 L 260 182 L 346 182"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />

                {/* Start Marker: Checkpoint CP-ENT-01 */}
                <g transform="translate(260, 330)">
                  <circle r="14" fill="#286b46" fillOpacity="0.2" className="landing-pulse-ring" />
                  <circle r="7" fill="#286b46" stroke="#ffffff" strokeWidth="2.5" />
                </g>
                <g transform="translate(260, 310)">
                  <rect x="-62" y="-12" width="124" height="20" rx="10" fill="#214d3b" />
                  <text x="0" y="2" fill="#ffffff" fontSize="8.5" fontWeight="700" textAnchor="middle">
                    You Are Here (CP-ENT-01)
                  </text>
                </g>

                {/* Turn Indicator along route */}
                <circle cx="260" cy="182" r="5" fill="#286b46" stroke="#ffffff" strokeWidth="2" />

                {/* Destination Pin: OPD Clinic 12 */}
                <g transform="translate(346, 182)">
                  <circle r="12" fill="#1b5a37" fillOpacity="0.2" />
                  <circle r="7" fill="#1b5a37" stroke="#ffffff" strokeWidth="2.5" />
                </g>
                <g transform="translate(411, 150)">
                  <rect x="-42" y="-10" width="84" height="18" rx="9" fill="#1b5a37" />
                  <text x="0" y="2.5" fill="#ffffff" fontSize="8" fontWeight="700" textAnchor="middle">
                    Destination
                  </text>
                </g>
              </svg>
            </div>

            {/* Floating Navigation Maneuver Pill */}
            <div className="landing-map-float-instruction">
              <div className="landing-float-icon">
                <CornerUpRight size={18} />
              </div>
              <div className="landing-float-text">
                <strong>{t.previewTurn}</strong>
                <small>{t.previewEst}</small>
              </div>
              <span className="landing-float-badge">OPD 12</span>
            </div>
          </div>
        </div>
      </section>

      {/* C. How It Works Section */}
      <section id="how-it-works" className="landing-section landing-section-alt">
        <div className="landing-section-container">
          <div className="landing-section-header">
            <p className="eyebrow">{t.howEyebrow}</p>
            <h2 className="landing-section-title">{t.howTitle}</h2>
            <p className="landing-section-subtitle">{t.howSubtitle}</p>
          </div>

          <div className="landing-steps-grid">
            {/* Step 1 */}
            <div className="landing-step-card">
              <div className="landing-step-card-top">
                <span className="landing-step-num">01</span>
                <div className="landing-step-icon">
                  <MapPin size={22} />
                </div>
              </div>
              <h3 className="landing-step-title">{t.step1Title}</h3>
              <p className="landing-step-description">{t.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="landing-step-card">
              <div className="landing-step-card-top">
                <span className="landing-step-num">02</span>
                <div className="landing-step-icon">
                  <Compass size={22} />
                </div>
              </div>
              <h3 className="landing-step-title">{t.step2Title}</h3>
              <p className="landing-step-description">{t.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="landing-step-card">
              <div className="landing-step-card-top">
                <span className="landing-step-num">03</span>
                <div className="landing-step-icon">
                  <CheckCircle2 size={22} />
                </div>
              </div>
              <h3 className="landing-step-title">{t.step3Title}</h3>
              <p className="landing-step-description">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* D. Features Section */}
      <section id="features" className="landing-section">
        <div className="landing-section-container">
          <div className="landing-section-header">
            <p className="eyebrow">{t.featEyebrow}</p>
            <h2 className="landing-section-title">{t.featTitle}</h2>
            <p className="landing-section-subtitle">{t.featSubtitle}</p>
          </div>

          <div className="landing-features-grid">
            {/* Feature 1 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Building2 size={24} />
              </div>
              <div className="landing-feature-body">
                <h3 className="landing-feature-title">{t.feat1Title}</h3>
                <p className="landing-feature-desc">{t.feat1Desc}</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Route size={24} />
              </div>
              <div className="landing-feature-body">
                <h3 className="landing-feature-title">{t.feat2Title}</h3>
                <p className="landing-feature-desc">{t.feat2Desc}</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Compass size={24} />
              </div>
              <div className="landing-feature-body">
                <h3 className="landing-feature-title">{t.feat3Title}</h3>
                <p className="landing-feature-desc">{t.feat3Desc}</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="landing-feature-card">
              <div className="landing-feature-icon">
                <Languages size={24} />
              </div>
              <div className="landing-feature-body">
                <h3 className="landing-feature-title">{t.feat4Title}</h3>
                <p className="landing-feature-desc">{t.feat4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: Campus Context */}
      <section id="about" className="landing-section landing-section-alt">
        <div className="landing-section-container">
          <div className="landing-about-card">
            <div className="landing-about-main">
              <p className="eyebrow">{t.aboutEyebrow}</p>
              <h2 className="landing-section-title">{t.aboutTitle}</h2>
              <p className="landing-about-text">{t.aboutText1}</p>
              <p className="landing-about-text">{t.aboutText2}</p>
            </div>

            <div className="landing-about-stats">
              <div className="landing-stat-box">
                <span className="landing-stat-val">{t.statFloors}</span>
                <span className="landing-stat-label">{t.statFloorsLabel}</span>
              </div>
              <div className="landing-stat-box">
                <span className="landing-stat-val">{t.statDest}</span>
                <span className="landing-stat-label">{t.statDestLabel}</span>
              </div>
              <div className="landing-stat-box">
                <span className="landing-stat-val">{t.statQr}</span>
                <span className="landing-stat-label">{t.statQrLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. Final Call to Action */}
      <section className="landing-cta-section">
        <div className="landing-cta-container">
          <div className="landing-cta-card">
            <div className="landing-cta-content">
              <h2 className="landing-cta-heading">{t.ctaTitle}</h2>
              <p className="landing-cta-text">{t.ctaSubtitle}</p>
            </div>
            <button
              type="button"
              className="landing-btn-primary landing-cta-btn"
              onClick={onStartNavigating}
            >
              <span>{t.ctaButton}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="landing-footer-top">
            <div className="brand landing-footer-brand">
              <span className="brand-mark">
                <NavIcon size={20} />
              </span>
              <span>
                <strong>PathEase</strong>
                <small>{t.brandSubtitle}</small>
              </span>
            </div>

            <div className="landing-footer-nav">
              <button type="button" onClick={() => scrollTo('hero')}>
                {t.navHome}
              </button>
              <button type="button" onClick={() => scrollTo('how-it-works')}>
                {t.navHowItWorks}
              </button>
              <button type="button" onClick={() => scrollTo('features')}>
                {t.navFeatures}
              </button>
              <button type="button" onClick={() => scrollTo('about')}>
                {t.navAbout}
              </button>
              <button type="button" onClick={onStartNavigating} className="landing-footer-highlight">
                {t.navGetStarted}
              </button>
            </div>
          </div>

          <div className="landing-footer-bottom">
            <span>{t.footerBrand}</span>
            <span>{t.footerNote}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
