import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckIn {
  id: string;
  restaurantName: string;
  location: string;
  rating: number;
  date: string;
  image?: string;
}

const mockCheckIns: CheckIn[] = [
  {
    id: '1',
    restaurantName: 'Pizza Palace',
    location: 'Downtown',
    rating: 4.5,
    date: '2 hours ago',
  },
  {
    id: '2',
    restaurantName: 'Sushi Master',
    location: 'Westside',
    rating: 4.8,
    date: '1 day ago',
  },
  {
    id: '3',
    restaurantName: 'Burger Joint',
    location: 'Eastside',
    rating: 4.2,
    date: '2 days ago',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FoodPoint</Text>
        <Text style={styles.subtitle}>Your Foodie Community</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="location" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Check-ins</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>4.6</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="people" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Check-ins</Text>
        {mockCheckIns.map((checkIn) => (
          <TouchableOpacity key={checkIn.id} style={styles.checkInCard}>
            <View style={styles.checkInContent}>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{checkIn.restaurantName}</Text>
                <Text style={styles.location}>{checkIn.location}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{checkIn.rating}</Text>
                </View>
              </View>
              <Text style={styles.date}>{checkIn.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Hotspots</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.hotspotCard}>
            <View style={styles.hotspotImage}>
              <Ionicons name="restaurant" size={32} color="#FF6B6B" />
            </View>
            <Text style={styles.hotspotName}>Taco Town</Text>
            <Text style={styles.hotspotDistance}>0.3 km</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hotspotCard}>
            <View style={styles.hotspotImage}>
              <Ionicons name="restaurant" size={32} color="#FF6B6B" />
            </View>
            <Text style={styles.hotspotName}>Coffee Corner</Text>
            <Text style={styles.hotspotDistance}>0.5 km</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hotspotCard}>
            <View style={styles.hotspotImage}>
              <Ionicons name="restaurant" size={32} color="#FF6B6B" />
            </View>
            <Text style={styles.hotspotName}>Ice Cream Shop</Text>
            <Text style={styles.hotspotDistance}>0.8 km</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6B6B',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  checkInCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  checkInContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  hotspotCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    minWidth: 100,
  },
  hotspotImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  hotspotName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  hotspotDistance: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 