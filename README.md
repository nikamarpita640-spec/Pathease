# PathEase — Nair Hospital indoor wayfinding prototype

PathEase is a React + Vite prototype for planning multiple hospital stops and following a highlighted indoor route on a simplified architectural-style floor plan.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production bundle, run:

```bash
npm run build
```

## Current prototype behavior

- Select a starting checkpoint and add/reorder/remove destinations.
- Press **Start navigation** to stay inside PathEase and open the indoor navigation screen. It does not open an external map.
- Follow the green corridor route. Use **Advance to next checkpoint** to preview marker movement and turns.
- Confirm arrival to move to the next selected destination.
- English, Hindi and Marathi interface text is supported.
- A `?checkpoint=entrance` URL parameter can be used as a future integration point for known checkpoints.

## Important accuracy and positioning notes

The displayed floor plan and room placements are editable illustrative geometry, **not a verified Nair Hospital architectural plan**. Do not use it for real patient navigation until hospital-approved floor plans, room locations, corridor connections and floor transitions are checked on site.

The moving marker currently advances through known route checkpoints using the prototype control. It does not detect a person's physical indoor movement. Live indoor tracking requires a deployed positioning source (for example, installed BLE beacons/Wi-Fi positioning or QR checkpoint scans) and an integration that updates the current checkpoint. Browser GPS alone is not reliable enough for room-level indoor navigation.
