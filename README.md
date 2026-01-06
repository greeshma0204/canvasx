
# CanvasX – Visual Web Builder Studio

CanvasX is a web-based, drag-and-drop single-page website builder that allows users to visually create professional portfolio websites without writing code. It focuses on simplicity, smooth user experience, autosave, and one-click export to a standalone HTML file that works offline.



# Problem Statement

Creating a clean and professional personal website or portfolio requires knowledge of HTML, CSS, and JavaScript. Many beginners and non-technical users struggle with this complexity.

CanvasX solves this problem by providing a visual block-based editor where users can build a complete one-page website by dragging, editing, and arranging predefined sections, and exporting the result as a ready-to-use HTML file.


# Features

# Core Features
- Drag-and-drop placement of predefined blocks
- Block library containing:
 - Hero Section
 - Bio Section
 - Gallery
 - Publications
 - Contact Section
 - Footer
- Inline text editing inside blocks
- Reordering blocks vertically
- Deleting blocks from the canvas
- Autosave functionality
- Project persistence across page reloads
- One-click export to a standalone HTML file

# Persistence
- Local autosave- using browser localStorage
- Backend persistence- using Node.js, Express, and MongoDB
- Automatic fallback to localStorage if backend is unavailable

# Export
- Generates a single self-contained HTML file
- Embedded CSS and content
- Dark theme with gold-accent outer border
- Exported file works fully offline and matches the editor preview
- works fully offline


# Tech Stack

# Frontend
- React.js
- HTML5 Drag and Drop
- CSS (custom styling)
- interact.js

# Backend
- Node.js
- Express.js
- REST APIs

# Database
- MongoDB
- Mongoose 

# Export
- Client-side HTML generation using the Blob API



# Architecture Overview

CanvasX follows a client–server architecture:

- Frontend (React)
  Handles UI rendering, drag-and-drop interactions, editing, autosave, and exporting HTML.

- Backend (Node.js + Express)  
  Provides REST APIs to save and load project data.

- Database (MongoDB) 
  Stores block data to ensure permanent project persistence.



# Application Workflow

1. User drags blocks from the Block Library to the Canvas
2. Blocks can be edited, reordered, or deleted
3. All changes update React state
4. Autosave triggers:
   - Immediate save to localStorage
   - Background save to MongoDB via API
5. On page reload:
   - Data is loaded from MongoDB
   - Falls back to localStorage if backend is unavailable
6. Export button generates a styled HTML file for download

# Folder Structure


canvasx/
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
│   ├── components/
│   │   ├── header.jsx
│   │   ├── sidebar.jsx
│   │   └── canvas.jsx
│   ├── styles/
│   │   └── canvasx.css
│   ├── App.jsx
│   └── index.js
└── README.md

# Setup Instructions

# Frontend

npm install
npm start

# Backend

cd backend
npm install
node server.js

## API Endpoints

| POST | /save | Saves the current project blocks |
| GET  | /load | Loads the saved project blocks |

## Usage Guide

- Open CanvasX editor in browser
- Drag blocks from sidebar to canvas
- Edit text inline
- Reorder or delete blocks
- Autosave runs automatically
- Click Export to download HTML file

## AI  tools and  Usage 
- chatgpt
AI tools were used only for:
- Concept clarification
- Debugging explanations
- Documentation assistance
## other resources
-used MDN documents
-youtube videos for understanding

## Third-Party Libraries & Assets

- React.js
- Express.js
- MongoDB
- Mongoose
- Interact.js



=======
# canvasx
>>>>>>> 998a88362f48a8f940d615e45be287fc90145bd7
