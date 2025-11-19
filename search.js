// Search Page Functionality
let allArticles = [];
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

// Initialize search page
document.addEventListener('DOMContentLoaded', function() {
    loadArticlesForSearch();
    setupSearchPage();
    setupMobileMenu();
    
    // Check if there's a search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        document.getElementById('searchPageInput').value = query;
        performSearchPage(query);
    }
});

// Load articles for search
async function loadArticlesForSearch() {
    try {
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allArticles = await response.json();
        console.log(`Loaded ${allArticles.length} articles for search`);
    } catch (error) {
        console.warn('Could not load articles.json, trying fallback:', error);
        // Try to get articles from global scope (if script.js loaded first)
        if (typeof window.articles !== 'undefined' && window.articles.length > 0) {
            allArticles = window.articles;
            console.log(`Using global articles: ${allArticles.length} articles`);
        } else {
            // Use embedded fallback from script.js
            allArticles = [
                {"id": 1, "title": "Sustainable Fashion: The Future of Wardrobe Essentials", "category": "fashion", "categoryName": "Fashion & Accessories", "date": "2025-01-15", "author": "Sarah Mitchell", "featuredImage": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", "excerpt": "Exploring how sustainable fashion brands are revolutionizing the industry with eco-friendly materials and ethical production practices.", "content": "<p>In an era where environmental consciousness meets style, sustainable fashion has emerged as more than just a trend—it's a movement reshaping the entire fashion industry.</p>", "images": ["https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"], "products": [{"name": "Organic Cotton T-Shirt", "brand": "Patagonia", "price": "$45", "description": "Made from 100% organic cotton.", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", "link": "#"}]},
                {"id": 2, "title": "The Science of Skincare: Advanced Anti-Aging Solutions", "category": "health", "categoryName": "Health & Beauty", "date": "2025-03-22", "author": "Dr. Emily Chen", "featuredImage": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80", "excerpt": "Discover the latest scientific breakthroughs in anti-aging skincare and how to build an effective routine.", "content": "<p>Skincare science has evolved dramatically in recent years, with cutting-edge research revealing new pathways to healthy, youthful skin.</p>", "images": ["https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80"], "products": [{"name": "Advanced Retinol Serum", "brand": "SkinCeuticals", "price": "$85", "description": "Clinically proven to reduce fine lines.", "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80", "link": "#"}]},
                {"id": 3, "title": "Minimalist Home Design: Creating Serene Living Spaces", "category": "home", "categoryName": "Home & Garden", "date": "2025-05-10", "author": "James Anderson", "featuredImage": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80", "excerpt": "Learn how minimalist design principles can transform your home into a peaceful sanctuary that promotes well-being.", "content": "<p>Minimalist home design goes beyond aesthetic choices—it's a philosophy that emphasizes intentionality, functionality, and tranquility.</p>", "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"], "products": [{"name": "Scandinavian Sofa", "brand": "IKEA", "price": "$599", "description": "Clean lines and comfortable design.", "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", "link": "#"}]},
                {"id": 4, "title": "Hidden Gems: Undiscovered European Destinations", "category": "travel", "categoryName": "Travel & Accommodation", "date": "2025-07-18", "author": "Maria Rodriguez", "featuredImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80", "excerpt": "Explore lesser-known European destinations that offer authentic experiences away from tourist crowds.", "content": "<p>While Paris, Rome, and Barcelona draw millions of visitors annually, Europe is home to countless hidden gems.</p>", "images": ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"], "products": [{"name": "European Travel Guide 2025", "brand": "Lonely Planet", "price": "$24.99", "description": "Comprehensive guide to hidden destinations.", "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80", "link": "#"}]},
                {"id": 5, "title": "Smart Financial Planning for Millennials and Gen Z", "category": "finance", "categoryName": "Finance & Insurance", "date": "2025-08-05", "author": "Michael Thompson", "featuredImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", "excerpt": "Essential financial strategies tailored for younger generations navigating today's economic landscape.", "content": "<p>Financial planning for millennials and Gen Z requires a different approach than previous generations.</p>", "images": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"], "products": [{"name": "Personal Finance App", "brand": "YNAB", "price": "$14.99/month", "description": "Comprehensive budgeting tool.", "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", "link": "#"}]},
                {"id": 6, "title": "Artisanal Coffee Culture: From Bean to Cup Excellence", "category": "food", "categoryName": "Food & Beverage", "date": "2025-02-28", "author": "David Kim", "featuredImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80", "excerpt": "Discover the world of specialty coffee and learn how to elevate your daily brew with expert techniques and premium beans.", "content": "<p>The specialty coffee movement has transformed the simple act of drinking coffee into an art form.</p>", "images": ["https://images.unsplash.com/photo-1511920170033-83939cdcace7?w=800&q=80"], "products": [{"name": "Premium Coffee Beans", "brand": "Blue Bottle Coffee", "price": "$18", "description": "Single-origin beans roasted to perfection.", "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", "link": "#"}]}
            ];
            console.log(`Using fallback articles: ${allArticles.length} articles`);
        }
    }
}

// Setup search page
function setupSearchPage() {
    const searchInput = document.getElementById('searchPageInput');
    const clearBtn = document.getElementById('clearSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const popularTags = document.querySelectorAll('.tag');
    
    // Search input handler
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Show/hide clear button
            if (query.length > 0) {
                clearBtn.style.display = 'block';
            } else {
                clearBtn.style.display = 'none';
                resetSearchPage();
                return;
            }
            
            // Debounce search
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    performSearchPage(query);
                } else {
                    resetSearchPage();
                }
            }, 300);
        });
        
        // Enter key to search
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query.length >= 2) {
                    performSearchPage(query);
                }
            }
        });
    }
    
    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            resetSearchPage();
            searchInput.focus();
        });
    }
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                performSearchPage(query);
            }
        });
    }
    
    // Popular tags
    popularTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const searchTerm = tag.getAttribute('data-search');
            searchInput.value = searchTerm;
            clearBtn.style.display = 'block';
            performSearchPage(searchTerm);
        });
    });
}

// Perform search on search page
function performSearchPage(query) {
    if (!query || query.length < 2) {
        resetSearchPage();
        return;
    }
    
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const results = searchArticles(query, categoryFilter);
    
    // Save to search history
    if (!searchHistory.includes(query.toLowerCase())) {
        searchHistory.unshift(query.toLowerCase());
        searchHistory = searchHistory.slice(0, 10); // Keep last 10 searches
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    
    displaySearchResults(results, query);
}

// Enhanced search function
function searchArticles(query, categoryFilter = '') {
    if (!allArticles || allArticles.length === 0) {
        return [];
    }
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    const results = [];
    
    allArticles.forEach(article => {
        // Filter by category if specified
        if (categoryFilter && article.category !== categoryFilter) {
            return;
        }
        
        // Build searchable text
        const searchableText = `
            ${article.title} 
            ${article.excerpt} 
            ${article.content} 
            ${article.categoryName}
            ${article.author}
            ${article.products?.map(p => `${p.name} ${p.brand} ${p.description}`).join(' ') || ''}
        `.toLowerCase();
        
        // Calculate relevance score
        let score = 0;
        let matches = 0;
        
        searchTerms.forEach(term => {
            // Title matches (highest weight)
            if (article.title.toLowerCase().includes(term)) {
                score += 10;
                matches++;
            }
            // Category matches
            if (article.categoryName.toLowerCase().includes(term)) {
                score += 5;
                matches++;
            }
            // Content matches
            if (searchableText.includes(term)) {
                score += 1;
                matches++;
            }
        });
        
        // Only include if at least one term matched
        if (matches > 0) {
            results.push({
                article: article,
                score: score,
                matches: matches
            });
        }
    });
    
    // Sort by relevance score (highest first)
    results.sort((a, b) => b.score - a.score);
    
    return results.map(r => r.article);
}

// Display search results
function displaySearchResults(results, query) {
    const popularSearches = document.getElementById('popularSearches');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const noResults = document.getElementById('noResults');
    const searchStats = document.getElementById('searchStats');
    const searchStatsText = document.getElementById('searchStatsText');
    
    // Hide popular searches
    if (popularSearches) {
        popularSearches.style.display = 'none';
    }
    
    if (results.length === 0) {
        // Show no results
        if (searchResultsGrid) searchResultsGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        if (searchStats) searchStats.style.display = 'none';
        return;
    }
    
    // Show results
    if (noResults) noResults.style.display = 'none';
    if (searchResultsGrid) {
        searchResultsGrid.style.display = 'grid';
        
        // Group results by category
        const groupedResults = groupResultsByCategory(results);
        
        let html = '';
        
        // Display by category
        Object.keys(groupedResults).forEach(category => {
            const categoryArticles = groupedResults[category];
            html += `
                <div class="search-category-group">
                    <h3 class="search-category-title">${category}</h3>
                    <div class="search-results-cards">
                        ${categoryArticles.map(article => createSearchResultCard(article, query)).join('')}
                    </div>
                </div>
            `;
        });
        
        searchResultsGrid.innerHTML = html;
    }
    
    // Update stats
    if (searchStats && searchStatsText) {
        searchStats.style.display = 'block';
        const categoryFilter = document.getElementById('categoryFilter')?.value || '';
        let statsText = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
        if (categoryFilter) {
            const categoryName = document.getElementById('categoryFilter').options[document.getElementById('categoryFilter').selectedIndex].text;
            statsText += ` in ${categoryName}`;
        }
        searchStatsText.textContent = statsText;
    }
}

// Group results by category
function groupResultsByCategory(results) {
    const grouped = {};
    results.forEach(article => {
        const category = article.categoryName || 'Uncategorized';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(article);
    });
    return grouped;
}

// Create search result card
function createSearchResultCard(article, query) {
    const highlightedTitle = highlightText(article.title, query);
    const highlightedExcerpt = highlightText(article.excerpt, query);
    
    return `
        <a href="article.html?id=${article.id}" class="search-result-card">
            <div class="search-result-image">
                <img src="${article.featuredImage}" alt="${article.title}" loading="lazy">
            </div>
            <div class="search-result-content">
                <div class="search-result-meta">
                    <span class="search-category-badge">${article.categoryName}</span>
                    <span>${formatDate(article.date)}</span>
                    <span>${article.author}</span>
                </div>
                <h3>${highlightedTitle}</h3>
                <p class="search-result-excerpt">${highlightedExcerpt}</p>
                <div class="search-result-footer">
                    <span class="read-more-link">Read Article →</span>
                </div>
            </div>
        </a>
    `;
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!text || !query) return text;
    
    const terms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlighted = text;
    
    terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });
    
    return highlighted;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Reset search page
function resetSearchPage() {
    const popularSearches = document.getElementById('popularSearches');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const noResults = document.getElementById('noResults');
    const searchStats = document.getElementById('searchStats');
    
    if (popularSearches) popularSearches.style.display = 'block';
    if (searchResultsGrid) searchResultsGrid.style.display = 'none';
    if (noResults) noResults.style.display = 'none';
    if (searchStats) searchStats.style.display = 'none';
}

// Setup mobile menu (reuse from main script)
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

