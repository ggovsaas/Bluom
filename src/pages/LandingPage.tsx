import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  CameraIcon, 
  ChartBarIcon, 
  HeartIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AiFit</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>
          <Link 
            to="/app" 
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Try Web App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track nutrition with AI food recognition, log workouts, and achieve your fitness goals with personalized insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://apps.apple.com/app/aifit" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <DevicePhoneMobileIcon className="w-6 h-6" />
              <span>Download for iOS</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.aifit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <DevicePhoneMobileIcon className="w-6 h-6" />
              <span>Download for Android</span>
            </a>
            <Link
              to="/app"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Try Web Version</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          {/* App Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/10">
                  <CameraIcon className="w-12 h-12 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">AI Food Recognition</h3>
                  <p className="text-gray-300">Take a photo of your food and get instant nutrition analysis</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-2xl p-6 border border-white/10">
                  <ChartBarIcon className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Tracking</h3>
                  <p className="text-gray-300">Track calories, macros, and progress with intelligent insights</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl p-6 border border-white/10">
                  <HeartIcon className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Wellness Focus</h3>
                  <p className="text-gray-300">Monitor sleep, mood, and overall health for complete wellness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Fitness Success
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with proven fitness science to help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CameraIcon,
                title: "AI Food Recognition",
                description: "Simply take a photo of your meal and our AI will instantly identify the food and calculate nutrition facts.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: ChartBarIcon,
                title: "Smart Analytics",
                description: "Get personalized insights and recommendations based on your eating patterns and fitness goals.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: HeartIcon,
                title: "Wellness Tracking",
                description: "Monitor sleep quality, mood, water intake, and other wellness metrics for complete health picture.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: SparklesIcon,
                title: "Personalized Plans",
                description: "Receive customized meal plans and workout routines tailored to your specific goals and preferences.",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: DevicePhoneMobileIcon,
                title: "Cross-Platform Sync",
                description: "Access your data seamlessly across web and mobile apps with real-time synchronization.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: StarIcon,
                title: "Progress Tracking",
                description: "Visualize your journey with beautiful charts and celebrate milestones along the way.",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Download & Setup",
                description: "Download the app from App Store or Google Play, or try our web version. Complete your profile in under 2 minutes.",
                action: "Download Now"
              },
              {
                step: "02", 
                title: "Start Tracking",
                description: "Take photos of your meals, log workouts, and track your wellness metrics. Our AI does the heavy lifting.",
                action: "Try Web App"
              },
              {
                step: "03",
                title: "Achieve Goals",
                description: "Get personalized insights, recommendations, and watch your progress as you reach your fitness goals.",
                action: "View Features"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{step.description}</p>
                <a
                  href={index === 0 ? "https://apps.apple.com/app/aifit" : index === 1 ? "/app" : "#features"}
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  {step.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Trusted by Fitness Enthusiasts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Sarah Johnson",
                role: "Fitness Coach",
                content: "AiFit has revolutionized how I track my nutrition. The AI food recognition is incredibly accurate and saves me so much time.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Marathon Runner", 
                content: "The cross-platform sync is amazing. I can log meals on my phone and review my progress on the web app seamlessly.",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "Yoga Instructor",
                content: "The wellness tracking features help me maintain balance in my life. The mood and sleep tracking are game-changers.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Fitness Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of users who are already achieving their fitness goals with AiFit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="https://apps.apple.com/app/aifit"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <DevicePhoneMobileIcon className="w-6 h-6" />
              <span>Download for iOS</span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.aifit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <DevicePhoneMobileIcon className="w-6 h-6" />
              <span>Download for Android</span>
            </a>
            <Link
              to="/app"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Try Web Version</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckIcon className="w-5 h-5 text-green-400" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon className="w-5 h-5 text-green-400" />
              <span>Available on all platforms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AiFit</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 AiFit. All rights reserved.</p>
              <p className="mt-2">Your AI-powered fitness companion</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
