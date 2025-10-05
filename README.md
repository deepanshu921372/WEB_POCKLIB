  # 📚 Pocklib — Library Search Lite

  A single-page book browsing app with search, filtering, and bookmarking functionality.

  **Event:** Vibe Coding @ BMIET (Web Track — Option B)
  **Team:** Deepanshu Sharma & Charu Soni
  **Institution:** VIPS, B.Tech AI & ML, 3rd Year

  ---

  ## 🎯 Problem Statement
  Students need a simple way to browse, search, and bookmark books from a curated library collection.

  ---

  ## ✅ Base Requirements Implemented

  ### 1. Clear Layout & Action Flow
  - **Header:** Logo, navigation (Home, Browse, Bookmarks, FAQs, Contact), theme toggle, book counter
  - **Content Area:** Hero section → Search/Filter → Book grid → Bookmarks → FAQs → Contact form
  - **Action Flow:** Search books → View details → Bookmark → Access saved books

  ### 2. Two Core Interactions
  ✅ **Search & Filter:** Real-time search by title/author/tags with tag dropdown filter
  ✅ **Bookmark System:** Add/remove bookmarks with localStorage persistence

  ### 3. Responsive Design
  - Mobile-first design (360px–1440px)
  - Hamburger menu for small screens
  - Semantic HTML with proper heading hierarchy

  ---

  ## 🎁 Bonus Features Implemented

  ✅ **Dark Mode Toggle:** Persistent theme preference via localStorage
  ✅ **Stats Line:** Dynamic display of filtered books and bookmark count
  ✅ **Keyboard Navigation:** Skip links and full keyboard accessibility

  ---

  ## ♿ Accessibility Checklist

  ✅ All images have descriptive `alt` attributes
  ✅ Interactive elements use `aria-label` and `aria-controls`
  ✅ Form inputs properly associated with `<label for="">`
  ✅ Focus states visible on all interactive elements
  ✅ Screen reader support with `.sr-only` class
  ✅ Modal dialog with `role="dialog"` and `aria-modal`

  ---

  ## 📁 Project Structure

  WEB_POCKLIB/
  ├── index.html          # Main HTML structure
  ├── styles.css          # All styling (including responsive & dark mode)
  ├── script.js           # Core functionality (search, bookmark, theme, FAQ)
  ├── books.json          # Book data (10 items)
  ├── assets/             # Logos, hero image, intro videos
  ├── README.md           # This file
  └── NOTES.txt           # AI assistance disclosure

  ---

  ## 🚀 Features Summary

  **Core Functionality:**
  - 📖 Browse 10 curated books from `books.json`
  - 🔍 Real-time search and tag-based filtering
  - 🔖 Bookmark/unbookmark with localStorage
  - 📊 Dynamic stats (showing X books, Y bookmarks)

  **UI/UX:**
  - 🌓 Dark/Light mode toggle (saved preference)
  - 📱 Fully responsive (mobile to desktop)
  - 🎬 Video intro animation
  - ❓ Expandable FAQ section
  - 📧 Contact form with validation
  - 🎨 Modern design with cyan accent color and smooth animations

  **Technical:**
  - Vanilla HTML/CSS/JavaScript (no frameworks)
  - LocalStorage for bookmarks and theme
  - WCAG-compliant accessibility
  - Semantic HTML5

  ---

  ## 💻 How to Run

  1. Extract the ZIP file
  2. Open `index.html` in a modern browser
  3. No build process or dependencies required

  ---

  ## 🎨 Design Highlights

  - **Dark Theme:** `#0f0f0f` background with `#00d9ff` cyan accent
  - **Typography:** System fonts with clear hierarchy (white → light gray → mid-gray)
  - **Interactions:** Hover states, smooth transitions, card animations
  - **Accessibility:** High contrast, focus indicators, keyboard navigation

  ---

  ## 📝 Notes

  - AI assistance used for code generation and debugging (see `NOTES.txt`)
  - All assets created/sourced for the project
  - Tested on Chrome, Firefox, Safari (desktop & mobile)

  ---