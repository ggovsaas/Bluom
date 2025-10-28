import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
  });

  const steps = [
    {
      title: 'Welcome to AiFit!',
      subtitle: 'Your personal AI-powered fitness companion',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepText}>
            Let's get to know you better so we can create a personalized fitness plan just for you.
          </Text>
        </View>
      ),
    },
    {
      title: 'What\'s your name?',
      subtitle: 'We\'d love to know what to call you',
      content: (
        <View style={styles.stepContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            autoFocus
          />
        </View>
      ),
    },
    {
      title: 'Tell us about yourself',
      subtitle: 'Help us understand your current situation',
      content: (
        <View style={styles.stepContent}>
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={profile.age}
            onChangeText={(text) => setProfile({ ...profile, age: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={profile.weight}
            onChangeText={(text) => setProfile({ ...profile, weight: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            value={profile.height}
            onChangeText={(text) => setProfile({ ...profile, height: text })}
            keyboardType="numeric"
          />
        </View>
      ),
    },
    {
      title: 'What\'s your goal?',
      subtitle: 'Choose your primary fitness objective',
      content: (
        <View style={styles.stepContent}>
          {['Weight Loss', 'Muscle Gain', 'Maintenance', 'General Fitness'].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                styles.optionButton,
                profile.goal === goal && styles.optionButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, goal })}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.goal === goal && styles.optionTextSelected,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      title: 'How active are you?',
      subtitle: 'This helps us calculate your calorie needs',
      content: (
        <View style={styles.stepContent}>
          {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.optionButton,
                profile.activityLevel === level && styles.optionButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, activityLevel: level })}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.activityLevel === level && styles.optionTextSelected,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return profile.name.trim().length > 0;
      case 2:
        return profile.age && profile.weight && profile.height;
      case 3:
        return profile.goal.length > 0;
      case 4:
        return profile.activityLevel.length > 0;
      default:
        return false;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentStep + 1) / steps.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {steps.length}
          </Text>
        </View>

        {/* Step Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
          {steps[currentStep].content}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  progressContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 40,
  },
  stepContent: {
    width: '100%',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  optionButton: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  optionButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#64748b',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
