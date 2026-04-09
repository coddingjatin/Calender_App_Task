# Interactive Wall Calendar Component

A premium, responsive, and interactive **Wall Calendar Web App** built with **React (Next.js)** and **Tailwind CSS**, inspired by a modern physical calendar design. This project demonstrates advanced frontend engineering skills including UI/UX design, state management, and responsive layouts.

## Live Demo

👉 *https://calenderappfrontend-phi.vercel.app/*

## Video Demo

👉 *https://youtu.be/bdwzPUrBLSs*

## Features

### Calendar Grid

* Monthly calendar view with correct weekday alignment
* Highlights current date
* Smooth hover & click interactions

### Date Range Selection

* Select **start date → end date**
* Visual states:

  * 🟦 Start Date (highlighted)
  * 🟦 End Date (highlighted)
  * 🔵 In-between range (soft background)
* Easy reset & reselection

### Notes Section

* Add notes for:

  * Entire month
  * Selected date range
* Clean and minimal UI
* Data persists using **localStorage**

### Premium UI/UX

* Modern **wall calendar aesthetic**
* Hero image section for visual appeal
* Soft shadows, gradients & spacing
* Smooth animations (Framer Motion)
* Typography using **Inter / Poppins**

### Fully Responsive

* **Desktop:** Split layout (image + calendar + notes)
* **Mobile:** Stacked layout with touch-friendly UI

### Extra Enhancements

* Dark / Light mode toggle
* Month navigation (Prev / Next)
* Smooth transition animations
* Weekend highlights

## Tech Stack

* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **State Management:** React Hooks
* **Persistence:** localStorage

## Project Structure

```
/components
  CalendarGrid.jsx
  DateCell.jsx
  NotesPanel.jsx
  Header.jsx

/hooks
  useCalendar.js
  useLocalStorage.js

/utils
  dateHelpers.js

/pages
  index.js

/styles
  globals.css
```

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/calendar-app.git

# Navigate to project folder
cd calendar-app

# Install dependencies
npm install

# Run development server
npm run dev
```

👉 App will run on: `http://localhost:3000`


## Key Implementation Details

### Date Range Logic

* Uses `useState` to track:

  * startDate
  * endDate
* Handles edge cases:

  * Re-selection
  * Reverse selection (end before start)

### Local Storage

* Custom hook (`useLocalStorage`) used to:

  * Store notes
  * Restore data on reload

### Responsive Design

* Tailwind breakpoints:

  * `md:` for tablet
  * `lg:` for desktop
* Flexible layout using grid + flexbox


## Design Approach

The UI is inspired by a **physical wall calendar**, focusing on:

* Visual hierarchy (image → calendar → notes)
* Clean spacing and alignment
* Minimal yet functional design


## Future Improvements

* Google Calendar integration
* Reminder notifications
* Dynamic theme based on image
* Drag & drop notes
* Holiday API integration
