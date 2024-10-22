const mockTurfs = [
  { 
    id: 1, 
    name: 'Green Field Arena', 
    location: 'Downtown', 
    images: [
      'https://images.unsplash.com/photo-1631194758628-71ec7c35137e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1624880357913-a8539238245b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80'
    ],
    price: 50, 
    rating: 4.5,
    description: 'A beautiful turf located in the heart of the city. Perfect for soccer, cricket, and other sports.', 
    amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Refreshments'],
    reviews: [
      { user: 'John D.', comment: 'Great turf! Well maintained and excellent facilities.', rating: 5 },
      { user: 'Sarah M.', comment: 'Good location, but could use better parking.', rating: 4 }
    ]
  },
  { 
    id: 2, 
    name: 'Sunset Soccer Field', 
    location: 'Westside', 
    images: [
      'https://images.unsplash.com/photo-1536122985607-4fe00b283652?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1493&q=80',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 60, 
    rating: 4.8,
    description: 'Experience the thrill of playing as the sun sets. This turf offers a unique ambiance for evening games.', 
    amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Spectator Seating', 'Cafe'],
    reviews: [
      { user: 'Mike R.', comment: 'Amazing evening atmosphere. The lights are perfect for night games.', rating: 5 },
      { user: 'Emily L.', comment: 'Great facilities and friendly staff. Highly recommend!', rating: 5 }
    ]
  },
  { 
    id: 3, 
    name: 'Central Park Pitch', 
    location: 'Midtown', 
    images: [
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 45, 
    rating: 4.2,
    description: 'A conveniently located turf in the heart of the city. Ideal for quick games during lunch breaks or after work.', 
    amenities: ['Changing Rooms', 'Water Fountains', 'First Aid Kit'],
    reviews: [
      { user: 'Alex K.', comment: 'Convenient location, but can get crowded during peak hours.', rating: 4 },
      { user: 'Sophia W.', comment: 'Good for casual games. Wish they had better equipment rental options.', rating: 3 }
    ]
  },
  {
    id: 4,
    name: 'Riverside Turf',
    location: 'Eastside',
    images: [
      'https://images.unsplash.com/photo-1524015368236-bbf6f72545b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      'https://images.unsplash.com/photo-1518604666860-9ed391f76460?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 55,
    rating: 4.6,
    description: 'Enjoy a game with a scenic view of the river. This turf offers a refreshing environment for sports enthusiasts.',
    amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'River View', 'Equipment Rental'],
    reviews: [
      { user: 'Tom H.', comment: 'Beautiful location and well-maintained turf. Love playing here!', rating: 5 },
      { user: 'Lisa F.', comment: 'Great amenities and the view is unbeatable. Slightly pricey though.', rating: 4 }
    ]
  },
  {
    id: 5,
    name: 'Mountain View Fields',
    location: 'Northside',
    images: [
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 65,
    rating: 4.9,
    description: 'Play surrounded by breathtaking mountain views. Perfect for those who enjoy sports in a serene natural setting.',
    amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'Picnic Area', 'Hiking Trails Nearby'],
    reviews: [
      { user: 'Chris M.', comment: 'Absolutely stunning location. The turf is top-notch too!', rating: 5 },
      { user: 'Anna P.', comment: 'A bit far from the city, but totally worth the drive. Fantastic facilities.', rating: 5 }
    ]
  },
  {
    id: 6,
    name: 'Urban Kicks Arena',
    location: 'City Center',
    images: [
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1524862655266-89c67a10c4b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 70,
    rating: 4.7,
    description: 'A state-of-the-art indoor facility in the heart of the city. Perfect for year-round play regardless of weather.',
    amenities: ['Air Conditioning', 'Pro Shop', 'Locker Rooms', 'Fitness Center', 'Cafe'],
    reviews: [
      { user: 'David L.', comment: 'Top-notch facilities. Love that I can play rain or shine!', rating: 5 },
      { user: 'Emma S.', comment: 'Bit expensive, but the amenities make it worth it. Always clean and well-maintained.', rating: 4 }
    ]
  },
  {
    id: 7,
    name: 'Seaside Sportsground',
    location: 'Coastal Area',
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      'https://images.unsplash.com/photo-1520452112805-c6692c840af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 55,
    rating: 4.4,
    description: 'Enjoy sports with a sea breeze. This coastal turf offers a unique playing experience with ocean views.',
    amenities: ['Beach Access', 'Showers', 'Sunbeds', 'Volleyball Court', 'Snack Bar'],
    reviews: [
      { user: 'Mark B.', comment: 'Great location! Playing here feels like a mini-vacation.', rating: 5 },
      { user: 'Rachel K.', comment: 'Beautiful views, but the sea wind can be challenging for some sports.', rating: 4 }
    ]
  },
  {
    id: 8,
    name: 'Suburban Sports Complex',
    location: 'Outskirts',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 40,
    rating: 4.3,
    description: 'A spacious sports complex in the suburbs. Ideal for tournaments and large group events.',
    amenities: ['Multiple Fields', 'Parking', 'Changing Rooms', 'Spectator Stands', 'Vending Machines'],
    reviews: [
      { user: 'Paul G.', comment: 'Great for our company sports day. Plenty of space and good facilities.', rating: 4 },
      { user: 'Nina H.', comment: 'Well-maintained fields, but could use more shade for spectators.', rating: 4 }
    ]
  },
  {
    id: 9,
    name: 'Eco Turf',
    location: 'Green Belt',
    images: [
      'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80',
      'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 50,
    rating: 4.6,
    description: 'An environmentally friendly turf using sustainable materials and practices. Play your part in protecting the planet.',
    amenities: ['Solar-powered Lights', 'Rainwater Harvesting', 'Organic Snack Bar', 'Bike Parking', 'Electric Car Charging'],
    reviews: [
      { user: 'Olivia T.', comment: 'Love the eco-friendly concept! The turf quality is excellent too.', rating: 5 },
      { user: 'Sam R.', comment: 'Great initiative. Hoping they add more eco-friendly features in the future.', rating: 4 }
    ]
  },
  {
    id: 10,
    name: 'Historic Stadium Turf',
    location: 'Old Town',
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1470089771653-6eeb67b0fd62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    price: 75,
    rating: 4.8,
    description: 'Play on the same turf where sports legends once competed. This historic stadium offers a unique blend of nostalgia and modern amenities.',
    amenities: ['Museum', 'Guided Tours', 'VIP Boxes', 'Historic Memorabilia', 'Retro Snack Stand'],
    reviews: [
      { user: 'George W.', comment: 'A must-visit for any sports fan. The history here is palpable!', rating: 5 },
      { user: 'Linda C.', comment: 'Bit pricey, but the experience is one-of-a-kind. Well-preserved facility.', rating: 4 }
    ]
  }
];

export default mockTurfs;
