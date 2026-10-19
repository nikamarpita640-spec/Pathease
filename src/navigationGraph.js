// Indoor Navigation Graph Engine
// Handles Dijkstra shortest path on the corridor network,
// metric distance calculation, turn-by-turn maneuver extraction, and smooth curve generation.

import { graphNodes, graphEdges, SCALE_METERS_PER_PIXEL, copy } from './hospitalData.js';

// Build bidirectional adjacency list with true Euclidean corridor distances
const adjacency = {};
Object.keys(graphNodes).forEach(id => {
  adjacency[id] = [];
});

graphEdges.forEach(([u, v, customWeight]) => {
  if (!graphNodes[u] || !graphNodes[v]) return;
  const n1 = graphNodes[u];
  const n2 = graphNodes[v];
  const euclidean = Math.hypot(n2.x - n1.x, n2.y - n1.y);
  const weight = customWeight !== undefined ? customWeight : euclidean;

  adjacency[u].push({ node: v, weight });
  adjacency[v].push({ node: u, weight });
});

/**
 * Dijkstra's shortest path algorithm
 */
export function findShortestPath(startId, targetId) {
  if (!startId || !targetId || !graphNodes[startId] || !graphNodes[targetId]) return null;
  if (startId === targetId) return [startId];

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graphNodes));

  Object.keys(graphNodes).forEach(id => {
    distances[id] = Infinity;
  });
  distances[startId] = 0;

  while (unvisited.size > 0) {
    let closest = null;
    unvisited.forEach(nodeId => {
      if (closest === null || distances[nodeId] < distances[closest]) {
        closest = nodeId;
      }
    });

    if (closest === null || distances[closest] === Infinity) break;
    if (closest === targetId) break;

    unvisited.delete(closest);

    const neighbors = adjacency[closest] || [];
    for (const { node: neighbor, weight } of neighbors) {
      if (unvisited.has(neighbor)) {
        const alt = distances[closest] + weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = closest;
        }
      }
    }
  }

  if (distances[targetId] === Infinity || !previous[targetId]) {
    return null;
  }

  const path = [];
  let curr = targetId;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return path;
}

/**
 * Calculate total physical distance of a node path in meters
 */
export function computePathDistance(path) {
  if (!path || path.length < 2) return 0;
  let totalPx = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const a = graphNodes[path[i]];
    const b = graphNodes[path[i + 1]];
    if (a && b) {
      totalPx += Math.hypot(b.x - a.x, b.y - a.y);
    }
  }
  return Math.round(totalPx * SCALE_METERS_PER_PIXEL);
}

/**
 * Calculate remaining distance from the current checkpoint step
 */
export function computeRemainingDistance(path, currentStep) {
  if (!path || path.length < 2 || currentStep >= path.length - 1) return 0;
  const remainingPath = path.slice(currentStep);
  return computePathDistance(remainingPath);
}

/**
 * Estimate walking time in minutes (~50 meters/minute hospital pace)
 */
export function estimateWalkingMinutes(meters) {
  if (meters <= 0) return 0;
  return Math.max(1, Math.ceil(meters / 50));
}

/**
 * Determine navigation instruction and turn direction from corridor geometry
 */
export function getManeuverInstruction(path, step, destPlace, lang = 'en') {
  const t = copy[lang] || copy.en;
  const destName = destPlace ? (destPlace.short[lang] || destPlace.name[lang] || destPlace.short.en) : '';

  if (!path || path.length === 0) {
    return {
      type: 'straight',
      primary: t.straight,
      secondary: '',
      distanceToTurn: 0
    };
  }

  const lastIndex = path.length - 1;
  const currIndex = Math.min(step, lastIndex);

  // Arrived at final destination node
  if (currIndex >= lastIndex) {
    return {
      type: 'arrive',
      primary: t.arrived.replace('{dest}', destName),
      secondary: t.completed,
      distanceToTurn: 0
    };
  }

  const pCurr = graphNodes[path[currIndex]];
  const pNext = graphNodes[path[currIndex + 1]];

  if (!pCurr || !pNext) {
    return {
      type: 'straight',
      primary: t.straight,
      secondary: '',
      distanceToTurn: 0
    };
  }

  // Floor transition (Lift / Stairs)
  if (pCurr.floor !== pNext.floor) {
    return {
      type: 'lift',
      primary: pNext.floor === 1 ? t.takeLiftUp : t.takeLiftDown,
      secondary: `${t.floor}: ${pNext.floor === 1 ? t.first : t.ground}`,
      distanceToTurn: 0
    };
  }

  const distToNextM = Math.round(Math.hypot(pNext.x - pCurr.x, pNext.y - pCurr.y) * SCALE_METERS_PER_PIXEL);

  // Next node is destination
  if (currIndex + 1 === lastIndex) {
    return {
      type: 'arrive-soon',
      primary: t.approaching.replace('{dest}', destName),
      secondary: `${distToNextM} m · ${destPlace ? destPlace.type : ''}`,
      distanceToTurn: distToNextM
    };
  }

  // Look ahead to evaluate turn angle at pNext
  const pNextNext = graphNodes[path[currIndex + 2]];
  if (pNextNext && pNext.floor === pNextNext.floor) {
    const v1 = { x: pNext.x - pCurr.x, y: pNext.y - pCurr.y };
    const v2 = { x: pNextNext.x - pNext.x, y: pNextNext.y - pNext.y };

    const angle1 = Math.atan2(v1.y, v1.x);
    const angle2 = Math.atan2(v2.y, v2.x);
    let diff = (angle2 - angle1) * (180 / Math.PI);

    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;

    // Right turn
    if (diff > 35 && diff < 155) {
      return {
        type: 'turn-right',
        primary: distToNextM > 5 ? t.turnRightAhead.replace('{dist}', distToNextM) : t.turnRight,
        secondary: pNext.name,
        distanceToTurn: distToNextM
      };
    }

    // Left turn
    if (diff < -35 && diff > -155) {
      return {
        type: 'turn-left',
        primary: distToNextM > 5 ? t.turnLeftAhead.replace('{dist}', distToNextM) : t.turnLeft,
        secondary: pNext.name,
        distanceToTurn: distToNextM
      };
    }
  }

  // Default: straight corridor progression
  return {
    type: 'straight',
    primary: distToNextM > 8 ? t.straightAhead.replace('{dist}', distToNextM) : t.straight,
    secondary: pNext.name,
    distanceToTurn: distToNextM
  };
}

/**
 * Generate a smooth SVG path with rounded corner turns along corridor geometry
 */
export function generateSmoothSvgPath(nodeIds, activeFloor, radius = 14) {
  if (!nodeIds || nodeIds.length < 2) return '';

  // Filter nodes for the active floor
  const points = [];
  for (let i = 0; i < nodeIds.length; i++) {
    const n = graphNodes[nodeIds[i]];
    if (n && n.floor === activeFloor) {
      points.push({ x: n.x, y: n.y });
    }
  }

  if (points.length < 2) return '';

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const vIn = { x: curr.x - prev.x, y: curr.y - prev.y };
    const lenIn = Math.hypot(vIn.x, vIn.y);

    const vOut = { x: next.x - curr.x, y: next.y - curr.y };
    const lenOut = Math.hypot(vOut.x, vOut.y);

    if (lenIn < 2 || lenOut < 2) {
      d += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    const r = Math.min(radius, lenIn / 2.2, lenOut / 2.2);

    const startX = curr.x - (vIn.x / lenIn) * r;
    const startY = curr.y - (vIn.y / lenIn) * r;

    const endX = curr.x + (vOut.x / lenOut) * r;
    const endY = curr.y + (vOut.y / lenOut) * r;

    d += ` L ${startX.toFixed(1)} ${startY.toFixed(1)}`;
    d += ` Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;

  return d;
}

/**
 * Calculate heading direction in degrees for the current position marker
 */
export function getHeadingAngle(path, step) {
  if (!path || path.length < 2) return 0;
  const idx = Math.min(step, path.length - 1);
  const nextIdx = Math.min(idx + 1, path.length - 1);

  const curr = graphNodes[path[idx]];
  const next = graphNodes[path[nextIdx]];

  if (!curr || !next || (curr.x === next.x && curr.y === next.y)) {
    // If at end, look back to previous
    if (idx > 0) {
      const prev = graphNodes[path[idx - 1]];
      if (prev) {
        return (Math.atan2(curr.y - prev.y, curr.x - prev.x) * 180) / Math.PI;
      }
    }
    return 0;
  }

  return (Math.atan2(next.y - curr.y, next.x - curr.x) * 180) / Math.PI;
}
