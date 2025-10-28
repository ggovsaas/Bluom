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
import axios from 'axios';

const { width } = Dimensions.get('window');

interface Exercise {
  id: number;
  name: string;
  category: string;
  type: 'weight' | 'bodyweight' | 'cardio';
  caloriesPerMinute: number;
  muscleGroups: string[];
}

interface ExerciseEntry {
  id: string;
  exerciseId: number;
  name: string;
  duration: number;
  calories: number;
  sets?: number;
  reps?: number;
  weight?: number;
  type: string;
  date: string;
  timestamp: Date;
}

export default function MoveScreen() {
  const { 
    profile, 
    dailyData, 
    updateDailyData, 
    addExerciseEntry, 
    getExerciseEntriesForDate, 
    getCurrentDate 
  } = useUser();
  
  // State management
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [showCustomExercise, setShowCustomExercise] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [workoutForm, setWorkoutForm] = useState({
    duration: '',
    sets: '',
    reps: '',
    weight: '',
    calories: ''
  });
  
  const [customExerciseForm, setCustomExerciseForm] = useState({
    name: '',
    description: '',
    duration: '',
    calories: ''
  });

  const currentDate = getCurrentDate();
  const todayExercises = getExerciseEntriesForDate(currentDate);
  
  // Calculate today's totals from exercise entries
  const todayTotals = todayExercises.reduce((total, exercise) => ({
    workouts: total.workouts + 1,
    minutes: total.minutes + exercise.duration,
    calories: total.calories + exercise.calories
  }), { workouts: 0, minutes: 0, calories: 0 });

  const workoutCategories = ['All', 'Strength', 'Cardio', 'HIIT', 'Flexibility'];

  // Mock exercise database (from your original app)
  const mockExercises: Exercise[] = [
    // Cardio
    { id: 1, name: 'Running', category: 'Cardio', type: 'cardio', caloriesPerMinute: 12, muscleGroups: ['legs', 'cardiovascular'] },
    { id: 2, name: 'Cycling', category: 'Cardio', type: 'cardio', caloriesPerMinute: 10, muscleGroups: ['legs', 'cardiovascular'] },
    { id: 3, name: 'Swimming', category: 'Cardio', type: 'cardio', caloriesPerMinute: 11, muscleGroups: ['full body', 'cardiovascular'] },
    { id: 4, name: 'Jogging', category: 'Cardio', type: 'cardio', caloriesPerMinute: 8, muscleGroups: ['legs', 'cardiovascular'] },
    { id: 5, name: 'Jump Rope', category: 'Cardio', type: 'cardio', caloriesPerMinute: 13, muscleGroups: ['legs', 'cardiovascular'] },
    
    // Strength Training
    { id: 11, name: 'Push-ups', category: 'Strength', type: 'bodyweight', caloriesPerMinute: 8, muscleGroups: ['chest', 'triceps', 'shoulders'] },
    { id: 12, name: 'Squats', category: 'Strength', type: 'bodyweight', caloriesPerMinute: 6, muscleGroups: ['legs', 'glutes'] },
    { id: 13, name: 'Pull-ups', category: 'Strength', type: 'bodyweight', caloriesPerMinute: 10, muscleGroups: ['back', 'biceps'] },
    { id: 14, name: 'Deadlifts', category: 'Strength', type: 'weight', caloriesPerMinute: 9, muscleGroups: ['back', 'legs', 'glutes'] },
    { id: 15, name: 'Bench Press', category: 'Strength', type: 'weight', caloriesPerMinute: 7, muscleGroups: ['chest', 'triceps', 'shoulders'] },
    
    // HIIT
    { id: 21, name: 'Burpees', category: 'HIIT', type: 'bodyweight', caloriesPerMinute: 15, muscleGroups: ['full body'] },
    { id: 22, name: 'Mountain Climbers', category: 'HIIT', type: 'bodyweight', caloriesPerMinute: 12, muscleGroups: ['core', 'legs'] },
    { id: 23, name: 'High Knees', category: 'HIIT', type: 'bodyweight', caloriesPerMinute: 10, muscleGroups: ['legs', 'cardiovascular'] },
    { id: 24, name: 'Jumping Jacks', category: 'HIIT', type: 'bodyweight', caloriesPerMinute: 8, muscleGroups: ['full body'] },
    
    // Flexibility
    { id: 29, name: 'Yoga', category: 'Flexibility', type: 'bodyweight', caloriesPerMinute: 3, muscleGroups: ['full body'] },
    { id: 30, name: 'Stretching', category: 'Flexibility', type: 'bodyweight', caloriesPerMinute: 2, muscleGroups: ['full body'] },
    { id: 31, name: 'Pilates', category: 'Flexibility', type: 'bodyweight', caloriesPerMinute: 4, muscleGroups: ['core', 'full body'] },
  ];

  const searchExercises = async (query: string, category?: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      // Filter exercises based on search query and category
      let filteredExercises = mockExercises.filter(exercise => 
        exercise.name.toLowerCase().includes(query.toLowerCase()) ||
        exercise.category.toLowerCase().includes(query.toLowerCase()) ||
        exercise.muscleGroups.some(group => group.toLowerCase().includes(query.toLowerCase()))
      );

      if (category && category !== 'All') {
        filteredExercises = filteredExercises.filter(exercise => exercise.category === category);
      }

      setSearchResults(filteredExercises);
    } catch (error) {
      console.error('Exercise search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const logExercise = async () => {
    if (!selectedExercise) return;

    const duration = parseInt(workoutForm.duration) || 0;
    const calories = parseInt(workoutForm.calories) || (duration * selectedExercise.caloriesPerMinute);
    const sets = parseInt(workoutForm.sets) || undefined;
    const reps = parseInt(workoutForm.reps) || undefined;
    const weight = parseInt(workoutForm.weight) || undefined;

    const exerciseEntry: ExerciseEntry = {
      id: Date.now().toString(),
      exerciseId: selectedExercise.id,
      name: selectedExercise.name,
      duration: duration,
      calories: calories,
      sets: sets,
      reps: reps,
      weight: weight,
      type: selectedExercise.type,
      date: currentDate,
      timestamp: new Date()
    };

    await addExerciseEntry(exerciseEntry);
    
    // Update daily data
    const newExerciseMinutes = dailyData.exerciseMinutes + duration;
    const newCaloriesBurned = dailyData.caloriesBurned + calories;
    await updateDailyData({ 
      exerciseMinutes: newExerciseMinutes,
      caloriesBurned: newCaloriesBurned
    });

    setShowWorkoutModal(false);
    setSelectedExercise(null);
    setWorkoutForm({ duration: '', sets: '', reps: '', weight: '', calories: '' });
    
    Alert.alert('Success', `${selectedExercise.name} logged successfully!`);
  };

  const logCustomExercise = async () => {
    if (!customExerciseForm.name || !customExerciseForm.duration) {
      Alert.alert('Error', 'Please fill in exercise name and duration');
      return;
    }

    const duration = parseInt(customExerciseForm.duration);
    const calories = parseInt(customExerciseForm.calories) || (duration * 6); // Default 6 cal/min

    const exerciseEntry: ExerciseEntry = {
      id: Date.now().toString(),
      exerciseId: Date.now(),
      name: customExerciseForm.name,
      duration: duration,
      calories: calories,
      type: 'custom',
      date: currentDate,
      timestamp: new Date()
    };

    await addExerciseEntry(exerciseEntry);
    
    // Update daily data
    const newExerciseMinutes = dailyData.exerciseMinutes + duration;
    const newCaloriesBurned = dailyData.caloriesBurned + calories;
    await updateDailyData({ 
      exerciseMinutes: newExerciseMinutes,
      caloriesBurned: newCaloriesBurned
    });

    setShowCustomExercise(false);
    setCustomExerciseForm({ name: '', description: '', duration: '', calories: '' });
    
    Alert.alert('Success', `${customExerciseForm.name} logged successfully!`);
  };

  const logSteps = async () => {
    const steps = parseInt(dailyData.steps.toString()) + 1000; // Add 1000 steps
    const calories = Math.round(steps * 0.04); // Rough estimate: 0.04 calories per step
    
    await updateDailyData({ 
      steps: steps,
      caloriesBurned: dailyData.caloriesBurned + calories
    });
    
    Alert.alert('Success', '1000 steps added!');
  };

  // Search debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchExercises(searchQuery, selectedCategory);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategory]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Move</Text>
        <Text style={styles.subtitle}>Track your workouts and exercises</Text>
      </View>

      {/* Today's Overview */}
      <View style={styles.overviewCard}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todayTotals.workouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todayTotals.minutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{todayTotals.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setShowExerciseSearch(true)}
        >
          <Text style={styles.actionButtonText}>🏋️ Log Exercise</Text>
          <Text style={styles.actionButtonSubtext}>Search and log workouts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setShowCustomExercise(true)}
        >
          <Text style={styles.actionButtonText}>➕ Custom Exercise</Text>
          <Text style={styles.actionButtonSubtext}>Add your own workout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={logSteps}
        >
          <Text style={styles.actionButtonText}>👟 Add Steps</Text>
          <Text style={styles.actionButtonSubtext}>Log 1000 steps</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Workouts */}
      <View style={styles.workoutsContainer}>
        <Text style={styles.sectionTitle}>Today's Workouts</Text>
        {todayExercises.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No workouts logged today</Text>
            <Text style={styles.emptyStateSubtext}>Start by logging your first exercise!</Text>
          </View>
        ) : (
          todayExercises.map((exercise, index) => (
            <View key={index} style={styles.workoutCard}>
              <View style={styles.workoutHeader}>
                <Text style={styles.workoutName}>{exercise.name}</Text>
                <Text style={styles.workoutCalories}>{exercise.calories} cal</Text>
              </View>
              <View style={styles.workoutDetails}>
                <Text style={styles.workoutDetail}>Duration: {exercise.duration} min</Text>
                {exercise.sets && <Text style={styles.workoutDetail}>Sets: {exercise.sets}</Text>}
                {exercise.reps && <Text style={styles.workoutDetail}>Reps: {exercise.reps}</Text>}
                {exercise.weight && <Text style={styles.workoutDetail}>Weight: {exercise.weight} lbs</Text>}
              </View>
            </View>
          ))
        )}
      </View>

      {/* Exercise Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Exercise Categories</Text>
        <View style={styles.categoriesGrid}>
          {workoutCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryCard,
                selectedCategory === category && styles.categoryCardSelected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextSelected
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Exercise Search Modal */}
      <Modal visible={showExerciseSearch} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Search Exercise</Text>
            <TouchableOpacity onPress={() => setShowExerciseSearch(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search for exercises..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          
          <ScrollView style={styles.searchResults}>
            {loading ? (
              <Text style={styles.loadingText}>Searching...</Text>
            ) : (
              searchResults.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseItem}
                  onPress={() => {
                    setSelectedExercise(exercise);
                    setWorkoutForm({
                      ...workoutForm,
                      calories: (30 * exercise.caloriesPerMinute).toString() // Default 30 min
                    });
                    setShowExerciseSearch(false);
                    setShowWorkoutModal(true);
                  }}
                >
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseCategory}>{exercise.category}</Text>
                    <Text style={styles.exerciseMuscles}>
                      {exercise.muscleGroups.join(', ')}
                    </Text>
                  </View>
                  <View style={styles.exerciseCalories}>
                    <Text style={styles.exerciseCaloriesText}>
                      {exercise.caloriesPerMinute} cal/min
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Workout Logging Modal */}
      <Modal visible={showWorkoutModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Workout</Text>
            <TouchableOpacity onPress={() => setShowWorkoutModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.workoutModalContent}>
            {selectedExercise && (
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{selectedExercise.name}</Text>
                <Text style={styles.exerciseCategory}>{selectedExercise.category}</Text>
                <Text style={styles.exerciseCaloriesText}>
                  {selectedExercise.caloriesPerMinute} calories per minute
                </Text>
              </View>
            )}
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                value={workoutForm.duration}
                onChangeText={(text) => {
                  setWorkoutForm({ ...workoutForm, duration: text });
                  if (selectedExercise && text) {
                    const calories = parseInt(text) * selectedExercise.caloriesPerMinute;
                    setWorkoutForm(prev => ({ ...prev, calories: calories.toString() }));
                  }
                }}
                keyboardType="numeric"
              />
            </View>

            {selectedExercise?.type === 'weight' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Sets</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="3"
                    value={workoutForm.sets}
                    onChangeText={(text) => setWorkoutForm({ ...workoutForm, sets: text })}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Reps</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12"
                    value={workoutForm.reps}
                    onChangeText={(text) => setWorkoutForm({ ...workoutForm, reps: text })}
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Weight (lbs)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="135"
                    value={workoutForm.weight}
                    onChangeText={(text) => setWorkoutForm({ ...workoutForm, weight: text })}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Calories Burned</Text>
              <TextInput
                style={styles.input}
                placeholder="300"
                value={workoutForm.calories}
                onChangeText={(text) => setWorkoutForm({ ...workoutForm, calories: text })}
                keyboardType="numeric"
              />
            </View>
            
            <TouchableOpacity style={styles.logButton} onPress={logExercise}>
              <Text style={styles.logButtonText}>Log Workout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Custom Exercise Modal */}
      <Modal visible={showCustomExercise} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Custom Exercise</Text>
            <TouchableOpacity onPress={() => setShowCustomExercise(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.workoutModalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Exercise Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Custom Workout"
                value={customExerciseForm.name}
                onChangeText={(text) => setCustomExerciseForm({ ...customExerciseForm, name: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your workout..."
                value={customExerciseForm.description}
                onChangeText={(text) => setCustomExerciseForm({ ...customExerciseForm, description: text })}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                value={customExerciseForm.duration}
                onChangeText={(text) => setCustomExerciseForm({ ...customExerciseForm, duration: text })}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Calories Burned</Text>
              <TextInput
                style={styles.input}
                placeholder="180"
                value={customExerciseForm.calories}
                onChangeText={(text) => setCustomExerciseForm({ ...customExerciseForm, calories: text })}
                keyboardType="numeric"
              />
            </View>
            
            <TouchableOpacity style={styles.logButton} onPress={logCustomExercise}>
              <Text style={styles.logButtonText}>Log Custom Exercise</Text>
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
  overviewCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  actionButtonSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  workoutsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
  workoutCard: {
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
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  workoutCalories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  workoutDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  workoutDetail: {
    fontSize: 12,
    color: '#64748b',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryCardSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
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
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    margin: 20,
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  exerciseMuscles: {
    fontSize: 12,
    color: '#94a3b8',
  },
  exerciseCalories: {
    alignItems: 'flex-end',
  },
  exerciseCaloriesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  workoutModalContent: {
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
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