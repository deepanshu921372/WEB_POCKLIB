# 📚 Pocklib

A modern, accessible book browsing application with search, filtering, and bookmarking capabilities. Built with vanilla HTML, CSS, and JavaScript.

## 🎯 Project Overview

Pocklib (Pocket Library) is a single-page web application that allows users to browse, search, and bookmark books from a curated collection. The project features a responsive design, dark mode toggle, and smooth animations including a video intro screen.

**Built by:** Deepanshu Sharma & Charu Soni
**Event:** Vibe Coding (Web Track — Option B)
**Institution:** B.Tech AI & ML, 3rd Year

## ✨ Features

### Core Features
- 📖 **Book Browsing** - Browse through a collection of 10 curated books
- 🔍 **Advanced Search** - Search by title, author, or tags with real-time filtering
- 🏷️ **Tag-based Filtering** - Filter books by categories (python, web, javascript, etc.)
- ⭐ **Bookmarking System** - Save favorite books using localStorage
- 📊 **Live Statistics** - Real-time display of shown books and bookmark counts
- 📱 **Fully Responsive** - Optimized for all screen sizes (360px - 1440px+)

### UI/UX Features
- 🎬 **Video Intro** - Responsive video intro (different videos for mobile/desktop)
- 🌓 **Dark Mode** - Toggle between light and dark themes with preference saving
- 🎨 **Modern Design** - Clean, card-based layout with smooth animations
- ♿ **Accessibility** - WCAG compliant with keyboard navigation support
- 🔗 **Smooth Scrolling** - Anchor-based navigation with active state indicators
- ❓ **FAQ Section** - Expandable/collapsible frequently asked questions

### Technical Features
- 📋 **Dynamic Data Loading** - Fetches book data from JSON file
- 🎯 **Interactive Modals** - Detailed book view with descriptions
- 🔄 **State Management** - LocalStorage for bookmarks and theme preferences
- 🎭 **Emoji Tags** - Visual tag representation with emoji mapping
- 📲 **Mobile Navigation** - Hamburger menu for smaller screens

## 📁 Project Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with responsive design
├── script.js           # JavaScript functionality and interactivity
├── books.json          # Book data (10 items)
├── assets/
│   ├── mobile_video.mp4        # Mobile intro video
│   └── largeScreen_video.mp4   # Desktop intro video
├── README.md           # This file
└── NOTES.txt           # AI assistance and development notes
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. Clone or download the repository
2. Open `index.html` in your browser, or
3. Use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 5500

   # Using Node.js with http-server
   npx http-server -p 5500
   ```
4. Navigate to `http://localhost:5500`

## 🎮 Usage

### Search and Filter
- Use the search bar to find books by title, author, or tags
- Select a tag from the dropdown to filter by category
- Clear button appears when typing to quickly reset search

### Bookmarking
- Click the "☆ Bookmark" button on any book card
- Bookmarked books show "⭐ Bookmarked" state
- View all bookmarks in the dedicated "Bookmarks" section
- Bookmarks persist across browser sessions

### Navigation
- Click navigation links (Search, Bookmarks, About) for smooth scrolling
- Active section is highlighted in the navigation bar
- Mobile users get a hamburger menu for better UX

### Theme Toggle
- Click the moon/sun icon to switch between light and dark modes
- Theme preference is saved automatically

## 🎨 Design Highlights

### Color Scheme
- **Light Mode**: Clean whites and subtle grays
- **Dark Mode**: Modern dark UI with blue accents
- **Accent Color**: Professional blue (#4a90e2)

### Typography
- System font stack for optimal performance
- Clear hierarchy with readable sizes
- Responsive scaling for different devices

### Responsive Breakpoints
- Mobile: ≤ 768px
- Tablet: 769px - 1024px
- Desktop: ≥ 1025px
- Large Desktop: ≥ 1440px

## 🔧 Technical Implementation

### Technologies Used
- **HTML5** - Semantic markup with ARIA attributes
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** - ES6+ features, async/await, localStorage
- **JSON** - Data storage and retrieval

### Key Functionalities

#### Video Intro System
- Detects screen size and loads appropriate video
- Mobile: `mobile_video.mp4` (≤768px)
- Desktop: `largeScreen_video.mp4` (>768px)
- Automatic fallback and error handling

#### Search Algorithm
- Real-time filtering on input
- Searches across: title, author, and tags
- Case-insensitive matching
- Combined with tag filter for advanced queries

#### LocalStorage Usage
- Bookmarks: `localStorage.getItem('bookmarks')`
- Theme: `localStorage.getItem('theme')`
- Persistent across sessions

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ `aria-expanded` states for toggles
- ✅ `aria-controls` for FAQ sections
- ✅ Alt text for visual elements
- ✅ Color contrast compliance

## 📊 Performance

- Lightweight (no external dependencies)
- Fast load time with optimized assets
- Efficient rendering with vanilla JavaScript
- CSS transitions for smooth animations
- Lazy data loading from JSON

## ✅ Acceptance Checklist

- ✅ Loads without errors; readable from 360px–1440px
- ✅ Keyboard navigation: focus visible; toggles reachable; `aria-expanded` updates
- ✅ Multiple interactions work predictably (nav toggle, search, filter, bookmark, FAQ, theme)
- ✅ Data renders from `books.json` dynamically
- ✅ Bookmark/Unbookmark using localStorage with visual state
- ✅ Live stats line showing filtered results and bookmark count
- ✅ Dark mode with localStorage persistence
- ✅ Smooth scroll navigation
- ✅ Responsive video intro

## 🎯 Future Enhancements

- [ ] Add sorting options (by title, author, year)
- [ ] Implement pagination for larger datasets
- [ ] Add book rating system
- [ ] Export bookmarks feature
- [ ] Advanced filtering (multiple tags, year range)
- [ ] Reading list with categories
- [ ] Social sharing capabilities

## 📝 Credits & Attribution

### Development
- **Developers**: Deepanshu Sharma & Charu Soni
- **AI Assistance**: Claude Code (Anthropic)
  - Used for code generation, debugging, and optimization
  - Detailed prompts and interactions documented in `NOTES.txt`

### Assets
- **Videos**: Custom created intro videos (mobile_video.mp4, largeScreen_video.mp4)
- **Icons**: System emojis for visual elements
- **Fonts**: System font stack (no external fonts)

### Libraries & Frameworks
- **None** - Built with vanilla JavaScript, HTML, and CSS
- No external dependencies or frameworks used

## 📄 License

This project was built as part of an educational event. Feel free to use and modify for learning purposes.

## 🤝 Contributing

This is an educational project. Suggestions and improvements are welcome!

## 📧 Contact

- **Deepanshu Sharma** - B.Tech AI & ML, 3rd Year
- **Charu Soni** - B.Tech AI & ML, 3rd Year

---

**Built with ❤️ for Vibe Coding Event**
