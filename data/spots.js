// Bay Area Wing Foiling Spots Database - Enhanced with coordinates, imagery, and hazards
const spotsData = [
    // East Bay - Primary Spots
    {
        id: 'his-lordship',
        name: 'His Lordship (Berkeley Marina)',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        coordinates: { lat: 37.8682, lng: -122.3106 },
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
        nearby: ['berkeley-marina', 'point-isabel'],
        hazards: ['boat traffic', 'currents'],
        lensHints: { beautyScore: 4, funScore: 5, riskScore: 2 },
        imagery: {
            beauty: [
                { id: 'marina-sunset', title: 'Berkeley Marina Sunset', alt: 'Golden Gate Bridge silhouette at sunset from Berkeley Marina', credit: 'placeholder', kind: 'gradient', tags: ['sunset', 'panorama'] },
                { id: 'bay-vista', title: 'Bay Vista', alt: 'Wide view of San Francisco Bay with sailing boats', credit: 'placeholder', kind: 'svg', tags: ['panorama', 'scenic'] }
            ],
            fun: [
                { id: 'wing-action', title: 'Wing Foilers in Action', alt: 'Multiple wing foilers riding in good wind conditions', credit: 'placeholder', kind: 'svg', tags: ['action', 'community'] },
                { id: 'launch-party', title: 'Launch Day', alt: 'Group of wing foilers preparing at the launch', credit: 'placeholder', kind: 'gradient', tags: ['community', 'vibe'] }
            ],
            risk: [
                { id: 'boat-lanes', title: 'Marina Traffic', alt: 'Boat traffic lanes near the marina - stay alert', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'boats'] }
            ]
        }
    },
    {
        id: 'berkeley-marina',
        name: 'Berkeley Marina (3 Docks/Cal Sailing)',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        coordinates: { lat: 37.8659, lng: -122.3152 },
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
        nearby: ['his-lordship', 'point-isabel'],
        hazards: ['low-tide mud', 'currents'],
        lensHints: { beautyScore: 4, funScore: 5, riskScore: 3 },
        imagery: {
            beauty: [
                { id: 'cal-sailing', title: 'Cal Sailing View', alt: 'Cal Sailing Club with colorful sails against blue sky', credit: 'placeholder', kind: 'gradient', tags: ['marina', 'sailing'] }
            ],
            fun: [
                { id: 'dock-launch', title: 'Dock Launch', alt: 'Wing foilers launching from the Cal Sailing docks', credit: 'placeholder', kind: 'svg', tags: ['action', 'launch'] }
            ],
            risk: [
                { id: 'low-tide', title: 'Low Tide Hazard', alt: 'Exposed mudflats at low tide - check tide charts', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'tide'] }
            ]
        }
    },
    {
        id: 'barbara-jay-vincent',
        name: 'Barbara & Jay Vincent Park',
        region: 'East Bay',
        skillLevel: 'Advanced',
        coordinates: { lat: 37.9072, lng: -122.3633 },
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
        nearby: ['point-isabel'],
        hazards: ['strong wind', 'currents'],
        lensHints: { beautyScore: 3, funScore: 5, riskScore: 4 },
        imagery: {
            beauty: [
                { id: 'richmond-marina', title: 'Richmond Marina', alt: 'Richmond Marina with Mt. Tamalpais in background', credit: 'placeholder', kind: 'gradient', tags: ['marina', 'scenic'] }
            ],
            fun: [
                { id: 'flat-water', title: 'Flat Water Paradise', alt: 'Perfect flat water conditions for wing foiling', credit: 'placeholder', kind: 'svg', tags: ['flat', 'speed'] },
                { id: 'speed-runs', title: 'Speed Runs', alt: 'Wing foilers doing speed runs in flat water', credit: 'placeholder', kind: 'gradient', tags: ['action', 'speed'] }
            ],
            risk: [
                { id: 'high-wind', title: 'Strong Wind Warning', alt: 'Very strong wind conditions - advanced riders only', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'wind'] }
            ]
        }
    },
    {
        id: 'point-isabel',
        name: 'Point Isabel',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        coordinates: { lat: 37.9000, lng: -122.3247 },
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
        nearby: ['berkeley-marina', 'barbara-jay-vincent'],
        hazards: ['currents', 'dogs'],
        lensHints: { beautyScore: 4, funScore: 5, riskScore: 2 },
        imagery: {
            beauty: [
                { id: 'point-view', title: 'Point Isabel Vista', alt: 'Panoramic bay view from Point Isabel', credit: 'placeholder', kind: 'gradient', tags: ['panorama', 'scenic'] }
            ],
            fun: [
                { id: 'community-spot', title: 'Community Gathering', alt: 'Popular launch spot with many wing foilers', credit: 'placeholder', kind: 'svg', tags: ['community', 'vibe'] }
            ],
            risk: [
                { id: 'dog-beach', title: 'Off-Leash Area', alt: 'Dogs playing near launch area - stay aware', credit: 'placeholder', kind: 'svg', tags: ['caution', 'dogs'] }
            ]
        }
    },
    {
        id: 'gilman-racetrack',
        name: 'Gilman St Beach/Racetrack',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        coordinates: { lat: 37.8785, lng: -122.3258 },
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
        nearby: ['berkeley-marina', 'point-isabel'],
        hazards: ['currents', 'low-tide mud'],
        lensHints: { beautyScore: 3, funScore: 5, riskScore: 3 },
        imagery: {
            beauty: [
                { id: 'racetrack-view', title: 'The Racetrack', alt: 'Long stretch of water perfect for speed runs', credit: 'placeholder', kind: 'gradient', tags: ['scenic', 'speed'] }
            ],
            fun: [
                { id: 'speed-track', title: 'Speed Track Action', alt: 'Wing foilers racing on the speed track', credit: 'placeholder', kind: 'svg', tags: ['action', 'speed'] }
            ],
            risk: [
                { id: 'tide-trap', title: 'Tide Dependent', alt: 'Low tide exposes mudflats - check charts', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'tide'] }
            ]
        }
    },
    {
        id: 'bay-bridge',
        name: 'Bay Bridge Entrance',
        region: 'East Bay',
        skillLevel: 'Advanced',
        coordinates: { lat: 37.8183, lng: -122.3778 },
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
        nearby: ['treasure-island'],
        hazards: ['strong currents', 'boat traffic', 'shipping lanes'],
        lensHints: { beautyScore: 5, funScore: 4, riskScore: 5 },
        imagery: {
            beauty: [
                { id: 'bridge-view', title: 'Bay Bridge Vista', alt: 'Iconic Bay Bridge spanning the water', credit: 'placeholder', kind: 'gradient', tags: ['iconic', 'bridge'] }
            ],
            fun: [
                { id: 'bridge-ride', title: 'Bridge Session', alt: 'Advanced riders near the Bay Bridge', credit: 'placeholder', kind: 'svg', tags: ['action', 'advanced'] }
            ],
            risk: [
                { id: 'ship-lanes', title: 'Shipping Hazard', alt: 'Large vessel traffic - stay clear of shipping lanes', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'ships'] },
                { id: 'current-danger', title: 'Strong Currents', alt: 'Powerful tidal currents near bridge - experts only', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'currents'] }
            ]
        }
    },
    {
        id: 'treasure-island',
        name: 'Treasure Island',
        region: 'San Francisco',
        skillLevel: 'Advanced',
        coordinates: { lat: 37.8233, lng: -122.3706 },
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
        nearby: ['bay-bridge', 'crissy-field'],
        hazards: ['strong wind', 'currents', 'storm surges'],
        lensHints: { beautyScore: 5, funScore: 5, riskScore: 4 },
        imagery: {
            beauty: [
                { id: 'ti-skyline', title: 'SF Skyline View', alt: 'San Francisco skyline from Treasure Island', credit: 'placeholder', kind: 'gradient', tags: ['skyline', 'iconic'] },
                { id: 'ti-sunset', title: 'Island Sunset', alt: 'Sunset over the bay from Treasure Island', credit: 'placeholder', kind: 'svg', tags: ['sunset', 'panorama'] }
            ],
            fun: [
                { id: 'ti-session', title: 'Island Session', alt: 'Wing foilers enjoying Treasure Island winds', credit: 'placeholder', kind: 'svg', tags: ['action', 'community'] }
            ],
            risk: [
                { id: 'storm-warning', title: 'Storm Conditions', alt: 'Rough conditions during storms - avoid', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'storm'] }
            ]
        }
    },
    {
        id: 'alameda',
        name: 'Alameda Beach',
        region: 'East Bay',
        skillLevel: 'Beginner',
        coordinates: { lat: 37.7711, lng: -122.2883 },
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
        nearby: ['bay-bridge'],
        hazards: ['low-tide mud'],
        lensHints: { beautyScore: 4, funScore: 4, riskScore: 1 },
        imagery: {
            beauty: [
                { id: 'alameda-beach', title: 'Alameda Beach', alt: 'Sandy beach with calm waters perfect for learning', credit: 'placeholder', kind: 'gradient', tags: ['beach', 'calm'] }
            ],
            fun: [
                { id: 'learn-spot', title: 'Learning Paradise', alt: 'Beginners practicing wing foiling in safe conditions', credit: 'placeholder', kind: 'svg', tags: ['learning', 'beginner'] }
            ],
            risk: [
                { id: 'tide-walk', title: 'Low Tide Walk', alt: 'Long walk at low tide - check tide charts', credit: 'placeholder', kind: 'svg', tags: ['caution', 'tide'] }
            ]
        }
    },
    
    // Additional East Bay Spots
    {
        id: 'benicia',
        name: 'Benicia',
        region: 'East Bay',
        skillLevel: 'Intermediate',
        coordinates: { lat: 38.0494, lng: -122.1586 }, // TODO: Verify exact launch coordinates
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
        nearby: [],
        hazards: ['currents'],
        lensHints: { beautyScore: 3, funScore: 3, riskScore: 2 },
        imagery: {
            beauty: [{ id: 'benicia-view', title: 'Benicia Waters', alt: 'Benicia waterfront view', credit: 'placeholder', kind: 'gradient', tags: ['scenic'] }],
            fun: [{ id: 'benicia-ride', title: 'Benicia Session', alt: 'Wing foiling at Benicia', credit: 'placeholder', kind: 'svg', tags: ['action'] }],
            risk: [{ id: 'benicia-current', title: 'Current Watch', alt: 'Watch for currents', credit: 'placeholder', kind: 'svg', tags: ['caution'] }]
        }
    },
    {
        id: 'sherman-island',
        name: 'Sherman Island',
        region: 'East Bay',
        skillLevel: 'Advanced',
        coordinates: { lat: 38.0675, lng: -121.7589 },
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
        nearby: [],
        hazards: ['strong wind', 'currents'],
        lensHints: { beautyScore: 3, funScore: 5, riskScore: 5 },
        imagery: {
            beauty: [{ id: 'sherman-delta', title: 'Delta Views', alt: 'Sacramento Delta panorama', credit: 'placeholder', kind: 'gradient', tags: ['delta'] }],
            fun: [{ id: 'sherman-wind', title: 'Wind Paradise', alt: 'Strong wind action at Sherman Island', credit: 'placeholder', kind: 'svg', tags: ['wind', 'action'] }],
            risk: [{ id: 'sherman-power', title: 'Extreme Wind', alt: 'Very strong winds - advanced only', credit: 'placeholder', kind: 'svg', tags: ['hazard', 'wind'] }]
        }
    },
    
    // Marin Spots
    {
        id: 'san-quentin',
        name: 'San Quentin Prison Area',
        region: 'Marin',
        coordinates: { lat: 37.9386, lng: -122.4894 },
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
        nearby: ['point-san-quentin'],
        hazards: ["restricted area","currents"],
        lensHints: {"beautyScore":3,"funScore":3,"riskScore":3},
        imagery: {
                  "beauty": [
                            {
                                      "id": "san-quentin-view",
                                      "title": "san-quentin View",
                                      "alt": "Scenic view at san-quentin",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "san-quentin-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at san-quentin",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'point-san-quentin',
        name: 'Point San Quentin',
        region: 'Marin',
        coordinates: { lat: 37.9442, lng: -122.4761 },
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
        nearby: ['san-quentin', 'rod-gun-club'],
        hazards: ["rocks","currents"],
        lensHints: {"beautyScore":4,"funScore":4,"riskScore":3},
        imagery: {
                  "beauty": [
                            {
                                      "id": "point-san-quentin-view",
                                      "title": "point-san-quentin View",
                                      "alt": "Scenic view at point-san-quentin",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "point-san-quentin-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at point-san-quentin",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'rod-gun-club',
        name: 'Rod & Gun Club',
        region: 'Marin',
        coordinates: { lat: 37.955, lng: -122.4886 },
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
        nearby: ['point-san-quentin'],
        hazards: ["boat traffic"],
        lensHints: {"beautyScore":3,"funScore":4,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "rod-gun-club-view",
                                      "title": "rod-gun-club View",
                                      "alt": "Scenic view at rod-gun-club",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "rod-gun-club-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at rod-gun-club",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'loch-lomond',
        name: 'Loch Lomond Marina',
        region: 'Marin',
        coordinates: { lat: 37.9708, lng: -122.5086 },
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
        nearby: ['rod-gun-club'],
        hazards: ["boat traffic","low-tide mud"],
        lensHints: {"beautyScore":3,"funScore":3,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "loch-lomond-view",
                                      "title": "loch-lomond View",
                                      "alt": "Scenic view at loch-lomond",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "loch-lomond-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at loch-lomond",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'brickyard',
        name: 'Brickyard',
        region: 'Marin',
        coordinates: { lat: 37.8811, lng: -122.5011 },
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
        nearby: ['loch-lomond'],
        hazards: ["strong currents","rocks"],
        lensHints: {"beautyScore":4,"funScore":4,"riskScore":4},
        imagery: {
                  "beauty": [
                            {
                                      "id": "brickyard-view",
                                      "title": "brickyard View",
                                      "alt": "Scenic view at brickyard",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "brickyard-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at brickyard",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "brickyard-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at brickyard",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    
    // North Coast Spots
    {
        id: 'bodega-bay',
        name: 'Bodega Bay',
        region: 'North Coast',
        coordinates: { lat: 38.3325, lng: -123.0481 },
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
        nearby: ['tomales-bay', 'ocean-bodega'],
        hazards: ["ocean swell","cold water","currents"],
        lensHints: {"beautyScore":5,"funScore":4,"riskScore":4},
        imagery: {
                  "beauty": [
                            {
                                      "id": "bodega-bay-view",
                                      "title": "bodega-bay View",
                                      "alt": "Scenic view at bodega-bay",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "bodega-bay-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at bodega-bay",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "bodega-bay-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at bodega-bay",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    {
        id: 'tomales-bay',
        name: 'Tomales Bay',
        region: 'North Coast',
        coordinates: { lat: 38.1967, lng: -122.9208 },
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
        nearby: ['bodega-bay'],
        hazards: ["wind shadows"],
        lensHints: {"beautyScore":5,"funScore":4,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "tomales-bay-view",
                                      "title": "tomales-bay View",
                                      "alt": "Scenic view at tomales-bay",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "tomales-bay-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at tomales-bay",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'ocean-bodega',
        name: 'Ocean near Bodega Bay',
        region: 'North Coast',
        coordinates: { lat: 38.3089, lng: -123.0725 },
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
        nearby: ['bodega-bay'],
        hazards: ["ocean waves","currents","cold water"],
        lensHints: {"beautyScore":5,"funScore":3,"riskScore":5},
        imagery: {
                  "beauty": [
                            {
                                      "id": "ocean-bodega-view",
                                      "title": "ocean-bodega View",
                                      "alt": "Scenic view at ocean-bodega",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "ocean-bodega-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at ocean-bodega",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "ocean-bodega-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at ocean-bodega",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    
    // Peninsula/South Bay Spots
    {
        id: 'palo-alto-lake',
        name: 'Palo Alto Lake',
        region: 'Peninsula',
        coordinates: { lat: 37.4419, lng: -122.143 },
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
        nearby: ['half-moon-bay'],
        hazards: [],
        lensHints: {"beautyScore":3,"funScore":3,"riskScore":1},
        imagery: {
                  "beauty": [
                            {
                                      "id": "palo-alto-lake-view",
                                      "title": "palo-alto-lake View",
                                      "alt": "Scenic view at palo-alto-lake",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "palo-alto-lake-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at palo-alto-lake",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'marina-bay',
        name: 'Marina Bay',
        region: 'East Bay',
        coordinates: { lat: 37.9197, lng: -122.3478 },
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
        nearby: ['barbara-jay-vincent'],
        hazards: [],
        lensHints: {"beautyScore":3,"funScore":3,"riskScore":1},
        imagery: {
                  "beauty": [
                            {
                                      "id": "marina-bay-view",
                                      "title": "marina-bay View",
                                      "alt": "Scenic view at marina-bay",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "marina-bay-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at marina-bay",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'half-moon-bay',
        name: 'Half Moon Bay',
        region: 'Peninsula',
        coordinates: { lat: 37.5028, lng: -122.4819 },
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
        nearby: ['palo-alto-lake'],
        hazards: ["ocean swell","harbor traffic"],
        lensHints: {"beautyScore":4,"funScore":4,"riskScore":3},
        imagery: {
                  "beauty": [
                            {
                                      "id": "half-moon-bay-view",
                                      "title": "half-moon-bay View",
                                      "alt": "Scenic view at half-moon-bay",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "half-moon-bay-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at half-moon-bay",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    
    // San Francisco Spots
    {
        id: 'crissy-field',
        name: 'Crissy Field',
        region: 'San Francisco',
        coordinates: { lat: 37.8036, lng: -122.4639 },
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
        nearby: ['ocean-beach', 'treasure-island'],
        hazards: ["strong currents","ship traffic","cold water"],
        lensHints: {"beautyScore":5,"funScore":5,"riskScore":5},
        imagery: {
                  "beauty": [
                            {
                                      "id": "crissy-field-view",
                                      "title": "crissy-field View",
                                      "alt": "Scenic view at crissy-field",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "crissy-field-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at crissy-field",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "crissy-field-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at crissy-field",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    {
        id: 'ocean-beach',
        name: 'Ocean Beach',
        region: 'San Francisco',
        coordinates: { lat: 37.7594, lng: -122.5108 },
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
        nearby: ['crissy-field', 'third-avenue'],
        hazards: ["ocean waves","rip currents","cold water"],
        lensHints: {"beautyScore":4,"funScore":3,"riskScore":5},
        imagery: {
                  "beauty": [
                            {
                                      "id": "ocean-beach-view",
                                      "title": "ocean-beach View",
                                      "alt": "Scenic view at ocean-beach",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "ocean-beach-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at ocean-beach",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "ocean-beach-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at ocean-beach",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    {
        id: 'third-avenue',
        name: 'Third Avenue',
        region: 'Peninsula',
        coordinates: { lat: 37.7119, lng: -122.3925 },
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
        nearby: ['ocean-beach'],
        hazards: ["low-tide mud"],
        lensHints: {"beautyScore":3,"funScore":3,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "third-avenue-view",
                                      "title": "third-avenue View",
                                      "alt": "Scenic view at third-avenue",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "third-avenue-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at third-avenue",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    
    // Santa Cruz Area
    {
        id: 'waddell-creek',
        name: 'Waddell Creek',
        region: 'Santa Cruz',
        coordinates: { lat: 37.0956, lng: -122.2775 },
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
        nearby: [],
        hazards: ["ocean waves","rocks","strong wind"],
        lensHints: {"beautyScore":4,"funScore":4,"riskScore":5},
        imagery: {
                  "beauty": [
                            {
                                      "id": "waddell-creek-view",
                                      "title": "waddell-creek View",
                                      "alt": "Scenic view at waddell-creek",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "waddell-creek-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at waddell-creek",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": [
                            {
                                      "id": "waddell-creek-hazard",
                                      "title": "Safety Alert",
                                      "alt": "Safety considerations at waddell-creek",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "hazard"
                                      ]
                            }
                  ]
        }
    },
    
    // Mountain Lakes
    {
        id: 'lake-tahoe',
        name: 'Lake Tahoe',
        region: 'Sierra Nevada',
        coordinates: { lat: 39.0968, lng: -120.0324 },
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
        nearby: ['donner-lake'],
        hazards: ["cold water","altitude"],
        lensHints: {"beautyScore":5,"funScore":4,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "lake-tahoe-view",
                                      "title": "lake-tahoe View",
                                      "alt": "Scenic view at lake-tahoe",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "lake-tahoe-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at lake-tahoe",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    },
    {
        id: 'donner-lake',
        name: 'Donner Lake',
        region: 'Sierra Nevada',
        coordinates: { lat: 39.3289, lng: -120.2706 },
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
        nearby: ['lake-tahoe'],
        hazards: ["cold water","weather changes"],
        lensHints: {"beautyScore":4,"funScore":3,"riskScore":2},
        imagery: {
                  "beauty": [
                            {
                                      "id": "donner-lake-view",
                                      "title": "donner-lake View",
                                      "alt": "Scenic view at donner-lake",
                                      "credit": "placeholder",
                                      "kind": "gradient",
                                      "tags": [
                                                "scenic"
                                      ]
                            }
                  ],
                  "fun": [
                            {
                                      "id": "donner-lake-action",
                                      "title": "Wing Session",
                                      "alt": "Wing foiling action at donner-lake",
                                      "credit": "placeholder",
                                      "kind": "svg",
                                      "tags": [
                                                "action"
                                      ]
                            }
                  ],
                  "risk": []
        }
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = spotsData;
}