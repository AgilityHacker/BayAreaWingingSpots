// Bay Area Wing Foiling Spots Database
const spotsData = [
    // East Bay - Primary Spots
    {
        id: 'his-lordship',
        name: 'His Lordship (Berkeley Marina)',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Launch to get right into wind line. Usable at any tide level.'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Large parking lot at Berkeley Marina',
        launch: 'Launch from beach or dock to get directly into wind line',
        safety: 'Watch for boat traffic from marina',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: true
        },
        tags: [],
        communityNotes: 'Popular winter spot with reliable wind. Great for getting right into the wind line quickly.',
        nearby: ['berkeley-marina', 'point-isabel']
    },
    {
        id: 'berkeley-marina',
        name: 'Berkeley Marina (3 Docks/Cal Sailing)',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Needs high enough tide for foiling. Best when wind is solid and filled in.'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Multiple parking areas near docks',
        launch: 'Three docks available, Cal Sailing Club area popular',
        safety: 'Check tide charts - low tide can be challenging',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: true
        },
        tags: [],
        communityNotes: 'Home to Cal Sailing Club. Multiple launch options but tide dependent.',
        nearby: ['his-lordship', 'point-isabel']
    },
    {
        id: 'barbara-jay-vincent',
        name: 'Barbara & Jay Vincent Park',
        region: 'East Bay',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Flat water conditions especially in high wind'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Park parking lot available',
        launch: 'Beach launch at Richmond Marina',
        safety: 'Can get very windy - advanced riders preferred',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: true
        },
        tags: ['flat water'],
        communityNotes: 'Winter spot known for flat water in high wind conditions. Richmond Marina location.',
        nearby: ['point-isabel']
    },
    {
        id: 'point-isabel',
        name: 'Point Isabel',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Be aware of currents during tide changes'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Large parking area, can get crowded on weekends',
        launch: 'Beach launch, watch for off-leash dogs nearby',
        safety: 'Strong currents possible, dogs off-leash in adjacent area',
        facilities: {
            bathroom: true,
            water: false
        },
        seasonality: {
            winterFriendly: true
        },
        tags: [],
        communityNotes: 'Very popular spot among wing foilers. Note the off-leash dog area nearby.',
        nearby: ['berkeley-marina', 'barbara-jay-vincent']
    },
    {
        id: 'gilman-racetrack',
        name: 'Gilman St Beach/Racetrack',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Check tide levels before heading out'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Street parking available',
        launch: 'Beach launch from Gilman Street',
        safety: 'Be aware of tide conditions and currents',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Popular spot known as "The Racetrack" among locals. Good for speed runs.',
        nearby: ['berkeley-marina', 'point-isabel']
    },
    {
        id: 'bay-bridge',
        name: 'Bay Bridge Entrance',
        region: 'East Bay',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'high',
            notes: 'Only go when tide conditions are favorable'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Limited parking, check local regulations',
        launch: 'Technical launch, experience required',
        safety: 'Strong currents, boat traffic, advanced riders only',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Advanced spot near Bay Bridge. Check tide carefully before attempting.',
        nearby: ['treasure-island']
    },
    {
        id: 'treasure-island',
        name: 'Treasure Island',
        region: 'San Francisco',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Great most of the time but avoid during storms'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Public parking available on island',
        launch: 'Multiple launch points around the island',
        safety: 'Can get rough in storms, strong currents possible',
        facilities: {
            bathroom: true,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Great spot for advanced riders most of the time. Avoid during storm conditions.',
        nearby: ['bay-bridge', 'crissy-field']
    },
    {
        id: 'alameda',
        name: 'Alameda Beach',
        region: 'East Bay',
        skillLevel: 'Beginner',
        tide: {
            suitability: 'high',
            notes: 'Low tide means long walk with gear'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Beach parking lots available',
        launch: 'Nice beach launch, easy entry',
        safety: 'Generally safe, good for beginners',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Great beginner spot with nice beach launch. Mind the tides or face a long walk.',
        nearby: ['bay-bridge']
    },
    
    // Additional East Bay Spots
    {
        id: 'benicia',
        name: 'Benicia',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Check local conditions'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Public parking available',
        launch: 'Multiple launch points',
        safety: 'Check wind and current conditions',
        facilities: {
            bathroom: true,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Less crowded alternative in the North Bay area.',
        nearby: []
    },
    {
        id: 'sherman-island',
        name: 'Sherman Island',
        region: 'East Bay',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Strong wind location'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Large parking area',
        launch: 'Multiple launch areas',
        safety: 'Very strong winds, advanced riders only',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Famous for strong, consistent winds. Popular with experienced riders.',
        nearby: []
    },
    
    // Marin Spots
    {
        id: 'san-quentin',
        name: 'San Quentin Prison Area',
        region: 'Marin',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Tide dependent access'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Limited parking near launch',
        launch: 'Beach launch area',
        safety: 'Stay clear of restricted areas',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Unique spot near San Quentin. Respect boundaries and regulations.',
        nearby: ['point-san-quentin']
    },
    {
        id: 'point-san-quentin',
        name: 'Point San Quentin',
        region: 'Marin',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Better at higher tides'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Small parking area',
        launch: 'Rocky beach launch',
        safety: 'Watch for rocks at low tide',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Less crowded Marin option with good wind.',
        nearby: ['san-quentin', 'rod-gun-club']
    },
    {
        id: 'rod-gun-club',
        name: 'Rod & Gun Club',
        region: 'Marin',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'All tide access'
        },
        wind: {
            directions: ['W', 'SW', 'NW']
        },
        parking: 'Club parking available',
        launch: 'Private club launch (check access)',
        safety: 'Private property - verify access',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Private club with good facilities. Check access requirements.',
        nearby: ['point-san-quentin']
    },
    {
        id: 'loch-lomond',
        name: 'Loch Lomond Marina',
        region: 'Marin',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Marina access tide dependent'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Marina parking',
        launch: 'Marina launch ramp',
        safety: 'Watch for boat traffic',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Protected marina location in San Rafael.',
        nearby: ['rod-gun-club']
    },
    {
        id: 'brickyard',
        name: 'Brickyard',
        region: 'Marin',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'high',
            notes: 'High tide required'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Limited roadside parking',
        launch: 'Beach launch',
        safety: 'Strong currents, advanced spot',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Advanced Marin spot with strong conditions.',
        nearby: ['loch-lomond']
    },
    
    // North Coast Spots
    {
        id: 'bodega-bay',
        name: 'Bodega Bay',
        region: 'North Coast',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Ocean conditions vary'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Multiple parking areas',
        launch: 'Beach launches available',
        safety: 'Ocean conditions, cold water, currents',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Ocean wing foiling spot. Check swell and wind conditions.',
        nearby: ['tomales-bay', 'ocean-bodega']
    },
    {
        id: 'tomales-bay',
        name: 'Tomales Bay',
        region: 'North Coast',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Protected bay conditions'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Various launch spots with parking',
        launch: 'Multiple beach access points',
        safety: 'Generally protected, watch for wind shadows',
        facilities: {
            bathroom: true,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: ['flat water'],
        communityNotes: 'Beautiful protected bay, great for flat water riding.',
        nearby: ['bodega-bay']
    },
    {
        id: 'ocean-bodega',
        name: 'Ocean near Bodega Bay',
        region: 'North Coast',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Ocean swell considerations'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Beach parking areas',
        launch: 'Beach launch through surf',
        safety: 'Ocean conditions, waves, currents - advanced only',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Open ocean wing foiling. Requires wave and ocean experience.',
        nearby: ['bodega-bay']
    },
    
    // Peninsula/South Bay Spots
    {
        id: 'palo-alto-lake',
        name: 'Palo Alto Lake',
        region: 'Peninsula',
        skillLevel: 'Beginner',
        tide: {
            suitability: 'any',
            notes: 'Lake conditions, no tide concerns'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Park parking available',
        launch: 'Easy lake access',
        safety: 'Protected lake environment, great for learning',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: ['flat water'],
        communityNotes: 'Excellent beginner spot with flat water and no tide concerns.',
        nearby: ['half-moon-bay']
    },
    {
        id: 'marina-bay',
        name: 'Marina Bay',
        region: 'East Bay',
        skillLevel: 'Beginner',
        tide: {
            suitability: 'any',
            notes: 'Protected marina conditions'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Marina parking lots',
        launch: 'Easy marina launch',
        safety: 'Protected area, good for beginners',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: ['flat water'],
        communityNotes: 'Beginner-friendly protected marina location.',
        nearby: ['barbara-jay-vincent']
    },
    {
        id: 'half-moon-bay',
        name: 'Half Moon Bay',
        region: 'Peninsula',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Ocean conditions apply'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Harbor parking available',
        launch: 'Harbor or beach launch',
        safety: 'Ocean conditions, check swell',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Protected harbor option or ocean access for more advanced riders.',
        nearby: ['palo-alto-lake']
    },
    
    // San Francisco Spots
    {
        id: 'crissy-field',
        name: 'Crissy Field',
        region: 'San Francisco',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Strong currents near Golden Gate'
        },
        wind: {
            directions: ['W', 'SW']
        },
        parking: 'Paid parking lots available',
        launch: 'Beach launch',
        safety: 'Very strong currents, ship traffic, advanced only',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Iconic SF spot with Golden Gate views. Strong currents require experience.',
        nearby: ['ocean-beach', 'treasure-island']
    },
    {
        id: 'ocean-beach',
        name: 'Ocean Beach',
        region: 'San Francisco',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Ocean waves and swell'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Street parking along Great Highway',
        launch: 'Beach launch through surf',
        safety: 'Ocean conditions, waves, rip currents',
        facilities: {
            bathroom: true,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Ocean wing foiling spot. Requires wave experience.',
        nearby: ['crissy-field', 'third-avenue']
    },
    {
        id: 'third-avenue',
        name: 'Third Avenue',
        region: 'Peninsula',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'high',
            notes: 'Tide dependent launch'
        },
        wind: {
            directions: ['W', 'NW']
        },
        parking: 'Street parking',
        launch: 'Beach access',
        safety: 'Check tide conditions',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Peninsula bay access point.',
        nearby: ['ocean-beach']
    },
    
    // Santa Cruz Area
    {
        id: 'waddell-creek',
        name: 'Waddell Creek',
        region: 'Santa Cruz',
        skillLevel: 'Advanced',
        tide: {
            suitability: 'any',
            notes: 'Ocean conditions'
        },
        wind: {
            directions: ['NW', 'W']
        },
        parking: 'Highway pullout parking',
        launch: 'Beach launch',
        safety: 'Ocean waves, strong wind, rocks',
        facilities: {
            bathroom: false,
            water: false
        },
        seasonality: {
            winterFriendly: false
        },
        tags: [],
        communityNotes: 'Classic windsurf/wing spot on Highway 1.',
        nearby: []
    },
    
    // Mountain Lakes
    {
        id: 'lake-tahoe',
        name: 'Lake Tahoe',
        region: 'Sierra Nevada',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Lake conditions'
        },
        wind: {
            directions: ['varies']
        },
        parking: 'Various beach access points',
        launch: 'Multiple beaches around lake',
        safety: 'Cold water year-round, altitude considerations',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: ['flat water'],
        communityNotes: 'High altitude lake with afternoon thermal winds in summer.',
        nearby: ['donner-lake']
    },
    {
        id: 'donner-lake',
        name: 'Donner Lake',
        region: 'Sierra Nevada',
        skillLevel: 'Intermediate',
        tide: {
            suitability: 'any',
            notes: 'Lake conditions'
        },
        wind: {
            directions: ['varies']
        },
        parking: 'Public beach parking',
        launch: 'Beach launches',
        safety: 'Cold water, mountain weather changes',
        facilities: {
            bathroom: true,
            water: true
        },
        seasonality: {
            winterFriendly: false
        },
        tags: ['flat water'],
        communityNotes: 'Smaller mountain lake near Tahoe with good afternoon winds.',
        nearby: ['lake-tahoe']
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = spotsData;
}