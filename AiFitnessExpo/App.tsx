import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import OnboardingScreen from './src/pages/Onboarding';
import HomeScreen from './src/pages/Home';
import FuelScreen from './src/pages/Fuel';
import MoveScreen from './src/pages/Move';
import WellnessScreen from './src/pages/Wellness';
import ProgressScreen from './src/pages/Progress';

// Import context
import { UserProvider } from './src/context/UserContext';

// Navigation types
type RootStackParamList = {
  MainTabs: undefined;
  Onboarding: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Fuel: undefined;
  Move: undefined;
  Wellness: undefined;
  Progress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>
        }}
      />
      <Tab.Screen 
        name="Fuel" 
        component={FuelScreen}
        options={{
          tabBarLabel: 'Fuel',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🍎</Text>
        }}
      />
      <Tab.Screen 
        name="Move" 
        component={MoveScreen}
        options={{
          tabBarLabel: 'Move',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏋️</Text>
        }}
      />
      <Tab.Screen 
        name="Wellness" 
        component={WellnessScreen}
        options={{
          tabBarLabel: 'Wellness',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🧘</Text>
        }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📊</Text>
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem('aifit_onboarding_completed');
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('aifit_onboarding_completed', 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading AiFit...</Text>
      </View>
    );
  }

  if (showOnboarding) {
    return (
      <UserProvider>
        <View style={styles.container}>
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        </View>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <View style={styles.container}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          </Stack.Navigator>
    </View>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
  },
  loadingText: {
    fontSize: 18,
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default App;