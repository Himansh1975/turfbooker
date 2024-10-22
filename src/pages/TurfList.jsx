import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import TurfCard from '../components/TurfCard';
import mockTurfs from '../utils/mockDatabase';

const TurfList = () => {
  const [turfs, setTurfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const allAmenities = Array.from(new Set(mockTurfs.flatMap(turf => turf.amenities)));

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTurfs(mockTurfs);
      setFilteredTurfs(mockTurfs);
    } catch {
      setError('Failed to fetch turfs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = turfs.filter(turf => {
      const matchesSearch =
        turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        turf.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every(amenity => turf.amenities.includes(amenity));

      const matchesPrice =
        turf.price >= priceRange[0] && turf.price <= priceRange[1];

      return matchesSearch && matchesAmenities && matchesPrice;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredTurfs(sorted);
  }, [searchTerm, sortBy, selectedAmenities, priceRange, turfs]);

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-red-600">
        <span className="text-lg font-medium">{error}</span>
        <button
          onClick={fetchTurfs}
          className="mt-4 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Available Turfs
        </h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300"
        >
          {isFilterOpen ? <X size={20} /> : <SlidersHorizontal size={20} />}
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className={`lg:w-64 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search turfs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price: Low to High</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              className="w-full"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="space-y-2">
              {allAmenities.map(amenity => (
                <button
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-colors duration-300 ${selectedAmenities.includes(amenity)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Turfs Grid */}
        <div className="flex-1">
          {filteredTurfs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No turfs found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAmenities([]);
                  setPriceRange([0, 100]);
                  setSortBy('name');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTurfs.map((turf) => (
                <TurfCard key={turf.id} turf={turf} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurfList;
