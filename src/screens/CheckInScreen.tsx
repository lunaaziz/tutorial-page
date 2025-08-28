import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CheckInScreen() {
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleCheckIn = () => {
    if (!restaurantName.trim()) {
      Alert.alert('Error', 'Please enter a restaurant name');
      return;
    }
    
    Alert.alert(
      'Check-in Successful!',
      `You've checked in at ${restaurantName}`,
      [{ text: 'OK' }]
    );
    
    // Reset form
    setRestaurantName('');
    setRating(0);
    setComment('');
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity
        key={star}
        onPress={() => setRating(star)}
        style={styles.starButton}
      >
        <Ionicons
          name={star <= rating ? 'star' : 'star-outline'}
          size={30}
          color={star <= rating ? '#FFD700' : '#ccc'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Check In</Text>
        <Text style={styles.subtitle}>Share your food experience</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Restaurant Name</Text>
          <TextInput
            style={styles.input}
            value={restaurantName}
            onChangeText={setRestaurantName}
            placeholder="Enter restaurant name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rating</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Comment (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comment}
            onChangeText={setComment}
            placeholder="Share your experience..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
          <Ionicons name="location" size={20} color="white" />
          <Text style={styles.checkInButtonText}>Check In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Check-ins</Text>
        <View style={styles.recentItem}>
          <Ionicons name="restaurant" size={24} color="#FF6B6B" />
          <View style={styles.recentInfo}>
            <Text style={styles.recentName}>Pizza Palace</Text>
            <Text style={styles.recentTime}>2 hours ago</Text>
          </View>
          <View style={styles.recentRating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.recentRatingText}>4.5</Text>
          </View>
        </View>
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
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  starButton: {
    marginHorizontal: 5,
  },
  checkInButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  recentSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recentItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  recentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  recentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recentTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  recentRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentRatingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
}); 