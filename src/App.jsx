import React, { useMemo, useState, useEffect } from 'react';
import {
  Navigation as NavIcon,
  Languages,
  Search,
  MapPin,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  CornerUpLeft,
  CornerUpRight,
  LocateFixed,
  Check,
  Building2,
  ChevronDown,
  RotateCcw,
  Clock,
  Compass,
  ChevronsUp,
  CheckCircle2,
  LogOut,
  QrCode,
  Camera,
  AlertCircle
} from 'lucide-react';

import { copy, places, graphNodes } from './hospitalData';
import { checkpointRegistry } from './checkpoints';
import {
  findShortestPath,
  computePathDistance,
  estimateWalkingMinutes,
  getManeuverInstruction
} from './navigationGraph';
import HospitalMap from './HospitalMap';
import QrScannerModal from './QrScannerModal';
import LandingPage from './LandingPage';

function IconBadge({ children }) {
  return <span className="place-icon">{children}</span>;
}

export default function App() {
  const [lang, setLang] = useState('en');
  const t = copy[lang] || copy.en;

  // Confirmed physical position (updated strictly via QR scan)
  // Default initialized to Main Entrance checkpoint CP-ENT-01 for immediate review
  const [confirmedCheckpoint, setConfirmedCheckpoint] = useState(
    checkpointRegistry['CP-ENT-01']
  );

  // Scanner modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerContext, setScannerContext] = useState('update'); // 'start' or 'update'

  // Screen routing with hash support for refresh & browser back/forward
  const getInitialScreen = () => {
    const hash = (typeof window !== 'undefined' ? window.location.hash : '').toLowerCase();
    if (hash === '#planner') return 'planner';
    if (hash === '#navigation') return 'navigation';
    if (hash === '#complete') return 'complete';
    return 'landing'; // Default initial view is the welcoming landing page
  };

  const [screen, setScreen] = useState(getInitialScreen);

  const navigateToScreen = (targetScreen) => {
    setScreen(targetScreen);
    if (targetScreen === 'landing') {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#landing') {
        window.location.hash = '';
      }
    } else {
      window.location.hash = targetScreen;
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#planner') setScreen('planner');
      else if (hash === '#navigation') setScreen('navigation');
      else if (hash === '#complete') setScreen('complete');
      else if (
        hash === '' ||
        hash === '#' ||
        hash === '#landing' ||
        hash.startsWith('#how-it-works') ||
        hash.startsWith('#features') ||
        hash.startsWith('#about') ||
        hash.startsWith('#hero')
      ) {
        setScreen('landing');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Planner state (strictly preserved)
  const [query, setQuery] = useState('');
  const [stops, setStops] = useState([]);
  const [notice, setNotice] = useState('');
  const [scanToast, setScanToast] = useState('');

  // Navigation leg state
  const [leg, setLeg] = useState(0);
  const [activeFloor, setActiveFloor] = useState(0);

  // Available selectable destinations (excluding structural nodes)
  const availableDestinations = places.filter(
    (p) => !['entrance', 'junction'].includes(p.id)
  );

  const filteredDestinations = availableDestinations.filter(
    (p) =>
      ((p.name[lang] || p.name.en) + ' ' + p.type)
        .toLowerCase()
        .includes(query.toLowerCase()) && !stops.includes(p.id)
  );

  const chosenStops = stops
    .map((id) => places.find((p) => p.id === id))
    .filter(Boolean);

  // Active destination for current leg
  const activeDest = chosenStops[Math.min(leg, Math.max(0, chosenStops.length - 1))];

  // Connected corridor shortest path from current confirmed checkpoint to active destination
  const activeRoute = useMemo(() => {
    if (!activeDest || !confirmedCheckpoint) return [];
    return findShortestPath(confirmedCheckpoint.nodeId, activeDest.node) || [];
  }, [confirmedCheckpoint, activeDest]);

  // Turn-by-turn maneuver instruction derived from actual corridor geometry
  const instruction = useMemo(() => {
    return getManeuverInstruction(activeRoute, 0, activeDest, lang);
  }, [activeRoute, activeDest, lang]);

  // Metric distance & time from confirmed position
  const remainingDistanceM = useMemo(() => {
    return computePathDistance(activeRoute);
  }, [activeRoute]);

  const estimatedMinutes = useMemo(() => {
    return estimateWalkingMinutes(remainingDistanceM);
  }, [remainingDistanceM]);

  // Keep floor in sync when confirmed checkpoint updates
  useEffect(() => {
    if (confirmedCheckpoint) {
      setActiveFloor(confirmedCheckpoint.floor);
    }
  }, [confirmedCheckpoint]);

  // Clear toast after 4 seconds
  useEffect(() => {
    if (!scanToast) return;
    const timer = setTimeout(() => setScanToast(''), 4000);
    return () => clearTimeout(timer);
  }, [scanToast]);

  // Handle successful QR scan
  const handleScanSuccess = (newCheckpoint) => {
    setConfirmedCheckpoint(newCheckpoint);
    setActiveFloor(newCheckpoint.floor);
    setScanToast(`Position Confirmed: ${newCheckpoint.id} (${newCheckpoint.name[lang] || newCheckpoint.name.en})`);

    // Check if arrived at destination checkpoint
    if (activeDest && newCheckpoint.nodeId === activeDest.node) {
      setScanToast(`Arrived at destination: ${activeDest.name[lang] || activeDest.name.en}!`);
    }
  };

  // Planner actions
  const addStop = (id) => {
    setStops((s) => [...s, id]);
    setQuery('');
    setNotice('');
  };

  const reorder = (index, delta) => {
    setStops((s) => {
      const arr = [...s];
      const next = index + delta;
      if (next < 0 || next >= arr.length) return s;
      [arr[index], arr[next]] = [arr[next], arr[index]];
      return arr;
    });
  };

  const startNavigation = () => {
    if (!stops.length) return;

    if (!confirmedCheckpoint) {
      setNotice(t.scanRequiredMsg);
      setScannerContext('start');
      setIsScannerOpen(true);
      return;
    }

    if (!activeRoute || activeRoute.length === 0) {
      setNotice(t.unverifiedDestMsg);
      return;
    }

    setLeg(0);
    setActiveFloor(confirmedCheckpoint.floor);
    setNotice('');
    navigateToScreen('navigation');
  };

  const openScanner = (context = 'update') => {
    setScannerContext(context);
    setIsScannerOpen(true);
  };

  // Arrival action
  const handleArrive = () => {
    if (leg < stops.length - 1) {
      setLeg((l) => l + 1);
    } else {
      navigateToScreen('complete');
    }
  };

  // Exit navigation back to planner (preserving stops and selections)
  const exitNavigation = () => {
    navigateToScreen('planner');
    setNotice('');
  };

  // Render Maneuver Icon
  const renderManeuverIcon = () => {
    switch (instruction.type) {
      case 'turn-left':
        return <CornerUpLeft size={28} className="maneuver-icon-svg" />;
      case 'turn-right':
        return <CornerUpRight size={28} className="maneuver-icon-svg" />;
      case 'lift':
        return <ChevronsUp size={28} className="maneuver-icon-svg" />;
      case 'arrive':
        return <CheckCircle2 size={28} className="maneuver-icon-svg" />;
      case 'arrive-soon':
        return <MapPin size={28} className="maneuver-icon-svg" />;
      case 'straight':
      default:
        return <ArrowUp size={28} className="maneuver-icon-svg" />;
    }
  };

  if (screen === 'landing') {
    return (
      <LandingPage
        onStartNavigating={() => navigateToScreen('planner')}
        lang={lang}
        setLang={setLang}
      />
    );
  }

  return (
    <div className="app">
      {/* Universal Top Bar */}
      <header className="topbar">
        <div
          className="brand"
          onClick={() => navigateToScreen('landing')}
          role="button"
          tabIndex={0}
          title="Return to Home Landing Page"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigateToScreen('landing');
          }}
        >
          <span className="brand-mark">
            <NavIcon size={23} />
          </span>
          <span>
            <strong>PathEase</strong>
            <small>Hospital Wayfinding</small>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="topbar-home-btn"
            onClick={() => navigateToScreen('landing')}
            title="Return to Landing Page"
          >
            Home
          </button>
          <label className="language">
            <Languages size={17} />
            <span>Language</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Select Language"
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
              <option value="hi">हिन्दी</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>
      </header>

      {/* Screen 1: Route Planner (Preserved) */}
      {screen === 'planner' && (
        <main className="planner page-width">
          <div className="page-intro">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
            </div>
            <span className="hospital-chip">
              <Building2 size={16} /> B. Y. L. Nair Hospital
            </span>
          </div>

          <div className="planner-grid">
            <section className="left-column">
              {/* Step 1: Verified Starting Checkpoint */}
              <div className="panel">
                <div className="panel-title">
                  <span className="step-number">1</span>
                  <h2>{t.start}</h2>
                </div>

                <div className="qr-start-banner">
                  <div className="qr-start-info">
                    <span className="qr-status-pill">
                      <QrCode size={13} /> {t.confirmedPosition}
                    </span>
                    <strong>
                      {confirmedCheckpoint
                        ? `${confirmedCheckpoint.id} · ${confirmedCheckpoint.name[lang] || confirmedCheckpoint.name.en}`
                        : 'No Checkpoint Confirmed Yet'}
                    </strong>
                    <small>
                      {confirmedCheckpoint
                        ? `${confirmedCheckpoint.wing} · ${confirmedCheckpoint.floor === 0 ? t.ground : t.first}`
                        : 'Scan a physical QR plaque to set your initial indoor position'}
                    </small>
                  </div>
                  <button
                    type="button"
                    className="scan-qr-action-btn"
                    onClick={() => openScanner('start')}
                  >
                    <Camera size={16} />
                    <span>{confirmedCheckpoint ? 'Rescan QR' : 'Scan Checkpoint QR'}</span>
                  </button>
                </div>

                <div className="start-selection-fallback">
                  <label className="field-label" htmlFor="start-checkpoint-select">
                    Or select a verified checkpoint from registry:
                  </label>
                  <select
                    id="start-checkpoint-select"
                    className="select-field"
                    value={confirmedCheckpoint?.id || ''}
                    onChange={(e) => {
                      const cp = checkpointRegistry[e.target.value];
                      if (cp) setConfirmedCheckpoint(cp);
                    }}
                  >
                    {Object.values(checkpointRegistry).map((cp) => (
                      <option key={cp.id} value={cp.id}>
                        {cp.id} — {cp.name[lang] || cp.name.en} ({cp.floor === 0 ? t.ground : t.first})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Add Destinations */}
              <div className="panel">
                <div className="panel-title">
                  <span className="step-number">2</span>
                  <h2>{t.destinations}</h2>
                </div>
                <div className="search-wrap">
                  <Search size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.search}
                  />
                </div>
                <div className="destination-list">
                  {filteredDestinations.length ? (
                    filteredDestinations.map((p) => (
                      <div className="destination-row" key={p.id}>
                        <IconBadge>
                          <MapPin size={18} />
                        </IconBadge>
                        <div className="destination-info">
                          <strong>{p.name[lang] || p.name.en}</strong>
                          <small>
                            {p.type} · {p.floor === 0 ? t.ground : t.first}
                          </small>
                        </div>
                        <button
                          type="button"
                          className="add-button"
                          onClick={() => addStop(p.id)}
                        >
                          <Plus size={16} />
                          {t.add}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">{t.noResults}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Selected Route / Stops Column */}
            <section className="panel selected-panel">
              <div className="panel-title selected-title">
                <div>
                  <h2>{t.selected}</h2>
                  <p>{t.routeHint}</p>
                </div>
                <span className="count-pill">
                  {stops.length} {t.stop}
                  {stops.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="route-list">
                <div className="route-item start-item">
                  <span className="route-dot start-dot">
                    <QrCode size={15} />
                  </span>
                  <div>
                    <small>START (CONFIRMED CHECKPOINT)</small>
                    <strong>
                      {confirmedCheckpoint
                        ? `${confirmedCheckpoint.id} · ${confirmedCheckpoint.name[lang] || confirmedCheckpoint.name.en}`
                        : 'Scan checkpoint to confirm'}
                    </strong>
                  </div>
                </div>

                {chosenStops.length ? (
                  chosenStops.map((p, i) => (
                    <div className="route-item" key={p.id}>
                      <span className="route-line" />
                      <span className="route-dot">{i + 1}</span>
                      <div className="route-stop">
                        <small>
                          {t.stop.toUpperCase()} {i + 1}
                        </small>
                        <strong>{p.name[lang] || p.name.en}</strong>
                        <span className="floor-tag">
                          {p.floor === 0 ? t.ground : t.first}
                        </span>
                      </div>
                      <div className="route-actions">
                        <button
                          type="button"
                          title="Move up"
                          aria-label="Move up"
                          disabled={i === 0}
                          onClick={() => reorder(i, -1)}
                        >
                          <ArrowUp size={15} />
                        </button>
                        <button
                          type="button"
                          title="Move down"
                          aria-label="Move down"
                          disabled={i === chosenStops.length - 1}
                          onClick={() => reorder(i, 1)}
                        >
                          <ArrowDown size={15} />
                        </button>
                        <button
                          type="button"
                          title="Remove"
                          aria-label="Remove destination"
                          onClick={() => setStops((s) => s.filter((x) => x !== p.id))}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-route">
                    <MapPin size={25} />
                    <span>{t.empty}</span>
                  </div>
                )}
              </div>

              <div className="panel-bottom">
                {notice && <p className="notice">{notice}</p>}
                <button
                  type="button"
                  className="primary-button"
                  disabled={!stops.length}
                  onClick={startNavigation}
                >
                  {t.startNav}
                  <ArrowRight size={18} />
                </button>
                <p className="small-note">{t.useMap}</p>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Screen 2: Clean, Immersive Indoor Navigation Screen */}
      {screen === 'navigation' && (
        <main className="navigation-fullscreen-view">
          {/* Toast Notification on QR Scan */}
          {scanToast && (
            <div className="nav-scan-toast" role="status">
              <CheckCircle2 size={17} />
              <span>{scanToast}</span>
            </div>
          )}

          {/* Compact Top Navigation Header */}
          <div className="nav-compact-header">
            <div className="nav-maneuver-container">
              <div className={`maneuver-arrow-badge maneuver-${instruction.type}`}>
                {renderManeuverIcon()}
              </div>
              <div className="maneuver-instruction-text">
                <span className="maneuver-primary">{instruction.primary}</span>
                {instruction.secondary && (
                  <span className="maneuver-secondary">{instruction.secondary}</span>
                )}
              </div>
            </div>

            <div className="nav-header-quick-info">
              <span className="nav-floor-badge">
                {activeFloor === 0 ? t.ground : t.first}
              </span>
              <button
                type="button"
                className="nav-header-exit-btn"
                onClick={exitNavigation}
                title={t.exitNav}
                aria-label={t.exitNav}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Map Viewport (Occupies Most Screen Space) */}
          <div className="nav-map-container">
            <HospitalMap
              path={activeRoute}
              confirmedCheckpoint={confirmedCheckpoint}
              activeFloor={activeFloor}
              onFloorChange={(f) => setActiveFloor(f)}
              destPlace={activeDest}
              onSelectCheckpoint={(cp) => {
                setConfirmedCheckpoint(cp);
                setScanToast(`Checkpoint Selected: ${cp.id}`);
              }}
              lang={lang}
            />
          </div>

          {/* Floating Bottom Navigation Panel with QR Rescan Action */}
          <div className="nav-bottom-panel">
            {/* Destination & Stop Info */}
            <div className="bottom-dest-row">
              <div className="bottom-dest-info">
                <span className="bottom-stop-tag">
                  {t.stop} {leg + 1} {t.of} {chosenStops.length} · {activeDest?.type}
                </span>
                <h2 className="bottom-dest-title">
                  {activeDest?.name[lang] || activeDest?.name.en}
                </h2>
              </div>
              <span className="bottom-floor-chip">
                {activeDest?.floor === 0 ? t.ground : t.first}
              </span>
            </div>

            {/* Metrics & Last Confirmed Position */}
            <div className="bottom-metrics-row">
              <div className="metric-item">
                <Compass size={16} />
                <div>
                  <small>{t.remaining}</small>
                  <strong>{remainingDistanceM} m</strong>
                </div>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <Clock size={16} />
                <div>
                  <small>{t.estTime}</small>
                  <strong>
                    {estimatedMinutes} {estimatedMinutes === 1 ? 'min' : 'mins'}
                  </strong>
                </div>
              </div>
              <div className="metric-divider" />
              <div className="metric-item location-metric">
                <QrCode size={16} />
                <div>
                  <small>{t.confirmedPosition}</small>
                  <strong>{confirmedCheckpoint?.id || '—'}</strong>
                </div>
              </div>
            </div>

            {/* Primary Action Controls: Exit, Scan Next QR Checkpoint, Arrival */}
            <div className="bottom-actions-row qr-actions-row">
              <button
                type="button"
                className="exit-nav-button"
                onClick={exitNavigation}
              >
                <LogOut size={16} />
                <span>{t.exitNav}</span>
              </button>

              {/* Primary QR Scanner Button for Physical Indoor Positioning */}
              <button
                type="button"
                className="scan-next-qr-button"
                onClick={() => openScanner('update')}
                title="Scan next physical QR checkpoint along your corridor path"
              >
                <Camera size={17} />
                <span>{t.scanNextQr}</span>
              </button>

              <button
                type="button"
                className="arrive-button"
                onClick={handleArrive}
              >
                <Check size={18} />
                <span>
                  {leg < stops.length - 1 ? t.nextStopAction : t.iveArrived}
                </span>
              </button>
            </div>

            {/* Positioning Integrity Note */}
            <div className="bottom-sim-notice">
              <span>Position updates strictly via physical QR checkpoint scans. No simulated GPS.</span>
            </div>
          </div>
        </main>
      )}

      {/* Screen 3: Journey Complete (Preserved) */}
      {screen === 'complete' && (
        <main className="complete-page page-width">
          <div className="complete-card">
            <div className="complete-icon">
              <Check size={38} />
            </div>
            <p className="eyebrow">B. Y. L. NAIR HOSPITAL</p>
            <h1>{t.completed}</h1>
            <p>{t.completeText}</p>

            <div className="completed-stops">
              {chosenStops.map((p) => (
                <div key={p.id}>
                  <Check size={17} />
                  <span>
                    {p.name[lang] || p.name.en} ({p.floor === 0 ? t.ground : t.first})
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                navigateToScreen('planner');
                setStops([]);
                setLeg(0);
                setNotice('');
              }}
            >
              <RotateCcw size={18} />
              {t.newRoute}
            </button>
          </div>
        </main>
      )}

      {/* QR Scanner Modal Component */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        lang={lang}
      />

      {/* Global Footer (Preserved) */}
      <footer className="footer">
        <span>PathEase · Nair Hospital Wayfinding</span>
        <span>
          Physical QR Checkpoint Indoor Navigation · Illustrative architectural floor-plan geometry.
        </span>
      </footer>
    </div>
  );
}
