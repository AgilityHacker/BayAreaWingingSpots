// Bay Area Winging Spots - Main Application
(function() {
    'use strict';

    // Application State
    const state = {
        currentView: 'home',
        spots: [],
        filteredSpots: [],
        searchQuery: '',
        filters: {
            region: [],
            skill: [],
            tide: [],
            features: []
        },
        sortBy: 'name',
        previousState: null
    };

    // DOM Elements Cache
    const elements = {
        views: null,
        navLinks: null,
        spotsGrid: null,
        spotDetailContent: null,
        searchInput: null,
        searchBtn: null,
        sortSelect: null,
        resultsCount: null,
        clearFiltersBtn: null,
        backToResults: null,
        beginnerSpotsGrid: null
    };

    // Initialize Application
    function init() {
        cacheElements();
        loadSpots();
        setupRouter();
        setupEventListeners();
        handleRoute();
    }

    // Cache DOM Elements
    function cacheElements() {
        elements.views = document.querySelectorAll('.view');
        elements.navLinks = document.querySelectorAll('.nav-links a');
        elements.spotsGrid = document.getElementById('spots-grid');
        elements.spotDetailContent = document.getElementById('spot-detail-content');
        elements.searchInput = document.getElementById('spot-search');
        elements.searchBtn = document.getElementById('search-btn');
        elements.sortSelect = document.getElementById('sort-select');
        elements.resultsCount = document.getElementById('results-count');
        elements.clearFiltersBtn = document.getElementById('clear-filters');
        elements.backToResults = document.getElementById('back-to-results');
        elements.beginnerSpotsGrid = document.getElementById('beginner-spots-grid');
    }

    // Load Spots Data
    function loadSpots() {
        if (typeof spotsData !== 'undefined') {
            state.spots = spotsData;
            state.filteredSpots = [...spotsData];
        }
    }

    // Router Setup
    function setupRouter() {
        window.addEventListener('hashchange', handleRoute);
        
        // Handle initial load
        if (!window.location.hash) {
            window.location.hash = '#home';
        }
    }

    // Route Handler
    function handleRoute() {
        const hash = window.location.hash || '#home';
        const [route, params] = hash.split('?');
        const cleanRoute = route.replace('#', '');
        
        // Parse parameters
        if (params) {
            parseRouteParams(params);
        }
        
        // Handle different routes
        switch(cleanRoute) {
            case 'home':
                showView('home');
                break;
            case 'spots':
                showView('spots');
                renderSpots();
                break;
            case 'getting-started':
                showView('getting-started');
                renderBeginnerSpots();
                break;
            case 'resources':
                showView('resources');
                break;
            default:
                if (cleanRoute.startsWith('spot/')) {
                    const spotId = cleanRoute.replace('spot/', '');
                    showSpotDetail(spotId);
                } else {
                    showView('home');
                }
        }
        
        updateActiveNavLink(cleanRoute);
    }

    // Parse URL Parameters
    function parseRouteParams(params) {
        const urlParams = new URLSearchParams(params);
        
        // Handle search
        if (urlParams.has('q')) {
            state.searchQuery = urlParams.get('q');
            if (elements.searchInput) {
                elements.searchInput.value = state.searchQuery;
            }
        }
        
        // Handle filters
        if (urlParams.has('skill')) {
            const skill = urlParams.get('skill');
            state.filters.skill = [skill];
            const checkbox = document.querySelector(`input[name="skill"][value="${skill}"]`);
            if (checkbox) checkbox.checked = true;
        }
        
        if (urlParams.has('season')) {
            const season = urlParams.get('season');
            if (season === 'winter') {
                state.filters.features = ['winter'];
                const checkbox = document.querySelector('input[name="feature"][value="winter"]');
                if (checkbox) checkbox.checked = true;
            }
        }
    }

    // Show View
    function showView(viewName) {
        state.currentView = viewName;
        
        elements.views.forEach(view => {
            if (view.id === `${viewName}-view`) {
                view.classList.add('active');
                view.setAttribute('aria-hidden', 'false');
            } else {
                view.classList.remove('active');
                view.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Update Active Navigation Link
    function updateActiveNavLink(route) {
        elements.navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === route || (route.startsWith('spot/') && href === 'spots')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Search
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
        }
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', handleSearch);
        }
        
        // Sort
        if (elements.sortSelect) {
            elements.sortSelect.addEventListener('change', handleSort);
        }
        
        // Filters
        document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleFilterChange);
        });
        
        if (elements.clearFiltersBtn) {
            elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
        
        // Back to results
        if (elements.backToResults) {
            elements.backToResults.addEventListener('click', (e) => {
                e.preventDefault();
                if (state.previousState) {
                    restorePreviousState();
                } else {
                    window.location.hash = '#spots';
                }
            });
        }
        
        // Spot cards click delegation
        if (elements.spotsGrid) {
            elements.spotsGrid.addEventListener('click', handleSpotCardClick);
        }
    }

    // Handle Search
    function handleSearch() {
        state.searchQuery = elements.searchInput.value.toLowerCase();
        applyFilters();
        renderSpots();
    }

    // Handle Sort
    function handleSort() {
        state.sortBy = elements.sortSelect.value;
        sortSpots();
        renderSpots();
    }

    // Handle Filter Change
    function handleFilterChange(e) {
        const filterType = e.target.name;
        const value = e.target.value;
        
        if (e.target.checked) {
            if (filterType === 'region' || filterType === 'skill' || filterType === 'tide') {
                if (!state.filters[filterType].includes(value)) {
                    state.filters[filterType].push(value);
                }
            } else if (filterType === 'feature') {
                if (!state.filters.features.includes(value)) {
                    state.filters.features.push(value);
                }
            }
        } else {
            if (filterType === 'region' || filterType === 'skill' || filterType === 'tide') {
                state.filters[filterType] = state.filters[filterType].filter(v => v !== value);
            } else if (filterType === 'feature') {
                state.filters.features = state.filters.features.filter(v => v !== value);
            }
        }
        
        applyFilters();
        renderSpots();
    }

    // Clear All Filters
    function clearAllFilters() {
        // Reset state
        state.filters = {
            region: [],
            skill: [],
            tide: [],
            features: []
        };
        state.searchQuery = '';
        
        // Reset UI
        document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        if (elements.searchInput) {
            elements.searchInput.value = '';
        }
        
        applyFilters();
        renderSpots();
    }

    // Apply Filters
    function applyFilters() {
        state.filteredSpots = state.spots.filter(spot => {
            // Search filter
            if (state.searchQuery) {
                const searchMatch = 
                    spot.name.toLowerCase().includes(state.searchQuery) ||
                    spot.region.toLowerCase().includes(state.searchQuery) ||
                    (spot.communityNotes && spot.communityNotes.toLowerCase().includes(state.searchQuery));
                if (!searchMatch) return false;
            }
            
            // Region filter
            if (state.filters.region.length > 0) {
                if (!state.filters.region.includes(spot.region)) return false;
            }
            
            // Skill filter
            if (state.filters.skill.length > 0) {
                if (!state.filters.skill.includes(spot.skillLevel.toLowerCase())) return false;
            }
            
            // Tide filter
            if (state.filters.tide.length > 0) {
                if (!state.filters.tide.includes(spot.tide.suitability)) return false;
            }
            
            // Features filter
            if (state.filters.features.length > 0) {
                for (const feature of state.filters.features) {
                    if (feature === 'winter' && !spot.seasonality.winterFriendly) return false;
                    if (feature === 'flat' && (!spot.tags || !spot.tags.includes('flat water'))) return false;
                    if (feature === 'bathroom' && !spot.facilities.bathroom) return false;
                    if (feature === 'water' && !spot.facilities.water) return false;
                }
            }
            
            return true;
        });
        
        sortSpots();
    }

    // Sort Spots
    function sortSpots() {
        state.filteredSpots.sort((a, b) => {
            switch(state.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popular':
                    // Winter friendly spots first, then by name
                    if (a.seasonality.winterFriendly && !b.seasonality.winterFriendly) return -1;
                    if (!a.seasonality.winterFriendly && b.seasonality.winterFriendly) return 1;
                    return a.name.localeCompare(b.name);
                case 'tide':
                    // Order: any > high > low
                    const tideOrder = { 'any': 0, 'high': 1, 'low': 2 };
                    const diff = tideOrder[a.tide.suitability] - tideOrder[b.tide.suitability];
                    return diff !== 0 ? diff : a.name.localeCompare(b.name);
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }

    // Render Spots
    function renderSpots() {
        if (!elements.spotsGrid) return;
        
        // Update results count
        if (elements.resultsCount) {
            elements.resultsCount.textContent = `${state.filteredSpots.length} spots found`;
        }
        
        // Clear grid
        elements.spotsGrid.innerHTML = '';
        
        // Render spots
        state.filteredSpots.forEach(spot => {
            const card = createSpotCard(spot);
            elements.spotsGrid.appendChild(card);
        });
        
        // Show empty state if no results
        if (state.filteredSpots.length === 0) {
            elements.spotsGrid.innerHTML = `
                <div class="empty-state">
                    <p>No spots match your search criteria.</p>
                    <button class="btn btn-primary" onclick="window.app.clearAllFilters()">Clear Filters</button>
                </div>
            `;
        }
    }

    // Create Spot Card
    function createSpotCard(spot) {
        const card = document.createElement('article');
        card.className = 'spot-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('data-spot-id', spot.id);
        card.setAttribute('tabindex', '0');
        
        // Build badges
        const badges = [];
        badges.push(`<span class="badge badge-skill badge-${spot.skillLevel.toLowerCase()}">${spot.skillLevel}</span>`);
        badges.push(`<span class="badge badge-tide">${spot.tide.suitability} tide</span>`);
        if (spot.seasonality.winterFriendly) {
            badges.push(`<span class="badge badge-winter">Winter</span>`);
        }
        if (spot.tags && spot.tags.includes('flat water')) {
            badges.push(`<span class="badge badge-flat">Flat Water</span>`);
        }
        
        // Build facilities
        const facilities = [];
        if (spot.facilities.bathroom) {
            facilities.push(`<span class="facility">🚻 Bathrooms</span>`);
        }
        if (spot.facilities.water) {
            facilities.push(`<span class="facility">💧 Water</span>`);
        }
        
        card.innerHTML = `
            <h3>${spot.name}</h3>
            <div class="spot-meta">
                <span>${spot.region}</span>
            </div>
            <p class="spot-description">${spot.launch || 'Popular wing foiling location'}</p>
            <div class="spot-badges">
                ${badges.join('')}
            </div>
            ${facilities.length > 0 ? `<div class="spot-facilities">${facilities.join('')}</div>` : ''}
        `;
        
        // Add keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSpotDetail(spot.id);
            }
        });
        
        return card;
    }

    // Handle Spot Card Click
    function handleSpotCardClick(e) {
        const card = e.target.closest('.spot-card');
        if (card) {
            const spotId = card.getAttribute('data-spot-id');
            // Save current state
            state.previousState = {
                filters: { ...state.filters },
                searchQuery: state.searchQuery,
                sortBy: state.sortBy
            };
            showSpotDetail(spotId);
        }
    }

    // Show Spot Detail
    function showSpotDetail(spotId) {
        const spot = state.spots.find(s => s.id === spotId);
        if (!spot) {
            window.location.hash = '#spots';
            return;
        }
        
        window.location.hash = `#spot/${spotId}`;
        showView('spot-detail');
        renderSpotDetail(spot);
    }

    // Render Spot Detail
    function renderSpotDetail(spot) {
        if (!elements.spotDetailContent) return;
        
        // Build wind directions
        const windDirections = spot.wind.directions.map(dir => 
            `<span class="wind-direction">${dir}</span>`
        ).join('');
        
        // Build nearby spots
        const nearbySpots = spot.nearby ? spot.nearby.map(id => {
            const nearbySpot = state.spots.find(s => s.id === id);
            if (nearbySpot) {
                return `<a href="#spot/${id}" class="nearby-link">${nearbySpot.name}</a>`;
            }
            return '';
        }).filter(Boolean).join('') : '';
        
        // Build facilities list
        const facilitiesList = [];
        if (spot.facilities.bathroom) facilitiesList.push('Bathrooms available');
        if (spot.facilities.water) facilitiesList.push('Water access');
        if (facilitiesList.length === 0) facilitiesList.push('No facilities on-site');
        
        elements.spotDetailContent.innerHTML = `
            <div class="spot-detail-header">
                <div class="spot-detail-title">
                    <h1 id="spot-name">${spot.name}</h1>
                    <div class="spot-detail-meta">
                        <span class="badge badge-skill badge-${spot.skillLevel.toLowerCase()}">${spot.skillLevel}</span>
                        <span class="badge">${spot.region}</span>
                        ${spot.seasonality.winterFriendly ? '<span class="badge badge-winter">Winter Friendly</span>' : ''}
                        ${spot.tags && spot.tags.includes('flat water') ? '<span class="badge badge-flat">Flat Water</span>' : ''}
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2>Overview</h2>
                <p>${spot.communityNotes || `${spot.name} is a popular wing foiling spot in the ${spot.region} area.`}</p>
            </div>
            
            <div class="detail-section">
                <h2>Location Details</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Parking</span>
                        <span class="info-value">${spot.parking || 'Parking available nearby'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Launch</span>
                        <span class="info-value">${spot.launch || 'Beach or dock launch available'}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2>Conditions</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Tide Suitability</span>
                        <span class="info-value">${spot.tide.suitability === 'any' ? 'Any tide' : `Best at ${spot.tide.suitability} tide`}</span>
                        ${spot.tide.notes ? `<p class="info-note">${spot.tide.notes}</p>` : ''}
                    </div>
                    <div class="info-item">
                        <span class="info-label">Wind Directions</span>
                        <div class="wind-directions">${windDirections}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h2>Facilities & Safety</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Facilities</span>
                        <ul>
                            ${facilitiesList.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Safety Concerns</span>
                        <span class="info-value">${spot.safety || 'Standard Bay Area conditions - check weather and tides'}</span>
                    </div>
                </div>
            </div>
            
            ${nearbySpots ? `
            <div class="detail-section">
                <h2>Nearby Spots</h2>
                <div class="nearby-spots">
                    ${nearbySpots}
                </div>
            </div>
            ` : ''}
        `;
    }

    // Restore Previous State
    function restorePreviousState() {
        if (!state.previousState) return;
        
        // Restore filters
        state.filters = { ...state.previousState.filters };
        state.searchQuery = state.previousState.searchQuery;
        state.sortBy = state.previousState.sortBy;
        
        // Update UI
        if (elements.searchInput) {
            elements.searchInput.value = state.searchQuery;
        }
        if (elements.sortSelect) {
            elements.sortSelect.value = state.sortBy;
        }
        
        // Update checkboxes
        document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        Object.entries(state.filters).forEach(([filterType, values]) => {
            values.forEach(value => {
                const checkbox = document.querySelector(`input[name="${filterType === 'features' ? 'feature' : filterType}"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        });
        
        // Apply filters and show spots
        applyFilters();
        window.location.hash = '#spots';
    }

    // Render Beginner Spots
    function renderBeginnerSpots() {
        if (!elements.beginnerSpotsGrid) return;
        
        const beginnerSpots = state.spots.filter(spot => 
            spot.skillLevel.toLowerCase() === 'beginner'
        );
        
        elements.beginnerSpotsGrid.innerHTML = '';
        beginnerSpots.forEach(spot => {
            const card = createSpotCard(spot);
            elements.beginnerSpotsGrid.appendChild(card);
        });
    }

    // Utility: Debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API
    window.app = {
        clearAllFilters: clearAllFilters
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();