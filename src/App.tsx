import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Fuel from './pages/Fuel';
import Move from './pages/Move';
import Wellness from './pages/Wellness';
import Progress from './pages/Progress';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import Workouts from './pages/Workouts';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Privacy from './pages/Privacy';
import Help from './pages/Help';
import Admin from './pages/Admin';
import CreateRecipe from './pages/CreateRecipe';
import MyRecipes from './pages/MyRecipes';
import { UserProvider } from './context/UserContext';
import './App.css';

// Navigation component that only shows on app pages
function AppNavigation() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  if (isLandingPage) {
    return null;
  }
  
  return <Navigation />;
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('aifit_onboarding_completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('aifit_onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <UserProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Onboarding onComplete={handleOnboardingComplete} />
        </div>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <AnimatePresence mode="wait">
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pb-20"
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<Home />} />
                <Route path="/fuel" element={<Fuel />} />
                <Route path="/move" element={<Move />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/help" element={<Help />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/my-recipes" element={<MyRecipes />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
          <AppNavigation />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;