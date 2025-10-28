import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile, dailyData, getTodayTotals } = useUser();

  // Get today's nutrition totals from food entries
  const todayTotals = getTodayTotals();
  const remainingCalories = (profile?.dailyCalories || 2000) - todayTotals.calories + dailyData.caloriesBurned;

  const todayStats = [
    {
      label: 'Steps',
      value: dailyData.steps.toLocaleString(),
      target: '10,000',
      color: '#2563eb',
      bgColor: '#dbeafe',
    },
    {
      label: 'Exercise',
      value: `${dailyData.exerciseMinutes}min`,
      target: '30min',
      color: '#16a34a',
      bgColor: '#dcfce7',
    },
    {
      label: 'Calories Burned',
      value: dailyData.caloriesBurned.toString(),
      target: '400',
      color: '#dc2626',
      bgColor: '#fee2e2',
    },
    {
      label: 'Water',
      value: `${dailyData.water} glasses`,
      target: '8 glasses',
      color: '#0891b2',
      bgColor: '#cffafe',
    },
  ];

  const quickActions = [
    {
      title: 'Log Food',
      subtitle: 'Track your meals',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Start Workout',
      subtitle: 'Begin exercising',
      color: '#16a34a',
      bgColor: '#dcfce7',
    },
    {
      title: 'Log Weight',
      subtitle: 'Track progress',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
    {
      title: 'Sleep Log',
      subtitle: 'Record sleep quality',
      color: '#0891b2',
      bgColor: '#cffafe',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!
        </Text>
        <Text style={styles.userName}>
          {profile?.name || 'Welcome to AiFit'}
        </Text>
      </View>

      {/* Daily Overview */}
      <View style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Today's Overview</Text>
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
          {remainingCalories > 0 ? `${remainingCalories} calories remaining` : 'Goal exceeded!'}
        </Text>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Stats</Text>
        <View style={styles.statsGrid}>
          {todayStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statTarget}>Goal: {stat.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.actionCard, { backgroundColor: action.bgColor }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionTitle, { color: action.color }]}>
                {action.title}
              </Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Nutrition Breakdown */}
      <View style={styles.nutritionContainer}>
        <Text style={styles.sectionTitle}>Today's Nutrition</Text>
        <View style={styles.nutritionCard}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.protein.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.carbs.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{todayTotals.fat.toFixed(1)}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>
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
  greeting: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
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
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  statTarget: {
    fontSize: 12,
    color: '#94a3b8',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748b',
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
  },
});
