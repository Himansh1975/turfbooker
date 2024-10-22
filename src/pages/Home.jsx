import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TurfCard from '../components/TurfCard';
import mockTurfs from '../utils/mockDatabase';
import {
  Search,
  Calendar,
  MapPin,
  Star,
  ArrowRight,
  ChevronDown,
  Trophy,
  Shield
} from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredTurfs = mockTurfs.slice(0, 3); // Get the first 3 turfs from the mock database

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Team Captain',
      comment: 'TurfBooker transformed how we organize our weekly matches. The booking process is seamless!',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5
    },
    {
      name: 'Jane Smith',
      role: 'Sports Club Owner',
      comment: 'Great platform for managing bookings. The interface is intuitive and user-friendly.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4
    },
    {
      name: 'Mike Johnson',
      role: 'Regular Player',
      comment: 'Excellent service and top-notch turfs. The variety of options is impressive.',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How do I book a turf?',
      answer: 'Simply browse our available turfs, select your preferred date and time, and complete the booking process online. We\'ll send you an instant confirmation.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 24 hours before your scheduled time for a full refund. Cancellations within 24 hours may be subject to a fee.'
    },
    {
      question: 'Are there any additional fees?',
      answer: 'All fees are included in the displayed price. There are no hidden charges. You\'ll see the final price before confirming your booking.'
    },
    {
      question: 'What if it rains?',
      answer: 'Many of our turfs have covered areas or alternative arrangements. Check the specific turf details for more information about weather policies.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative bg-blue-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Find Your Perfect Turf
            </h1>
            <p className="text-xl md:text-2xl mb-12 animate-fade-in-up animation-delay-200 opacity-90">
              Book premium sports facilities in your area instantly
            </p>

            {/* Search Box */}
            <div className="bg-white rounded-lg p-2 md:p-3 shadow-lg animate-fade-in-up animation-delay-400">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-md p-3">
                  <MapPin className="text-blue-600" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-md p-3">
                  <Calendar className="text-blue-600" size={20} />
                  <input
                    type="text"
                    placeholder="Select date"
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                  />
                </div>
                <Link
                  to="/turfs"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                >
                  Search Turfs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            Why Choose TurfBooker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: 'Easy to Find',
                description: 'Browse and compare turfs with detailed information and real photos.'
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: 'Premium Quality',
                description: 'Book your preferred slot instantly with secure online payment.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Quality Assured',
                description: 'All turfs are verified and maintained to high standards.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:shadow-xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Turfs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Featured Turfs
            </h2>
            <Link
              to="/turfs"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              View all
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTurfs.map((turf) => (
              <TurfCard key={turf.id} turf={turf} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            What Our Users Say
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${activeTestimonial === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                >
                  <div className="text-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-6"
                    />
                    <p className="text-xl md:text-2xl text-gray-600 mb-6 italic">
                      {`"${testimonial.comment}"`}
                    </p>
                    <div className="flex justify-center items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === index ? 'py-4' : 'max-h-0'
                    }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of happy players and book your perfect turf today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/turfs"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300"
            >
              Browse Turfs
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <ChevronDown className="w-6 h-6 transform rotate-180" />
      </button>
    </div>
  );
};

export default Home;
