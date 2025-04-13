import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { Text, Appbar, TextInput, Button, List, Divider, Chip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const SupportScreen = () => {
  const navigation = useNavigation()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!subject || !message) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      Alert.alert(
        'Success', 
        'Your support request has been submitted. We will get back to you soon.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Contact Support" />
      </Appbar.Header>

      <ScrollView>
        <Text style={styles.description}>
          Need help? Contact our support team and we'll get back to you as soon as possible.
        </Text>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Contact Form</Text>
          
          <TextInput
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="Message"
            value={message}
            onChangeText={setMessage}
            style={styles.messageInput}
            mode="outlined"
            multiline
            numberOfLines={6}
          />
          
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={loading}
            disabled={loading}
          >
            Submit Request
          </Button>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Topics</Text>
          
          <View style={styles.chipContainer}>
            <Chip style={styles.chip} onPress={() => setSubject('Account Issues')}>Account Issues</Chip>
            <Chip style={styles.chip} onPress={() => setSubject('Payment Problem')}>Payment Problem</Chip>
            <Chip style={styles.chip} onPress={() => setSubject('App Bug')}>App Bug</Chip>
            <Chip style={styles.chip} onPress={() => setSubject('Feature Request')}>Feature Request</Chip>
            <Chip style={styles.chip} onPress={() => setSubject('Business Listing')}>Business Listing</Chip>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Ways to Reach Us</Text>
          
          <List.Item
            title="Email Support"
            description="support@trustchecktn.com"
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          
          <List.Item
            title="Phone Support"
            description="(555) 123-4567 (Mon-Fri, 9AM-5PM CT)"
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <Divider />
          
          <List.Item
            title="Live Chat"
            description="Available on our website"
            left={props => <List.Icon {...props} icon="message-text" />}
          />
        </View>

        <Text style={styles.responseTime}>
          Average response time: 24-48 hours
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  description: {
    padding: 16,
    color: '#666',
    fontSize: 14,
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    marginBottom: 16,
  },
  messageInput: {
    marginBottom: 16,
    height: 120,
  },
  submitButton: {
    backgroundColor: '#14b8a6',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    margin: 4,
    backgroundColor: '#e0e0e0',
  },
  responseTime: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
    marginVertical: 24,
  },
})

export default SupportScreen