import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { Stack, router } from 'expo-router';
import ProtectedRoute from '../../components/ProtectedRoute';

const FeedbackPage = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleBack = () => {
    // Handle back button press here
    // For example, navigate back to the previous screen
  };

  const handleSend = () => {
    // Handle send button press here
    // For example, submit feedback to server
  };

  return (
    <ProtectedRoute>

      <View style={styles.container}>
        <SafeAreaView>
          <Stack.Screen
            options={({
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <Text style={styles.title}>Feedback</Text>
              ),
            })}
          />
        </SafeAreaView>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Chủ đề mà bạn muốn góp ý</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập chủ đề góp ý của bạn"
              value={subject}
              onChangeText={setSubject}
              multiline={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Theo bạn, HisCovery cần những điểm nào cần cải thiện?</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Nhập ý kiến của bạn"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#DF4771',
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
  },
  descriptionInput: {
    height: 150,
  },
});

export default FeedbackPage;
