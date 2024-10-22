import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mockTurfs from '../utils/mockDatabase';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Star,
  ChevronUp,
  Calendar,
  Users,
  Shield
} from 'lucide-react';

const TurfDetail = () => {
  const [turf, setTurf] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedTurf = mockTurfs.find(t => t.id === parseInt(id));
    setTurf(selectedTurf);

    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!turf) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-200" />
          <div className="text-gray-500">Loading turf details...</div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % turf.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + turf.images.length) % turf.images.length);
  };

  const ImageNavButton = ({ onClick, children, className }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 backdrop-blur-sm rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100">
      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="ml-1 font-medium">Back to Turfs</span>
        </button>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="relative h-[28rem]">
            <img
              src={turf.images[activeImage]}
              alt={turf.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            <ImageNavButton onClick={prevImage} className="left-4">
              <ChevronLeft size={24} />
            </ImageNavButton>
            <ImageNavButton onClick={nextImage} className="right-4">
              <ChevronRight size={24} />
            </ImageNavButton>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {turf.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeImage 
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{turf.name}</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    <p>{turf.location}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(turf.rating) ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">{turf.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" />
                  <p>Available 24/7</p>
                </div>
                <div className="flex items-center">
                  <DollarSign size={24} className="text-green-600" />
                  <p className="text-3xl font-bold text-green-600">{turf.price}</p>
                  <span className="text-gray-500 ml-1">/hour</span>
                </div>
                <Link
                  to={`/booking/${turf.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar size={20} />
                  <span className="font-medium">Book Now</span>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <FeatureCard
                icon={Users}
                title="Capacity"
                description={`Up to ${turf.capacity} players`}
              />
              <FeatureCard
                icon={Shield}
                title="Safety"
                description="Professional maintenance"
              />
              <FeatureCard
                icon={Clock}
                title="Duration"
                description="Minimum 1 hour booking"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">About this turf</h2>
              <p className="text-gray-600 leading-relaxed">{turf.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {turf.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium transition-colors duration-300 hover:bg-blue-100"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reviews</h2>
              <div className="space-y-4">
                {turf.reviews.map((review, index) => (
                  <div 
                    key={index} 
                    className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {review.user.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{review.user}</p>
                          <p className="text-sm text-gray-500">Verified booking</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            } fill-current`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating buttons */}
      <div className={`fixed bottom-8 right-8 flex flex-col gap-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <Link
          to={`/booking/${turf.id}`}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <Calendar size={20} />
          <span className="font-medium">Book Now</span>
        </Link>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mx-auto p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          <ChevronUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default TurfDetail;