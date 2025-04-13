import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { Text, TextInput, Button, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      Alert.alert(
        'Success', 
        'Your account has been created! Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    }, 1500)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={80} icon="account-plus" style={styles.avatar} />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join TrustCheck TN today</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon="email" />}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
        />

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon="lock-check" />}
        />

        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          loading={loading}
          disabled={loading}
        >
          Sign Up
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Already have an account? Sign In
        </Button>
      </View>

      <Text style={styles.termsText}>
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  avatar: {
    backgroundColor: '#14b8a6',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#14b8a6',
    paddingVertical: 8,
  },
  backButton: {
    marginTop: 16,
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
})

export default SignUpScreen