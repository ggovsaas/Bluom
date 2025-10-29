import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Dumbbell, 
  Barcode, 
  Clipboard, 
  ChefHat, 
  Calculator,
  Star,
  Play,
  Check,
  ArrowRight,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Heart
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">✨</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">AiFit</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <div className="flex items-center space-x-2">
                <a
                  href="#"
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8" />
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" className="h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Phone Mockups */}
            <div className="relative">
              <div className="relative z-10">
                <div className="flex space-x-4">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-2xl p-4">
                        <div className="space-y-3">
                          <div className="h-4 bg-blue-500 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative -mt-8"
                  >
                    <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                      <div className="w-full h-full bg-white rounded-2xl p-4">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">75%</span>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Protein</div>
                            <div className="text-xs text-gray-500">45g / 60g</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                AI Fitness. Simplified.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Reach your goals with the #1 AI-powered fitness and nutrition tracker. AiFit is the only app you'll ever need.
              </p>
              <Link
                to="/onboarding"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start today for free!
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Powerful Daily Tracking",
                description: "Track your nutrition and workouts with intelligent insights"
              },
              {
                icon: Dumbbell,
                title: "Smart Workout Plans",
                description: "Get personalized workout recommendations based on your goals"
              },
              {
                icon: Barcode,
                title: "AI Food Recognition",
                description: "Scan food with your camera for instant nutrition analysis"
              },
              {
                icon: Clipboard,
                title: "Comprehensive Database",
                description: "Access thousands of foods and exercises in our database"
              },
              {
                icon: ChefHat,
                title: "Custom Recipes & Meals",
                description: "Create and save your own recipes and meal plans"
              },
              {
                icon: Calculator,
                title: "Smart Macro Calculator",
                description: "Calculate your perfect macro targets automatically"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            What Our Community Is Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "Just Amazing! This app changed my life completely.",
                rating: 5,
                author: "Sarah M."
              },
              {
                text: "So Helpful! The AI food recognition is incredible.",
                rating: 5,
                author: "Mike R."
              },
              {
                text: "Best fitness tracker I've ever used!",
                rating: 5,
                author: "Emma L."
              },
              {
                text: "The macro tracking is so accurate and easy to use.",
                rating: 5,
                author: "David K."
              },
              {
                text: "Love the workout recommendations!",
                rating: 5,
                author: "Lisa T."
              },
              {
                text: "Perfect for my fitness journey!",
                rating: 5,
                author: "John S."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="text-sm text-gray-500 font-semibold">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Fitness tracking made simple (for all)
              </h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <p>Customize your daily macro goals and track your progress with ease.</p>
                <p>Get personalized recommendations for those new to fitness tracking.</p>
                <p>Seamless integrations with your favorite health and fitness platforms.</p>
              </div>
              <Link
                to="/onboarding"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start today for free!
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="flex space-x-4">
                <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl p-4">
                    <div className="space-y-3">
                      <div className="h-4 bg-green-500 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl -mt-8">
                  <div className="w-full h-full bg-white rounded-2xl p-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Unlock Power Of AiFit
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">$0 <span className="text-lg text-gray-500">/ mo</span></div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  <span>Custom daily macro goals</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  <span>Unlimited custom foods & recipes</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  <span>Offline access</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  <span>Massive food database</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-green-500 mr-3" size={20} />
                  <span>Basic AI coach</span>
                </li>
              </ul>
              <Link
                to="/onboarding"
                className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-900 font-semibold rounded-full hover:border-gray-400 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-center text-white relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-6">$9.99 <span className="text-lg opacity-80">/ mo</span></div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>Everything in Free plus...</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>AI food recognition</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>Advanced AI coach</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>Barcode scanner</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>Export data reports</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-white mr-3" size={20} />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                to="/onboarding"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Start Premium
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stay up to date on new features, fitness tips, and discounts
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              SIGN UP
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✨</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">AiFit</span>
              </div>
              <p className="text-gray-600 mb-4">
                Your AI-powered fitness companion. Track nutrition, log workouts, and achieve your goals with intelligent insights.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* App Store Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Download</h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="block"
                >
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12" />
                </a>
                <a
                  href="#"
                  className="block"
                >
                  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2024 AiFit. Your AI-powered fitness companion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}