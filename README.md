# D&D Character Sheet

A single-page, client-side fillable character sheet for D&D 5e with PDF export and AI-powered import.

## Features

- **Multiple Characters**: Manage multiple characters in localStorage
- **PDF Export**: Export characters as formatted, single-page PDFs
- **Smart Import**: Upload PDF/DOCX/TXT files and auto-fill with AI parsing
- **Responsive Design**: Works on desktop and mobile
- **Offline-First**: All data stored locally; only the import step uses the network
- **Parchment Theme**: D&D-inspired aesthetic with serif headings and semantic colors

## Sections

- **Name + Portrait** — Character name and 185×242 px portrait slot
- **Race & Class** — Text inputs
- **Ability Scores** — Table with auto-calculated modifiers
- **Traits & Features** — Large text area with character counter (3000 chars)
- **Resource Pools** — Dynamic table for spell slots, hit dice, etc.
- **Spells & Abilities** — Dynamic table with name, resource, and type (A/B/R)

## Tech Stack

- **Framework**: Solid.js (solid-start)
- **Styling**: CSS with semantic design tokens
- **Storage**: localStorage (typed with Zod)
- **PDF Export**: jsPDF + jspdf-autotable
- **File Parsing**: 
  - TXT: native File API
  - PDF: pdfjs-dist
  - DOCX: mammoth
- 
- **Validation**: Zod schemas

## Getting Started

### Prerequisites

- Node.js 18+ with npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Configuration



### Creating Characters

- Click **+ New** in the header to create a blank character
- Fill in the fields as you go; autosave triggers after 300ms of inactivity
- Switch between characters using the character selector dropdown

### Uploading Portrait

- Click **Upload Portrait** in the Name section
- Select an image file
- It will be automatically downscaled to 185×242 px and stored as a base64 data URL

### Importing from Files

- Click **Import** and select a PDF, DOCX, or TXT file
- The app extracts text and sends it to the AI parser
- Choose to create a new character or overwrite the current sheet
- The imported character appears instantly

### Exporting to PDF

- Click **Export PDF** to download the active character as a single-page PDF
- Includes all sections; long traits/tables auto-paginate
- Suitable for printing

### Managing Characters

- **Duplicate** — Copy the active character with a new ID
- **Delete** — Remove the active character (always keeps at least one blank)
- **Reset All** — Clear all characters and start fresh (confirmation required)

## Data Storage

All character data is stored in `localStorage` under the key `dnd-sheets-v1`:

```json
{
  "activeId": "char_id_1",
  "characters": [
    {
      "id": "char_id_1",
      "name": "Aragorn",
      "portrait": "data:image/png;base64,...",
      "race": "Human",
      "class": "Ranger",
      "abilityScores": [
        { "ability": "STR", "score": 15 },
        ...
      ],
      "traits": "...",
      "resources": [],
      "spells": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

## Project Structure

```
src/
├── components/character-sheet/
│   ├── CharacterSheet.tsx        # Main layout & state
│   ├── CharacterSwitcher.tsx     # Character selection
│   ├── PortraitUpload.tsx        # Portrait picker & canvas
│   ├── EditableTable.tsx         # Reusable table component
│   ├── ImportButton.tsx          # File upload & AI parsing
│   ├── ExportButton.tsx          # PDF export
│   └── Toast.tsx                 # Notifications
├── hooks/
│   └── useLocalStorage.ts        # Typed storage hook
├── lib/
│   ├── character.ts              # Types & Zod schemas
│   ├── dnd.ts                    # D&D utilities (modifier calc)
│   ├── extract-text.ts           # Text extraction (TXT/PDF/DOCX)
│   └── import-sheet.functions.ts # Server function for AI parsing
├── routes/
│   └── index.tsx                 # Home route
├── styles.css                    # Global styles & tokens
└── root.tsx                      # App layout
```

## Dependencies

- **jspdf** — PDF generation
- **jspdf-autotable** — Tables in PDFs
- **pdfjs-dist** — PDF text extraction
- **mammoth** — DOCX text extraction
- **zod** — Schema validation
- **solid-js** — Reactive UI framework

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.
