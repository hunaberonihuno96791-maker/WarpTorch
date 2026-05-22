# WarpTorch Frontend

React + TypeScript + Three.js frontend for visualizing general relativity simulations.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
# Start frontend (port 3000)
npm run dev

# Start backend (port 8000) - in another terminal
cd ../backend
pip install -r requirements.txt
python main.py
```

## Features

- **3D Visualization**: Interactive 3D rendering of warp bubble metrics
- **Real-time Controls**: Adjust simulation parameters on the fly
- **Multiple Metrics**: Support for various spacetime metrics (Alcubierre, Lentz, etc.)
- **Energy Analysis**: Visual representation of energy density distributions

## Tech Stack

- React 18 with TypeScript
- Three.js for 3D graphics
- React Three Fiber (@react-three/fiber)
- Drei helpers (@react-three/drei)
- Vite for fast development
- FastAPI backend integration

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open browser at `http://localhost:3000`
4. Adjust parameters in the control panel
5. Click "Start Simulation" to run calculations
6. Interact with the 3D scene using mouse controls

## Controls

- **Left Click + Drag**: Rotate view
- **Right Click + Drag**: Pan view
- **Scroll**: Zoom in/out
- **Control Panel**: Adjust simulation parameters

## Project Structure

```
src/
├── components/
│   ├── AlcubierreWarpBubble.tsx  # 3D warp bubble visualization
│   ├── SimulationPanel.tsx       # Control panel UI
│   └── *.css                     # Component styles
├── App.tsx                       # Main application
├── main.tsx                      # Entry point
└── *.css                         # Global styles
```
