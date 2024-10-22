import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, DollarSign, Star, ChevronRight } from 'lucide-react';

const TurfCard = ({ turf }) => {
  const {
    id,
    name,
    location,
    images,
    price,
    rating,
    capacity,
    amenities
  } = turf;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Price tag */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
          <div className="flex items-center gap-1">
            <DollarSign size={14} className="text-blue-600" />
            <span className="font-semibold text-gray-900">{price}/hr</span>
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="font-semibold text-gray-900">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={16} />
            <span className="text-sm">{capacity} players</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <Link
            to={`/turf/${id}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300"
          >
            View Details
            <ChevronRight size={16} />
          </Link>
          <Link
            to={`/booking/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;