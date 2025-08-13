// Enhanced Bay Area Winging Spots Application
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
        previousState: null,
        currentLens: 'all',
        theme: 'retro',
        dismissedRisks: []
    };

    // Map instances
    let directoryMap = null;
    let detailMap = null;
    let mapAdapter = null;

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
        beginnerSpotsGrid: null,
        themeSwitch: null,
        lensButtons: null,
        riskBanner: null,
        galleryContent: null,
        galleryTabs: null
    };

    // Initialize Application
    function init() {
        cacheElements();
        loadSpots();
        setupTheme();
        setupRouter();
        setupEventListeners();
        initializeMaps();
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
        elements.themeSwitch = document.getElementById('theme-switch');
        elements.lensButtons = document.querySelectorAll('.lens-btn');
        elements.riskBanner = document.getElementById('risk-banner');
        elements.galleryContent = document.getElementById('gallery-content');
        elements.galleryTabs = document.querySelectorAll('.gallery-tab');
    }

    // Theme Manager
    function setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'retro';
        state.theme = savedTheme;
        
        if (savedTheme === 'retro') {
            document.body.classList.add('theme-retro');
            if (elements.themeSwitch) elements.themeSwitch.checked = true;
        } else {
            document.body.classList.remove('theme-retro');
            if (elements.themeSwitch) elements.themeSwitch.checked = false;
        }
        
        // Update text content based on theme
        updateThemeText();
    }

    function toggleTheme() {
        if (document.body.classList.contains('theme-retro')) {
            document.body.classList.remove('theme-retro');
            state.theme = 'classic';
        } else {
            document.body.classList.add('theme-retro');
            state.theme = 'retro';
        }
        localStorage.setItem('theme', state.theme);
        updateThemeText();
    }

    function updateThemeText() {
        // Update all elements with data-classic and data-retro attributes
        document.querySelectorAll('[data-classic][data-retro]').forEach(el => {
            const text = state.theme === 'retro' ? el.dataset.retro : el.dataset.classic;
            if (el.tagName === 'INPUT' || el.tagName === 'BUTTON' || el.tagName === 'A') {
                if (el.textContent) el.textContent = text;
            } else {
                el.textContent = text;
            }
        });
    }

    // Map Adapters
    class MapAdapter {
        static select() {
            if (typeof L !== 'undefined' && window.navigator.onLine) {
                return new LeafletAdapter();
            }
            return new SvgAdapter();
        }
    }

    class LeafletAdapter {
        init(container, center, zoom) {
            const mapElement = document.getElementById(container);
            if (!mapElement) return null;
            
            const map = L.map(container).setView(center, zoom);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(map);
            
            return map;
        }

        addMarker(map, spot) {
            if (!map || !spot.coordinates) return;
            
            const skillColors = {
                'Beginner': '#28a745',
                'Intermediate': '#0066cc',
                'Advanced': '#dc3545'
            };
            
            const markerHtml = `
                <div style="background-color: ${skillColors[spot.skillLevel]}; 
                            width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
                            transform: rotate(-45deg); border: 2px solid white;">
                </div>`;
            
            const icon = L.divIcon({
                html: markerHtml,
                className: 'custom-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });
            
            const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], { icon })
                .addTo(map)
                .bindPopup(`
                    <strong>${spot.name}</strong><br>
                    ${spot.region} - ${spot.skillLevel}<br>
                    Tide: ${spot.tide.suitability}<br>
                    <a href="#spot/${spot.id}">View Details</a>
                `);
            
            return marker;
        }

        fitToSpots(map, spots) {
            if (!map || !spots.length) return;
            
            const bounds = L.latLngBounds(
                spots.filter(s => s.coordinates)
                     .map(s => [s.coordinates.lat, s.coordinates.lng])
            );
            
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        setLens(map, lens) {
            const mapContainer = map.getContainer();
            mapContainer.className = mapContainer.className.replace(/lens--\w+/, '');
            if (lens !== 'all') {
                mapContainer.classList.add(`lens--${lens}`);
            }
        }
    }

    class SvgAdapter {
        init(container, center, zoom) {
            const svgContainer = document.getElementById(container.replace('-map', '-svg-map'));
            if (!svgContainer) return null;
            
            svgContainer.style.display = 'block';
            const svg = svgContainer.querySelector('svg');
            
            // Clear existing content
            svg.innerHTML = '';
            
            // Add water background
            const water = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            water.setAttribute('width', '800');
            water.setAttribute('height', '600');
            water.setAttribute('fill', '#e8f4ff');
            svg.appendChild(water);
            
            // Add land masses (simplified Bay Area)
            const land = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            land.setAttribute('d', 'M0 200 Q100 150, 200 200 L200 0 L0 0 Z M600 400 Q650 350, 700 400 L700 600 L600 600 Z');
            land.setAttribute('fill', '#f0f0f0');
            svg.appendChild(land);
            
            return svg;
        }

        addMarker(svg, spot) {
            if (!svg || !spot.coordinates) return;
            
            // Convert lat/lng to SVG coordinates (simplified projection)
            const x = ((spot.coordinates.lng + 123) * 800 / 3);
            const y = ((38.5 - spot.coordinates.lat) * 600 / 2);
            
            const skillColors = {
                'Beginner': '#28a745',
                'Intermediate': '#0066cc',
                'Advanced': '#dc3545'
            };
            
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'svg-marker');
            g.setAttribute('data-spot-id', spot.id);
            
            // Pin shape
            const pin = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pin.setAttribute('d', 'M0,-15 C-8,-15 -15,-8 -15,0 C-15,5 -10,10 0,20 C10,10 15,5 15,0 C15,-8 8,-15 0,-15 Z');
            pin.setAttribute('fill', skillColors[spot.skillLevel]);
            pin.setAttribute('stroke', 'white');
            pin.setAttribute('stroke-width', '2');
            pin.setAttribute('transform', `translate(${x}, ${y})`);
            
            // Inner circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y - 5);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', 'white');
            
            // Tooltip
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${spot.name} - ${spot.skillLevel}\nTide: ${spot.tide.suitability}`;
            
            g.appendChild(pin);
            g.appendChild(circle);
            g.appendChild(title);
            
            // Click handler
            g.style.cursor = 'pointer';
            g.addEventListener('click', () => {
                window.location.hash = `#spot/${spot.id}`;
            });
            
            svg.appendChild(g);
        }

        fitToSpots(svg, spots) {
            // SVG viewBox is fixed, no need to adjust
        }

        setLens(svg, lens) {
            const container = svg.parentElement;
            container.className = container.className.replace(/lens--\w+/, '');
            if (lens !== 'all') {
                container.classList.add(`lens--${lens}`);
            }
        }
    }

    // Initialize Maps
    function initializeMaps() {
        mapAdapter = MapAdapter.select();
        
        // Directory map
        if (document.getElementById('directory-map')) {
            directoryMap = mapAdapter.init('directory-map', [37.8, -122.4], 9);
            if (directoryMap && state.spots.length) {
                state.spots.forEach(spot => {
                    mapAdapter.addMarker(directoryMap, spot);
                });
                mapAdapter.fitToSpots(directoryMap, state.spots);
            }
        }
    }

    // Gallery Component
    class Gallery {
        constructor(container) {
            this.container = container;
            this.currentCategory = 'beauty';
        }

        render(spot) {
            if (!spot.imagery) return;
            
            this.showCategory(this.currentCategory, spot);
            
            // Setup tab handlers
            document.querySelectorAll('.gallery-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentCategory = e.target.dataset.category;
                    this.showCategory(this.currentCategory, spot);
                });
            });
        }

        showCategory(category, spot) {
            const images = spot.imagery[category] || [];
            const container = document.getElementById('gallery-content');
            
            if (!container) return;
            
            container.innerHTML = '';
            
            if (images.length === 0) {
                container.innerHTML = '<p>No images available for this category.</p>';
                return;
            }
            
            images.forEach(img => {
                const item = this.createGalleryItem(img, category);
                container.appendChild(item);
            });
        }

        createGalleryItem(image, category) {
            const div = document.createElement('div');
            div.className = `gallery-item ${category === 'risk' ? 'risk-item' : ''}`;
            
            // Create placeholder based on image kind
            const placeholder = document.createElement('div');
            placeholder.className = `gallery-placeholder placeholder-${category}`;
            
            if (image.kind === 'svg') {
                // Add SVG icon based on category
                const icon = this.getSvgIcon(category);
                placeholder.innerHTML = icon;
            } else {
                // Gradient background already applied via CSS
                placeholder.innerHTML = `<span style="color: white; font-size: 48px;">🌊</span>`;
            }
            
            placeholder.setAttribute('loading', 'lazy');
            placeholder.setAttribute('alt', image.alt);
            
            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.textContent = image.title;
            
            div.appendChild(placeholder);
            div.appendChild(caption);
            
            // TODO: Replace with real images from assets/photos/{spot-id}/
            
            return div;
        }

        getSvgIcon(category) {
            const icons = {
                beauty: '<svg viewBox="0 0 100 100" width="80" height="80"><circle cx="50" cy="30" r="15" fill="rgba(255,255,255,0.8)"/><path d="M20 60 Q50 40, 80 60" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none"/></svg>',
                fun: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M30 50 C20 30, 40 20, 50 30 C60 20, 80 30, 70 50 L50 70 Z" fill="rgba(255,255,255,0.8)"/></svg>',
                risk: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M50 20 L30 60 L70 60 Z" stroke="rgba(255,255,255,0.8)" stroke-width="3" fill="none"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="24">!</text></svg>'
            };
            return icons[category] || '';
        }
    }

    // Risk Banner Component
    class RiskBanner {
        constructor(spot) {
            this.spot = spot;
            this.element = document.getElementById('risk-banner');
        }

        render() {
            if (!this.spot.hazards || this.spot.hazards.length === 0) {
                this.hide();
                return;
            }

            // Check if dismissed
            const dismissed = state.dismissedRisks.includes(this.spot.id);
            if (dismissed) {
                this.hide();
                return;
            }

            this.show();
            this.renderPills();
            this.setupDismiss();
        }

        renderPills() {
            const container = document.getElementById('risk-pills');
            if (!container) return;

            container.innerHTML = '';

            const hazardIcons = {
                'currents': '🌊',
                'strong currents': '💨',
                'boat traffic': '⛵',
                'shipping lanes': '🚢',
                'rocks': '🪨',
                'low-tide mud': '🟫',
                'strong wind': '💨',
                'ocean waves': '🌊',
                'ocean swell': '🌊',
                'cold water': '🧊',
                'dogs': '🐕',
                'restricted area': '⚠️',
                'storm surges': '⛈️',
                'rip currents': '🌀',
                'wind shadows': '🌬️',
                'harbor traffic': '⛵',
                'altitude': '⛰️',
                'weather changes': '🌦️',
                'offshore wind': '💨'
            };

            this.spot.hazards.forEach(hazard => {
                const pill = document.createElement('span');
                pill.className = 'risk-pill';
                pill.innerHTML = `${hazardIcons[hazard] || '⚠️'} ${hazard}`;
                container.appendChild(pill);
            });
        }

        setupDismiss() {
            const dismissBtn = document.querySelector('.risk-dismiss');
            if (!dismissBtn) return;

            dismissBtn.onclick = () => {
                state.dismissedRisks.push(this.spot.id);
                localStorage.setItem('dismissedRisks', JSON.stringify(state.dismissedRisks));
                this.hide();
            };
        }

        show() {
            if (this.element) {
                this.element.style.display = 'block';
            }
        }

        hide() {
            if (this.element) {
                this.element.style.display = 'none';
            }
        }
    }

    // Load Spots Data
    function loadSpots() {
        if (typeof spotsData !== 'undefined') {
            state.spots = spotsData;
            state.filteredSpots = [...spotsData];
        }
        
        // Load dismissed risks from localStorage
        const dismissed = localStorage.getItem('dismissedRisks');
        if (dismissed) {
            state.dismissedRisks = JSON.parse(dismissed);
        }
    }

    // Router Setup
    function setupRouter() {
        window.addEventListener('hashchange', handleRoute);
        
        if (!window.location.hash) {
            window.location.hash = '#home';
        }
    }

    // Route Handler
    function handleRoute() {
        const hash = window.location.hash || '#home';
        const [route, params] = hash.split('?');
        const cleanRoute = route.replace('#', '');
        
        if (params) {
            parseRouteParams(params);
        }
        
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
        
        if (urlParams.has('q')) {
            state.searchQuery = urlParams.get('q');
            if (elements.searchInput) {
                elements.searchInput.value = state.searchQuery;
            }
        }
        
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
        
        if (urlParams.has('lens')) {
            state.currentLens = urlParams.get('lens');
            updateLensButtons();
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
        // Theme toggle
        if (elements.themeSwitch) {
            elements.themeSwitch.addEventListener('change', toggleTheme);
        }
        
        // Lens buttons
        elements.lensButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                state.currentLens = e.target.dataset.lens;
                updateLensButtons();
                if (mapAdapter && directoryMap) {
                    mapAdapter.setLens(directoryMap, state.currentLens);
                }
            });
        });
        
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

    // Update Lens Buttons
    function updateLensButtons() {
        elements.lensButtons.forEach(btn => {
            if (btn.dataset.lens === state.currentLens) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
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
        state.filters = {
            region: [],
            skill: [],
            tide: [],
            features: []
        };
        state.searchQuery = '';
        
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
            if (state.searchQuery) {
                const searchMatch = 
                    spot.name.toLowerCase().includes(state.searchQuery) ||
                    spot.region.toLowerCase().includes(state.searchQuery) ||
                    (spot.communityNotes && spot.communityNotes.toLowerCase().includes(state.searchQuery));
                if (!searchMatch) return false;
            }
            
            if (state.filters.region.length > 0) {
                if (!state.filters.region.includes(spot.region)) return false;
            }
            
            if (state.filters.skill.length > 0) {
                if (!state.filters.skill.includes(spot.skillLevel.toLowerCase())) return false;
            }
            
            if (state.filters.tide.length > 0) {
                if (!state.filters.tide.includes(spot.tide.suitability)) return false;
            }
            
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
        
        // Apply lens-based emphasis
        if (state.currentLens !== 'all') {
            state.filteredSpots.sort((a, b) => {
                const scoreA = a.lensHints ? a.lensHints[`${state.currentLens}Score`] || 0 : 0;
                const scoreB = b.lensHints ? b.lensHints[`${state.currentLens}Score`] || 0 : 0;
                return scoreB - scoreA;
            });
        } else {
            sortSpots();
        }
    }

    // Sort Spots
    function sortSpots() {
        state.filteredSpots.sort((a, b) => {
            switch(state.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popular':
                    if (a.seasonality.winterFriendly && !b.seasonality.winterFriendly) return -1;
                    if (!a.seasonality.winterFriendly && b.seasonality.winterFriendly) return 1;
                    return a.name.localeCompare(b.name);
                case 'tide':
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
        
        if (elements.resultsCount) {
            elements.resultsCount.textContent = `${state.filteredSpots.length} spots found`;
        }
        
        elements.spotsGrid.innerHTML = '';
        
        state.filteredSpots.forEach(spot => {
            const card = createSpotCard(spot);
            elements.spotsGrid.appendChild(card);
        });
        
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
        
        const badges = [];
        badges.push(`<span class="badge badge-skill badge-${spot.skillLevel.toLowerCase()}">${spot.skillLevel}</span>`);
        badges.push(`<span class="badge badge-tide">${spot.tide.suitability} tide</span>`);
        if (spot.seasonality.winterFriendly) {
            badges.push(`<span class="badge badge-winter">Winter</span>`);
        }
        if (spot.tags && spot.tags.includes('flat water')) {
            badges.push(`<span class="badge badge-flat">Flat Water</span>`);
        }
        
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
        
        // Initialize detail map
        if (mapAdapter && spot.coordinates) {
            const detailMapEl = document.getElementById('detail-map');
            if (detailMapEl) {
                detailMap = mapAdapter.init('detail-map', 
                    [spot.coordinates.lat, spot.coordinates.lng], 14);
                if (detailMap) {
                    mapAdapter.addMarker(detailMap, spot);
                }
            }
        }
        
        // Render risk banner
        const riskBanner = new RiskBanner(spot);
        riskBanner.render();
        
        // Render gallery
        const gallery = new Gallery(document.getElementById('spot-gallery'));
        gallery.render(spot);
    }

    // Render Spot Detail
    function renderSpotDetail(spot) {
        if (!elements.spotDetailContent) return;
        
        const windDirections = spot.wind.directions.map(dir => 
            `<span class="wind-direction">${dir}</span>`
        ).join('');
        
        const nearbySpots = spot.nearby ? spot.nearby.map(id => {
            const nearbySpot = state.spots.find(s => s.id === id);
            if (nearbySpot) {
                return `<a href="#spot/${id}" class="nearby-link">${nearbySpot.name}</a>`;
            }
            return '';
        }).filter(Boolean).join('') : '';
        
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
        
        state.filters = { ...state.previousState.filters };
        state.searchQuery = state.previousState.searchQuery;
        state.sortBy = state.previousState.sortBy;
        
        if (elements.searchInput) {
            elements.searchInput.value = state.searchQuery;
        }
        if (elements.sortSelect) {
            elements.sortSelect.value = state.sortBy;
        }
        
        document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        Object.entries(state.filters).forEach(([filterType, values]) => {
            values.forEach(value => {
                const checkbox = document.querySelector(`input[name="${filterType === 'features' ? 'feature' : filterType}"][value="${value}"]`);
                if (checkbox) checkbox.checked = true;
            });
        });
        
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
        clearAllFilters: clearAllFilters,
        toggleTheme: toggleTheme
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();