import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const { width } = Dimensions.get('window');

// API configuration
const API_BASE_URL = 'http://localhost:3001';
const API_ENDPOINTS = {
  FOODS_SEARCH: `${API_BASE_URL}/api/foods/search`,
  FOODS_RECOGNIZE: `${API_BASE_URL}/api/foods/recognize`,
  USER_LOG_FOOD: `${API_BASE_URL}/api/user/log-food`,
};

export default function FuelScreen() {
  const { 
    profile, 
    dailyData, 
    updateDailyData, 
    addFoodEntry, 
    getFoodEntriesForMeal, 
    getUsedDays,
    getCurrentDate,
    removeFoodEntry
  } = useUser();
  
  // State management
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [waterAmount, setWaterAmount] = useState('');
  const [waterUnit, setWaterUnit] = useState('8oz');
  
  // Photo recognition state
  const [recognizedFood, setRecognizedFood] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  
  // Recipe form state
  const [recipeForm, setRecipeForm] = useState({
    name: '',
    servings: 1,
    ingredients: [] as any[]
  });
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientResults, setIngredientResults] = useState<any[]>([]);

  // Water unit options
  const waterUnits = [
    { value: '8oz', label: '8 fl oz', ml: 237 },
    { value: '500ml', label: '500 ml', ml: 500 },
    { value: '1cup', label: '1 cup (250ml)', ml: 250 }
  ];

  // Meal configurations
  const mealConfigs = {
    'Breakfast': { color: '#fed7aa', iconColor: '#ea580c' },
    'Lunch': { color: '#fef3c7', iconColor: '#d97706' },
    'Dinner': { color: '#e9d5ff', iconColor: '#9333ea' },
    'Snack': { color: '#fce7f3', iconColor: '#db2777' }
  };

  const defaultMeals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const currentDate = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Calculate totals for today from food entries
  const todayEntries = getFoodEntriesForMeal('', selectedDate);
  const todayTotals = todayEntries.reduce((total, entry) => ({
    calories: total.calories + (entry.calories * entry.quantity),
    protein: total.protein + (entry.protein * entry.quantity),
    carbs: total.carbs + (entry.carbs * entry.quantity),
    fat: total.fat + (entry.fat * entry.quantity)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const remaining = {
    calories: Math.max(0, (profile?.dailyCalories || 2000) - todayTotals.calories),
    protein: Math.max(0, (profile?.dailyProtein || 150) - todayTotals.protein),
    carbs: Math.max(0, (profile?.dailyCarbs || 225) - todayTotals.carbs),
    fat: Math.max(0, (profile?.dailyFat || 67) - todayTotals.fat)
  };

  // Food search functionality
  const searchFoods = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_ENDPOINTS.FOODS_SEARCH}?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Food search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Photo recognition functionality
  const handlePhotoCapture = () => {
    Alert.alert(
      'Camera Feature',
      'Camera functionality will be implemented with React Native Camera library. This will allow you to take photos of your food for AI recognition.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Simulate Recognition', onPress: simulateFoodRecognition }
      ]
    );
  };

  const simulateFoodRecognition = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockFood = {
        name: 'Apple',
        calories: 95,
        protein: 0.5,
        carbs: 25,
        fat: 0.3,
        confidence: 0.92,
        serving_size: '1 medium (182g)'
      };
      setRecognizedFood(mockFood);
      setIsProcessing(false);
      setShowPhotoCapture(false);
    }, 2000);
  };

  // Add food to meal
  const addFoodToMeal = async (food: any, meal: string) => {
    const foodEntry = {
      id: Date.now().toString(),
      foodId: food.id || Date.now(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      quantity: 1,
      meal: meal,
      date: selectedDate,
      nutrition: {
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      }
    };

    await addFoodEntry(foodEntry);
    setShowFoodSearch(false);
    setRecognizedFood(null);
    Alert.alert('Success', `${food.name} added to ${meal}!`);
  };

  // Water intake functionality
  const addWater = async () => {
    const amount = parseInt(waterAmount) || 1;
    const unit = waterUnits.find(u => u.value === waterUnit);
    const ml = amount * (unit?.ml || 237);
    
    const newWaterAmount = dailyData.water + amount;
    await updateDailyData({ water: newWaterAmount });
    
    setWaterAmount('');
    setShowWaterModal(false);
    Alert.alert('Success', `Added ${amount} ${unit?.label} of water!`);
  };

  // Search debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        searchFoods(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Fuel</Text>
        <Text style={styles.subtitle}>Track your nutrition</Text>
      </View>

      {/* Daily Overview */}
      <View style={styles.overviewCard}>
        <View style={styles.caloriesContainer}>
          <View style={styles.caloriesMain}>
            <Text style={styles.caloriesValue}>{todayTotals.calories}</Text>
            <Text style={styles.caloriesLabel}>Calories Consumed</Text>
          </View>
          <View style={styles.caloriesTarget}>
            <Text style={styles.targetValue}>{profile?.dailyCalories || 2000}</Text>
            <Text style={styles.targetLabel}>Daily Goal</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min((todayTotals.calories / (profile?.dailyCalories || 2000)) * 100, 100)}%` 
              }
            ]} 
          />
        </View>
        <Text style={styles.remainingText}>
          {remaining.calories > 0 ? `${remaining.calories} calories remaining` : 'Goal exceeded!'}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handlePhotoCapture}>
          <Text style={styles.actionButtonText}>📷 Photo Calorie Detector</Text>
          <Text style={styles.actionButtonSubtext}>Take a photo of your food</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setShowFoodSearch(true)}
        >
          <Text style={styles.actionButtonText}>🔍 Search Food</Text>
          <Text style={styles.actionButtonSubtext}>Find and log food items</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => setShowWaterModal(true)}
        >
          <Text style={styles.actionButtonText}>💧 Log Water</Text>
          <Text style={styles.actionButtonSubtext}>Track your hydration</Text>
        </TouchableOpacity>
      </View>

      {/* Meals */}
      <View style={styles.mealsContainer}>
        <Text style={styles.sectionTitle}>Today's Meals</Text>
        {defaultMeals.map((meal, index) => {
          const mealEntries = getFoodEntriesForMeal(meal, selectedDate);
          const mealConfig = mealConfigs[meal as keyof typeof mealConfigs];
          
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.mealCard, { backgroundColor: mealConfig.color }]}
              onPress={() => setSelectedMeal(meal)}
            >
              <View style={styles.mealHeader}>
                <Text style={[styles.mealName, { color: mealConfig.iconColor }]}>
                  {meal}
                </Text>
                <Text style={styles.mealTime}>
                  {mealEntries.length} items
                </Text>
              </View>
              <View style={styles.mealContent}>
                <Text style={styles.mealCalories}>
                  {mealEntries.reduce((total, entry) => total + (entry.calories * entry.quantity), 0)} cal
                </Text>
                <Text style={styles.addItem}>+ Add item</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Nutrition Breakdown */}
      <View style={styles.nutritionContainer}>
        <Text style={styles.sectionTitle}>Today's Nutrition</Text>
        <View style={styles.nutritionCard}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.protein.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
            <Text style={styles.nutritionTarget}>
              Goal: {profile?.dailyProtein || 150}g
            </Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.carbs.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
            <Text style={styles.nutritionTarget}>
              Goal: {profile?.dailyCarbs || 225}g
            </Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.fat.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
            <Text style={styles.nutritionTarget}>
              Goal: {profile?.dailyFat || 67}g
            </Text>
          </View>
        </View>
      </View>

      {/* Water Intake */}
      <View style={styles.waterContainer}>
        <Text style={styles.sectionTitle}>Water Intake</Text>
        <View style={styles.waterCard}>
          <Text style={styles.waterValue}>{dailyData.water}</Text>
          <Text style={styles.waterLabel}>glasses today</Text>
          <View style={styles.waterButtons}>
            <TouchableOpacity 
              style={styles.waterButton}
              onPress={() => updateDailyData({ water: Math.max(0, dailyData.water - 1) })}
            >
              <Text style={styles.waterButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.waterButton}
              onPress={() => updateDailyData({ water: dailyData.water + 1 })}
            >
              <Text style={styles.waterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Food Search Modal */}
      <Modal visible={showFoodSearch} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Search Food</Text>
            <TouchableOpacity onPress={() => setShowFoodSearch(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          
          <ScrollView style={styles.searchResults}>
            {loading ? (
              <Text style={styles.loadingText}>Searching...</Text>
            ) : (
              searchResults.map((food, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.foodItem}
                  onPress={() => {
                    Alert.alert(
                      'Select Meal',
                      'Which meal would you like to add this to?',
                      defaultMeals.map(meal => ({
                        text: meal,
                        onPress: () => addFoodToMeal(food, meal)
                      }))
                    );
                  }}
                >
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodBrand}>{food.brand || 'Generic'}</Text>
                  </View>
                  <View style={styles.foodNutrition}>
                    <Text style={styles.foodCalories}>{food.calories} cal</Text>
                    <Text style={styles.foodMacros}>
                      P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Water Modal */}
      <Modal visible={showWaterModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Log Water</Text>
            <TouchableOpacity onPress={() => setShowWaterModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.waterModalContent}>
            <TextInput
              style={styles.waterInput}
              placeholder="Amount"
              value={waterAmount}
              onChangeText={setWaterAmount}
              keyboardType="numeric"
            />
            
            <View style={styles.waterUnitSelector}>
              {waterUnits.map((unit) => (
                <TouchableOpacity
                  key={unit.value}
                  style={[
                    styles.waterUnitButton,
                    waterUnit === unit.value && styles.waterUnitButtonSelected
                  ]}
                  onPress={() => setWaterUnit(unit.value)}
                >
                  <Text style={[
                    styles.waterUnitText,
                    waterUnit === unit.value && styles.waterUnitTextSelected
                  ]}>
                    {unit.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity style={styles.addWaterButton} onPress={addWater}>
              <Text style={styles.addWaterButtonText}>Add Water</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Recognized Food Modal */}
      {recognizedFood && (
        <Modal visible={!!recognizedFood} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Food Recognized!</Text>
              <TouchableOpacity onPress={() => setRecognizedFood(null)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.recognizedFoodContent}>
              <Text style={styles.recognizedFoodName}>{recognizedFood.name}</Text>
              <Text style={styles.recognizedFoodConfidence}>
                Confidence: {Math.round(recognizedFood.confidence * 100)}%
              </Text>
              
              <View style={styles.recognizedFoodNutrition}>
                <Text style={styles.recognizedFoodCalories}>
                  {recognizedFood.calories} calories
                </Text>
                <Text style={styles.recognizedFoodMacros}>
                  Protein: {recognizedFood.protein}g | Carbs: {recognizedFood.carbs}g | Fat: {recognizedFood.fat}g
                </Text>
              </View>
              
              <Text style={styles.recognizedFoodServing}>
                Serving: {recognizedFood.serving_size}
              </Text>
              
              <TouchableOpacity
                style={styles.addRecognizedFoodButton}
                onPress={() => {
                  Alert.alert(
                    'Select Meal',
                    'Which meal would you like to add this to?',
                    defaultMeals.map(meal => ({
                      text: meal,
                      onPress: () => addFoodToMeal(recognizedFood, meal)
                    }))
                  );
                }}
              >
                <Text style={styles.addRecognizedFoodButtonText}>Add to Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  caloriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  caloriesMain: {
    alignItems: 'center',
  },
  caloriesValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  caloriesLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  caloriesTarget: {
    alignItems: 'center',
  },
  targetValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#64748b',
  },
  targetLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
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
  mealsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  mealCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
  },
  mealTime: {
    fontSize: 14,
    color: '#64748b',
  },
  mealContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCalories: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  addItem: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  nutritionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  nutritionCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  nutritionTarget: {
    fontSize: 10,
    color: '#94a3b8',
  },
  waterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  waterCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  waterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0891b2',
    marginBottom: 8,
  },
  waterLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
  },
  waterButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  waterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0891b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  foodBrand: {
    fontSize: 14,
    color: '#64748b',
  },
  foodNutrition: {
    alignItems: 'flex-end',
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 4,
  },
  foodMacros: {
    fontSize: 12,
    color: '#64748b',
  },
  // Water modal styles
  waterModalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  waterInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  waterUnitSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  waterUnitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  waterUnitButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  waterUnitText: {
    fontSize: 14,
    color: '#64748b',
  },
  waterUnitTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  addWaterButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addWaterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Recognized food modal styles
  recognizedFoodContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognizedFoodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  recognizedFoodConfidence: {
    fontSize: 16,
    color: '#16a34a',
    marginBottom: 20,
  },
  recognizedFoodNutrition: {
    alignItems: 'center',
    marginBottom: 20,
  },
  recognizedFoodCalories: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
  },
  recognizedFoodMacros: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  recognizedFoodServing: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 30,
  },
  addRecognizedFoodButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
  },
  addRecognizedFoodButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});