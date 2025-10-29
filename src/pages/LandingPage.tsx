import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✨</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            AiFit
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Your AI-Powered Fitness Journey
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Track nutrition with AI food recognition, log workouts, and achieve your fitness goals
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/app/aifit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              📱 Download for iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.aifit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              📱 Download for Android
            </a>
            <Link
              to="/onboarding"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              🌐 Try Web Version →
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Food Recognition</h3>
            <p className="text-gray-300">Take a photo of your food and get instant nutrition analysis</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Tracking</h3>
            <p className="text-gray-300">Track calories, macros, and progress with intelligent insights</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Wellness Focus</h3>
            <p className="text-gray-300">Monitor sleep, mood, and overall health for complete wellness</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-400">
          <p>&copy; 2024 AiFit. Your AI-powered fitness companion</p>
        </div>
      </div>
    </div>
  );
}