// ==================== State Management ====================
let booksData = [];
let filteredBooks = [];
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let currentTheme = localStorage.getItem('theme') || 'light';

// ==================== Emoji Mapping ====================
const tagEmojiMap = {
    'python': '🐍',
    'web': '🌐',
    'a11y': '♿',
    'ui': '🎨',
    'javascript': '📜',
    'ds': '🔗',
    'sql': '🗄️',
    'db': '💾',
    'frontend': '💻',
    'architecture': '🏗️',
    'ml': '🤖',
    'notes': '📝',
    'git': '🌳',
    'version-control': '🔀',
    'design': '✨',
    'systems': '⚙️',
    'network': '🌐',
    'basics': '📚',
    'linux': '🐧',
    'cli': '⌨️'
};

// ==================== Load Books Data ====================
async function loadBooksData() {
    try {
        const response = await fetch('books.json');
        const books = await response.json();

        // Transform data to match our UI structure
        booksData = books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            year: book.year,
            tags: book.tags,
            genre: book.tags[0] ? book.tags[0].toUpperCase() : 'General',
            description: `${book.title} by ${book.author} (${book.year}). Tags: ${book.tags.join(', ')}.`,
            emoji: book.tags[0] ? (tagEmojiMap[book.tags[0]] || '📖') : '📖'
        }));

        filteredBooks = [...booksData];
        populateGenreFilter();
        renderBooks(filteredBooks);
        renderBookmarks();
        updateStats();
    } catch (error) {
        console.error('Error loading books:', error);
        document.getElementById('books-grid').innerHTML = '<p class="empty-state">Error loading books. Please refresh the page.</p>';
    }
}

// ==================== Video Intro ====================
document.addEventListener('DOMContentLoaded', () => {
    const videoIntro = document.getElementById('video-intro');
    const mainApp = document.getElementById('main-app');
    const introVideo = document.getElementById('intro-video');

    // Prevent scrolling during video
    document.body.classList.add('video-playing');

    // Function to determine which video to use based on screen size
    function getVideoSource() {
        return window.innerWidth <= 768 ? 'assets/mobile_video.mp4' : 'assets/largeScreen_video.mp4';
    }

    // Set the correct video source
    const videoSrc = getVideoSource();
    introVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
    introVideo.load();

    // Play video (with error handling)
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Video autoplay prevented:', error);
            // If autoplay fails, skip to main app
            skipToMainApp();
        });
    }

    // Function to skip to main app
    function skipToMainApp() {
        videoIntro.classList.add('fade-out');
        setTimeout(() => {
            videoIntro.style.display = 'none';
            mainApp.classList.remove('hidden');
            document.body.classList.remove('video-playing');
            document.body.classList.add('video-complete');
        }, 500);
    }

    // Handle video end
    introVideo.addEventListener('ended', skipToMainApp);

    // Handle video errors
    introVideo.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        skipToMainApp();
    });

    // Fallback: If video fails to load or play (max 10 seconds)
    setTimeout(() => {
        if (!introVideo.ended && videoIntro.style.display !== 'none') {
            skipToMainApp();
        }
    }, 10000);

    // Initialize app
    initializeApp();
});

// ==================== Initialize App ====================
async function initializeApp() {
    // Set theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    updateLogos();

    // Load books data
    await loadBooksData();

    // Event Listeners
    setupEventListeners();
}

// ==================== Event Listeners ====================
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Search
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    searchInput.addEventListener('input', handleSearch);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('visible');
        handleSearch();
    });

    // Genre filter
    document.getElementById('genre-filter').addEventListener('change', handleFilter);

    // FAQ toggles
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', toggleFAQ);
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Smooth scroll navigation
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Remove active class from all links
                document.querySelectorAll('.nav-list a').forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile nav if open
                const navToggle = document.getElementById('nav-toggle');
                const mainNav = document.getElementById('main-nav');
                if (navToggle.getAttribute('aria-expanded') === 'true') {
                    navToggle.setAttribute('aria-expanded', 'false');
                    mainNav.classList.remove('active');
                }
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Logo click to scroll to top
    document.querySelector('.logo-container').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== Update Active Navigation ====================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ==================== Theme Toggle ====================
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    updateLogos();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

function updateLogos() {
    const logoFav = document.getElementById('logo-fav');
    const logoText = document.getElementById('logo-text');

    if (currentTheme === 'dark') {
        // Dark mode: use light logos
        logoFav.src = 'assets/lightFavLogo.png';
        logoText.src = 'assets/lightTextLogo.png';
    } else {
        // Light mode: use dark logos
        logoFav.src = 'assets/darkFavLogo.png';
        logoText.src = 'assets/darkTextLogo.png';
    }
}

// ==================== Populate Genre Filter ====================
function populateGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');

    // Get all unique tags from all books
    const allTags = new Set();
    booksData.forEach(book => {
        if (book.tags) {
            book.tags.forEach(tag => allTags.add(tag));
        }
    });

    const uniqueTags = [...allTags].sort();

    // Clear existing options except "All Tags"
    genreFilter.innerHTML = '<option value="">All Tags</option>';

    // Add unique tags from data
    uniqueTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        genreFilter.appendChild(option);
    });
}

// ==================== Search & Filter ====================
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const clearBtn = document.getElementById('clear-search');

    if (searchTerm) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }

    const genreFilter = document.getElementById('genre-filter').value;

    filteredBooks = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            (book.tags && book.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        const matchesTag = !genreFilter || (book.tags && book.tags.includes(genreFilter));
        return matchesSearch && matchesTag;
    });

    renderBooks(filteredBooks);
    updateStats();
}

function handleFilter() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const genreFilter = document.getElementById('genre-filter').value;

    filteredBooks = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                            book.author.toLowerCase().includes(searchTerm) ||
                            (book.tags && book.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
        const matchesTag = !genreFilter || (book.tags && book.tags.includes(genreFilter));
        return matchesSearch && matchesTag;
    });

    renderBooks(filteredBooks);
    updateStats();
}

// ==================== Render Books ====================
function renderBooks(books) {
    const booksGrid = document.getElementById('books-grid');
    const noResults = document.getElementById('no-results');

    if (books.length === 0) {
        booksGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    booksGrid.innerHTML = books.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover">${book.emoji}</div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-tags">
                ${book.tags ? book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('') : ''}
            </div>
            <div class="book-actions">
                <button class="bookmark-btn ${isBookmarked(book.id) ? 'bookmarked' : ''}"
                        onclick="toggleBookmark('${book.id}')"
                        aria-label="${isBookmarked(book.id) ? 'Remove bookmark' : 'Add bookmark'}">
                    ${isBookmarked(book.id) ? '🔖 Bookmarked' : '🔖 Bookmark'}
                </button>
                <button class="details-btn" onclick="showDetails('${book.id}')" aria-label="View details for ${book.title}">
                    Details
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== Bookmarks ====================
function isBookmarked(bookId) {
    return bookmarks.includes(bookId);
}

function toggleBookmark(bookId) {
    if (isBookmarked(bookId)) {
        bookmarks = bookmarks.filter(id => id !== bookId);
    } else {
        bookmarks.push(bookId);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBooks(filteredBooks);
    renderBookmarks();
    updateStats();
}

function renderBookmarks() {
    const bookmarksGrid = document.getElementById('bookmarks-grid');
    const bookmarkedBooks = booksData.filter(book => isBookmarked(book.id));

    if (bookmarkedBooks.length === 0) {
        bookmarksGrid.innerHTML = '<p class="empty-state">No bookmarks yet. Start exploring books above!</p>';
        return;
    }

    bookmarksGrid.innerHTML = bookmarkedBooks.map(book => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover">${book.emoji}</div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-tags">
                ${book.tags ? book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('') : ''}
            </div>
            <div class="book-actions">
                <button class="bookmark-btn bookmarked"
                        onclick="toggleBookmark('${book.id}')"
                        aria-label="Remove bookmark">
                    🔖 Bookmarked
                </button>
                <button class="details-btn" onclick="showDetails('${book.id}')" aria-label="View details for ${book.title}">
                    Details
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== Stats ====================
function updateStats() {
    const statsText = document.getElementById('stats-text');
    const totalBooksCount = document.getElementById('total-books-count');
    const displayCount = filteredBooks.length;
    const bookmarkCount = bookmarks.length;

    statsText.textContent = `Showing ${displayCount} book${displayCount !== 1 ? 's' : ''} • ${bookmarkCount} bookmark${bookmarkCount !== 1 ? 's' : ''}`;

    // Update navbar book counter
    if (totalBooksCount) {
        totalBooksCount.textContent = `${booksData.length} Book${booksData.length !== 1 ? 's' : ''}`;
    }
}

// ==================== Modal ====================
function showDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${book.emoji}</div>
            <h2 id="modal-title" style="margin-bottom: 0.5rem;">${book.title}</h2>
            <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">by ${book.author} • ${book.year}</p>
            <div class="book-tags" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
                ${book.tags ? book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('') : ''}
            </div>
        </div>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
            ${book.description}
        </p>
        <button class="bookmark-btn ${isBookmarked(book.id) ? 'bookmarked' : ''}"
                onclick="toggleBookmark('${book.id}'); showDetails('${book.id}')"
                style="width: 100%; padding: 0.75rem;"
                aria-label="${isBookmarked(book.id) ? 'Remove bookmark' : 'Add bookmark'}">
            ${isBookmarked(book.id) ? '🔖 Bookmarked' : '🔖 Bookmark'}
        </button>
    `;

    modal.classList.remove('hidden');
    document.querySelector('.modal-close').focus();
}

function closeModal() {
    document.getElementById('book-modal').classList.add('hidden');
}

// ==================== FAQ Toggle ====================
function toggleFAQ(e) {
    const button = e.currentTarget;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    button.setAttribute('aria-expanded', !isExpanded);
    answer.classList.toggle('hidden');
}
