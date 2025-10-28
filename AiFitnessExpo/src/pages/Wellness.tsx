import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

interface Habit {
  id: string;
  name: string;
  icon: string;
  category: string;
  streak: number;
  completedToday: boolean;
  completedDates: string[];
  target?: number;
  unit?: string;
  isCustom: boolean;
}

export default function WellnessScreen() {
  const { profile, dailyData, updateDailyData, getCurrentDate } = useUser();
  
  // State management
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [sleepInput, setSleepInput] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState({
    name: '',
    icon: 'Target',
    category: 'Health'
  });

  const currentDate = getCurrentDate();

  const moods = [
    { emoji: '😄', label: 'Excellent', value: 'excellent', color: '#16a34a' },
    { emoji: '😊', label: 'Good', value: 'good', color: '#3b82f6' },
    { emoji: '😐', label: 'Okay', value: 'okay', color: '#eab308' },
    { emoji: '😔', label: 'Low', value: 'low', color: '#f97316' },
    { emoji: '😢', label: 'Poor', value: 'poor', color: '#dc2626' },
  ];

  const habitCategories = ['Health', 'Fitness', 'Mindfulness', 'Productivity', 'Social', 'Learning'];

  const iconOptions = [
    { name: 'Target', emoji: '🎯' },
    { name: 'Droplets', emoji: '💧' },
    { name: 'Pill', emoji: '💊' },
    { name: 'Book', emoji: '📚' },
    { name: 'Leaf', emoji: '🍃' },
    { name: 'Zap', emoji: '⚡' },
    { name: 'Coffee', emoji: '☕' },
    { name: 'Apple', emoji: '🍎' },
    { name: 'Dumbbell', emoji: '🏋️' },
    { name: 'Phone', emoji: '📱' },
    { name: 'Users', emoji: '👥' },
    { name: 'Music', emoji: '🎵' },
    { name: 'Camera', emoji: '📷' },
    { name: 'Heart', emoji: '❤️' },
    { name: 'Brain', emoji: '🧠' },
    { name: 'Sun', emoji: '☀️' },
    { name: 'Moon', emoji: '🌙' }
  ];

  const defaultHabits: Habit[] = [
    {
      id: 'water',
      name: 'Drink 8 glasses of water',
      icon: 'Droplets',
      category: 'Health',
      streak: 7,
      completedToday: dailyData.water >= 8,
      completedDates: [],
      target: 8,
      unit: 'glasses',
      isCustom: false
    },
    {
      id: 'exercise',
      name: 'Exercise for 30 minutes',
      icon: 'Dumbbell',
      category: 'Fitness',
      streak: 5,
      completedToday: dailyData.exerciseMinutes >= 30,
      completedDates: [],
      target: 30,
      unit: 'minutes',
      isCustom: false
    },
    {
      id: 'sleep',
      name: 'Get 8 hours of sleep',
      icon: 'Moon',
      category: 'Health',
      streak: 3,
      completedToday: dailyData.sleepHours >= 8,
      completedDates: [],
      target: 8,
      unit: 'hours',
      isCustom: false
    },
    {
      id: 'meditation',
      name: 'Meditate for 10 minutes',
      icon: 'Brain',
      category: 'Mindfulness',
      streak: 12,
      completedToday: false,
      completedDates: [],
      target: 10,
      unit: 'minutes',
      isCustom: false
    }
  ];

  useEffect(() => {
    setHabits(defaultHabits);
  }, [dailyData]);

  const logSleep = async () => {
    const hours = parseFloat(sleepInput);
    if (isNaN(hours) || hours < 0 || hours > 24) {
      Alert.alert('Error', 'Please enter a valid number of hours (0-24)');
      return;
    }

    await updateDailyData({ sleepHours: hours });
    setSleepInput('');
    setShowSleepModal(false);
    Alert.alert('Success', `${hours} hours of sleep logged!`);
  };

  const logMood = async () => {
    if (!selectedMood) {
      Alert.alert('Error', 'Please select a mood');
      return;
    }

    await updateDailyData({ mood: selectedMood });
    setSelectedMood('');
    setShowMoodModal(false);
    Alert.alert('Success', 'Mood logged successfully!');
  };

  const logWeight = async () => {
    const weight = parseFloat(weightInput);
    if (isNaN(weight) || weight < 0) {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }

    await updateDailyData({ weight: weight });
    setWeightInput('');
    setShowWeightModal(false);
    Alert.alert('Success', `Weight logged: ${weight} lbs`);
  };

  const toggleHabit = async (habitId: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletedToday = !habit.completedToday;
        const newStreak = newCompletedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        
        return {
          ...habit,
          completedToday: newCompletedToday,
          streak: newStreak,
          completedDates: newCompletedToday 
            ? [...habit.completedDates, currentDate]
            : habit.completedDates.filter(date => date !== currentDate)
        };
      }
      return habit;
    });
    
    setHabits(updatedHabits);
  };

  const addCustomHabit = () => {
    if (!newHabit.name.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      icon: newHabit.icon,
      category: newHabit.category,
      streak: 0,
      completedToday: false,
      completedDates: [],
      isCustom: true
    };

    setHabits([...habits, habit]);
    setNewHabit({ name: '', icon: 'Target', category: 'Health' });
    setShowHabitModal(false);
    Alert.alert('Success', 'Custom habit added!');
  };

  const deleteHabit = (habitId: string) => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setHabits(habits.filter(habit => habit.id !== habitId));
          }
        }
      ]
    );
  };

  const getMoodEmoji = (mood: string) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData ? moodData.emoji : '😐';
  };

  const getMoodColor = (mood: string) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData ? moodData.color : '#eab308';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wellness</Text>
        <Text style={styles.subtitle}>Track your health and wellness</Text>
      </View>

      {/* Health Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.sectionTitle}>Today's Health Metrics</Text>
        <View style={styles.metricsGrid}>
          <TouchableOpacity 
            style={styles.metricCard}
            onPress={() => setShowSleepModal(true)}
          >
            <Text style={styles.metricIcon}>😴</Text>
            <Text style={styles.metricValue}>{dailyData.sleepHours}h</Text>
            <Text style={styles.metricLabel}>Sleep</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.metricCard}
            onPress={() => setShowMoodModal(true)}
          >
            <Text style={styles.metricIcon}>{getMoodEmoji(dailyData.mood)}</Text>
            <Text style={styles.metricValue}>
              {dailyData.mood ? dailyData.mood.charAt(0).toUpperCase() + dailyData.mood.slice(1) : 'Not set'}
            </Text>
            <Text style={styles.metricLabel}>Mood</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.metricCard}
            onPress={() => setShowWeightModal(true)}
          >
            <Text style={styles.metricIcon}>⚖️</Text>
            <Text style={styles.metricValue}>
              {dailyData.weight ? `${dailyData.weight}lbs` : 'Not set'}
            </Text>
            <Text style={styles.metricLabel}>Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.metricCard}
            onPress={() => updateDailyData({ water: dailyData.water + 1 })}
          >
            <Text style={styles.metricIcon}>💧</Text>
            <Text style={styles.metricValue}>{dailyData.water}</Text>
            <Text style={styles.metricLabel}>Water</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Habits */}
      <View style={styles.habitsContainer}>
        <View style={styles.habitsHeader}>
          <Text style={styles.sectionTitle}>Daily Habits</Text>
          <TouchableOpacity 
            style={styles.addHabitButton}
            onPress={() => setShowHabitModal(true)}
          >
            <Text style={styles.addHabitButtonText}>+ Add Habit</Text>
          </TouchableOpacity>
        </View>

        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitCard}>
            <TouchableOpacity
              style={styles.habitContent}
              onPress={() => toggleHabit(habit.id)}
            >
              <View style={styles.habitLeft}>
                <Text style={styles.habitIcon}>
                  {iconOptions.find(icon => icon.name === habit.icon)?.emoji || '🎯'}
                </Text>
                <View style={styles.habitInfo}>
                  <Text style={styles.habitName}>{habit.name}</Text>
                  <Text style={styles.habitCategory}>{habit.category}</Text>
                  <Text style={styles.habitStreak}>
                    🔥 {habit.streak} day streak
                  </Text>
                </View>
              </View>
              <View style={styles.habitRight}>
                <TouchableOpacity
                  style={[
                    styles.habitCheckbox,
                    habit.completedToday && styles.habitCheckboxCompleted
                  ]}
                >
                  <Text style={styles.habitCheckboxText}>
                    {habit.completedToday ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
                {habit.isCustom && (
                  <TouchableOpacity
                    style={styles.deleteHabitButton}
                    onPress={() => deleteHabit(habit.id)}
                  >
                    <Text style={styles.deleteHabitButtonText}>🗑️</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Wellness Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Wellness Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Hydration Tip</Text>
          <Text style={styles.tipText}>
            Start your day with a glass of water to kickstart your metabolism and improve focus.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>😴 Sleep Quality</Text>
          <Text style={styles.tipText}>
            Aim for 7-9 hours of quality sleep. Avoid screens 1 hour before bedtime for better rest.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🧘 Mindfulness</Text>
          <Text style={styles.tipText}>
            Take 5 minutes daily for deep breathing or meditation to reduce stress and improve mental clarity.
          </Text>
        </View>
      </View>

      {/* Sleep Modal */}
      <Modal visible={showSleepModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Sleep</Text>
            <TouchableOpacity onPress={() => setShowSleepModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>Hours of Sleep</Text>
            <TextInput
              style={styles.input}
              placeholder="8.5"
              value={sleepInput}
              onChangeText={setSleepInput}
              keyboardType="numeric"
            />
            
            <TouchableOpacity style={styles.logButton} onPress={logSleep}>
              <Text style={styles.logButtonText}>Log Sleep</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Mood Modal */}
      <Modal visible={showMoodModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Mood</Text>
            <TouchableOpacity onPress={() => setShowMoodModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>How are you feeling today?</Text>
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodButton,
                    selectedMood === mood.value && styles.moodButtonSelected,
                    { borderColor: mood.color }
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity style={styles.logButton} onPress={logMood}>
              <Text style={styles.logButtonText}>Log Mood</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Weight Modal */}
      <Modal visible={showWeightModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Weight</Text>
            <TouchableOpacity onPress={() => setShowWeightModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>Weight (lbs)</Text>
            <TextInput
              style={styles.input}
              placeholder="150"
              value={weightInput}
              onChangeText={setWeightInput}
              keyboardType="numeric"
            />
            
            <TouchableOpacity style={styles.logButton} onPress={logWeight}>
              <Text style={styles.logButtonText}>Log Weight</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Habit Modal */}
      <Modal visible={showHabitModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Custom Habit</Text>
            <TouchableOpacity onPress={() => setShowHabitModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Habit Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Read for 30 minutes"
                value={newHabit.name}
                onChangeText={(text) => setNewHabit({ ...newHabit, name: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryGrid}>
                {habitCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      newHabit.category === category && styles.categoryButtonSelected
                    ]}
                    onPress={() => setNewHabit({ ...newHabit, category })}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      newHabit.category === category && styles.categoryButtonTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Icon</Text>
              <View style={styles.iconGrid}>
                {iconOptions.map((icon) => (
                  <TouchableOpacity
                    key={icon.name}
                    style={[
                      styles.iconButton,
                      newHabit.icon === icon.name && styles.iconButtonSelected
                    ]}
                    onPress={() => setNewHabit({ ...newHabit, icon: icon.name })}
                  >
                    <Text style={styles.iconEmoji}>{icon.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <TouchableOpacity style={styles.logButton} onPress={addCustomHabit}>
              <Text style={styles.logButtonText}>Add Habit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  habitsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  habitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addHabitButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addHabitButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  habitCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  habitContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  habitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  habitCategory: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  habitStreak: {
    fontSize: 12,
    color: '#f97316',
  },
  habitRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitCheckboxCompleted: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  habitCheckboxText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  deleteHabitButton: {
    padding: 4,
  },
  deleteHabitButtonText: {
    fontSize: 16,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  closeButton: {
    fontSize: 24,
    color: '#64748b',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  moodButton: {
    width: (width - 80) / 2,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  moodButtonSelected: {
    backgroundColor: '#f0f9ff',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  categoryButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#64748b',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  iconEmoji: {
    fontSize: 20,
  },
  logButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});