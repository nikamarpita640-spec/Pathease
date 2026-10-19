import React, { useState, useRef } from 'react';
import { Plus, Minus, RotateCcw, QrCode } from 'lucide-react';
import { floorRooms, graphNodes, copy } from './hospitalData';
import { checkpointRegistry } from './checkpoints';
import { generateSmoothSvgPath, getHeadingAngle } from './navigationGraph';

export default function HospitalMap({
  path = [],
  confirmedCheckpoint = null,
  activeFloor = 0,
  onFloorChange,
  destPlace = null,
  onSelectCheckpoint = null,
  lang = 'en',
  compact = false
}) {
  const t = copy[lang] || copy.en;
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoom = (delta) => {
    setZoom((prev) => Math.min(2.4, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Active rooms on selected floor
  const rooms = floorRooms[activeFloor] || [];

  // Registered physical checkpoints on this floor
  const floorCheckpoints = Object.values(checkpointRegistry).filter(
    (cp) => cp.floor === activeFloor
  );

  // Confirmed position marker
  const isConfirmedOnFloor = confirmedCheckpoint && confirmedCheckpoint.floor === activeFloor;
  const markerX = confirmedCheckpoint?.coordinates?.x || 450;
  const markerY = confirmedCheckpoint?.coordinates?.y || 648;
  const headingAngle = getHeadingAngle(path, 0);

  // Destination node
  const destNodeId = path[path.length - 1];
  const destNode = graphNodes[destNodeId];
  const isDestOnActiveFloor = destNode && destNode.floor === activeFloor;

  // Smooth route on active floor
  const smoothRouteD = generateSmoothSvgPath(path, activeFloor, 16);

  // Check if route involves a lift
  const hasLiftInPath = path.some((id) => id === 'node_lift_g' || id === 'node_lift_1f');

  return (
    <div
      className={`hospital-map-viewport ${compact ? 'hospital-map-compact' : ''}`}
      ref={mapContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Nair Hospital Architectural Floor Plan"
    >
      {/* Floating Floor & Zoom Controls */}
      <div className="map-floating-controls" onClick={(e) => e.stopPropagation()}>
        <div className="floor-selector-pill">
          <button
            type="button"
            className={`floor-btn ${activeFloor === 0 ? 'active' : ''}`}
            onClick={() => onFloorChange(0)}
            title="Ground Floor"
          >
            <span>G</span>
            <small>{t.ground}</small>
          </button>
          <button
            type="button"
            className={`floor-btn ${activeFloor === 1 ? 'active' : ''}`}
            onClick={() => onFloorChange(1)}
            title="1st Floor"
          >
            <span>1F</span>
            <small>{t.first}</small>
          </button>
        </div>

        <div className="map-zoom-buttons">
          <button type="button" onClick={() => handleZoom(0.2)} title={t.zoomIn} aria-label={t.zoomIn}>
            <Plus size={16} />
          </button>
          <button type="button" onClick={() => handleZoom(-0.2)} title={t.zoomOut} aria-label={t.zoomOut}>
            <Minus size={16} />
          </button>
          <button type="button" onClick={resetView} title={t.recenter} aria-label={t.recenter}>
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Floor Watermark */}
      <div className="map-floor-watermark">
        <span>B. Y. L. NAIR HOSPITAL</span>
        <strong>{activeFloor === 0 ? t.ground.toUpperCase() : t.first.toUpperCase()}</strong>
      </div>

      {/* SVG Map Canvas */}
      <svg
        className="hospital-map-svg"
        viewBox="0 0 900 680"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <defs>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e293b" floodOpacity="0.08" />
          </filter>
          <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.25" />
          </filter>
          <pattern id="subtleGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ebe6dd" strokeWidth="0.6" />
          </pattern>
        </defs>

        {/* Outdoor Background Campus Texture */}
        <rect width="900" height="680" fill="#f4efe7" />
        <rect width="900" height="680" fill="url(#subtleGrid)" opacity="0.6" />

        {/* Building Exterior Footprint */}
        <path
          d="M 35 60 H 865 V 650 H 510 V 670 H 390 V 650 H 35 Z"
          fill="#ffffff"
          stroke="#dcd3c4"
          strokeWidth="2"
          filter="url(#softShadow)"
        />

        {/* Crisp White Corridors Network */}
        <g className="corridor-hallways">
          {activeFloor === 0 && (
            <rect x="420" y="512" width="60" height="155" fill="#ffffff" stroke="none" />
          )}
          <rect x="170" y="490" width="560" height="44" fill="#ffffff" stroke="none" />
          <rect x="170" y="208" width="560" height="44" fill="#ffffff" stroke="none" />
          <rect x="163" y="70" width="44" height="450" fill="#ffffff" stroke="none" />
          <rect x="693" y="70" width="44" height="450" fill="#ffffff" stroke="none" />
          <rect x="428" y="70" width="44" height="450" fill="#ffffff" stroke="none" />

          {/* Corridor Boundaries */}
          <path
            d="M 163 208 H 428 M 472 208 H 693 M 163 252 H 428 M 472 252 H 693"
            stroke="#e5ded2"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 163 490 H 428 M 472 490 H 693 M 163 534 H 420 M 480 534 H 693"
            stroke="#e5ded2"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 207 70 V 208 M 207 252 V 490 M 693 70 V 208 M 693 252 V 490"
            stroke="#e5ded2"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 428 70 V 208 M 428 252 V 490 M 472 70 V 208 M 472 252 V 490"
            stroke="#e5ded2"
            strokeWidth="1"
            fill="none"
          />
        </g>

        {/* Room Blocks (Light Beige / Warm Off-White) */}
        <g className="room-blocks">
          {rooms.map((r) => {
            const isDestinationRoom = destPlace && destPlace.room === r.id;
            return (
              <g key={r.id} className="room-group">
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="3"
                  fill={isDestinationRoom ? '#fdf8ef' : '#f8f4ec'}
                  stroke={isDestinationRoom ? '#e2b86b' : '#ded5c5'}
                  strokeWidth={isDestinationRoom ? '1.8' : '1.2'}
                />
                <line
                  x1={r.x + 8}
                  y1={r.y + 7}
                  x2={r.x + r.w - 8}
                  y2={r.y + 7}
                  stroke="#efe8db"
                  strokeWidth="1"
                />
                <text
                  x={r.x + r.w / 2}
                  y={r.y + (r.h > 100 ? 44 : r.h / 2 - 4)}
                  textAnchor="middle"
                  className="arch-room-title"
                >
                  {r.label}
                </text>
                <text
                  x={r.x + r.w / 2}
                  y={r.y + (r.h > 100 ? 60 : r.h / 2 + 12)}
                  textAnchor="middle"
                  className="arch-room-sub"
                >
                  {r.sub}
                </text>
              </g>
            );
          })}
        </g>

        {/* Entrance Portal Graphic on Ground Floor */}
        {activeFloor === 0 && (
          <g className="entrance-portal" transform="translate(450, 650)">
            <path d="M -30 0 H 30" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
            <text y="-8" textAnchor="middle" className="entrance-label">
              MAIN ENTRANCE
            </text>
            <path d="M 0 -2 L -5 5 H 5 Z" fill="#1d4ed8" />
          </g>
        )}

        {/* Lift & Stairs Shaft Graphic Indicator */}
        <g className="lift-shaft-indicator" transform={`translate(317, 305)`}>
          <rect
            x="-35"
            y="-22"
            width="70"
            height="44"
            rx="4"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1.2"
          />
          <text y="-4" textAnchor="middle" className="shaft-text">
            LIFT / STAIRS
          </text>
          <text y="12" textAnchor="middle" className="shaft-sub">
            {activeFloor === 0 ? 'G ⇄ 1F' : '1F ⇄ G'}
          </text>
        </g>

        {/* Physical QR Checkpoints Mounted along Corridors */}
        <g className="checkpoint-placards">
          {floorCheckpoints.map((cp) => {
            const isConfirmed = confirmedCheckpoint && confirmedCheckpoint.id === cp.id;
            return (
              <g
                key={cp.id}
                transform={`translate(${cp.coordinates.x}, ${cp.coordinates.y})`}
                className={`qr-map-badge ${isConfirmed ? 'badge-confirmed' : ''}`}
                onClick={() => onSelectCheckpoint && onSelectCheckpoint(cp)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isConfirmed ? '13' : '9'}
                  fill={isConfirmed ? '#1d70f7' : '#ffffff'}
                  stroke={isConfirmed ? '#ffffff' : '#64748b'}
                  strokeWidth="1.6"
                />
                <circle r={isConfirmed ? '5' : '3.5'} fill={isConfirmed ? '#ffffff' : '#475569'} />
                <rect
                  x="-28"
                  y="12"
                  width="56"
                  height="14"
                  rx="3"
                  fill="#1e293b"
                  fillOpacity="0.8"
                />
                <text x="0" y="22" textAnchor="middle" className="qr-badge-tag">
                  {cp.id}
                </text>
              </g>
            );
          })}
        </g>

        {/* Bright Blue Corridor Route Line */}
        {smoothRouteD && (
          <g className="route-layer">
            <path
              d={smoothRouteD}
              fill="none"
              stroke="#2563eb"
              strokeOpacity="0.2"
              strokeWidth="15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={smoothRouteD}
              fill="none"
              stroke="#1d70f7"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Destination Pin Marker */}
        {isDestOnActiveFloor && destNode && (
          <g
            className="destination-pin-group"
            transform={`translate(${destNode.x}, ${destNode.y})`}
            filter="url(#pinShadow)"
          >
            <path
              d="M 0 -26 C -7.5 -26 -13 -20.5 -13 -13 C -13 -3 0 0 0 0 C 0 0 13 -3 13 -13 C 13 -20.5 7.5 -26 0 -26 Z"
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth="2.2"
            />
            <circle cx="0" cy="-14" r="4.2" fill="#ffffff" />
            <g transform="translate(0, -36)">
              <rect
                x="-55"
                y="-13"
                width="110"
                height="19"
                rx="4"
                fill="#1e293b"
                fillOpacity="0.9"
              />
              <text x="0" y="0" textAnchor="middle" className="pin-tooltip-text">
                {destPlace ? (destPlace.short[lang] || destPlace.short.en) : 'Destination'}
              </text>
            </g>
          </g>
        )}

        {/* Blue Confirmed Position Marker (Attached Strictly to Confirmed Checkpoint) */}
        {isConfirmedOnFloor && (
          <g
            className="confirmed-position-puck"
            transform={`translate(${markerX}, ${markerY})`}
          >
            {/* Accuracy ring */}
            <circle r="18" fill="#1d70f7" fillOpacity="0.18" />

            {/* Direction pointer along corridor if route exists */}
            {path.length > 1 && (
              <g transform={`rotate(${headingAngle})`}>
                <path
                  d="M 0 -20 L 6 -8 L -6 -8 Z"
                  fill="#1d70f7"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            )}

            {/* Solid blue puck */}
            <circle
              r="9"
              fill="#1d70f7"
              stroke="#ffffff"
              strokeWidth="3"
              filter="url(#softShadow)"
            />
            <circle r="3.5" fill="#ffffff" />

            {/* Confirmed Checkpoint Tag */}
            <g transform="translate(0, -28)">
              <rect
                x="-50"
                y="-13"
                width="100"
                height="18"
                rx="4"
                fill="#1d70f7"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <text x="0" y="-1" textAnchor="middle" className="confirmed-puck-tag">
                {confirmedCheckpoint?.id || 'Confirmed'}
              </text>
            </g>
          </g>
        )}

        {/* Vertical Floor Transition Indicator */}
        {hasLiftInPath && (
          <g transform="translate(317, 345)">
            <rect
              x="-60"
              y="0"
              width="120"
              height="18"
              rx="4"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <text x="0" y="12" textAnchor="middle" className="lift-banner-text">
              {activeFloor === 0 ? '↑ Lift to 1st Floor' : '↓ Lift to Ground'}
            </text>
          </g>
        )}
      </svg>

      {/* Map Legend */}
      <div className="map-legend-bar">
        <div className="legend-item">
          <span className="legend-dot user-pos-dot" />
          <span>Confirmed Checkpoint</span>
        </div>
        <div className="legend-item">
          <span className="legend-line corridor-route-line" />
          <span>Corridor Route</span>
        </div>
        <div className="legend-item">
          <span className="legend-pin dest-pin-dot" />
          <span>Destination</span>
        </div>
        <div className="legend-disclaimer">
          QR Checkpoint Positioning · Nair Hospital Model
        </div>
      </div>
    </div>
  );
}
