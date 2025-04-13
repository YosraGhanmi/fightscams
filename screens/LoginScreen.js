"use client"

import { useContext } from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Text, Button } from "react-native-paper"
import { AuthContext } from "../context/AuthContext"

const LoginScreen = () => {
  const { login, loginAsGuest } = useContext(AuthContext)
  const handleGoogleLogin = async () => {
    try {
      // Note: In a real app, you would need to set up Google Auth properly
      // This is a simplified example
      const result = {
        type: "success",
        user: {
          name: "Demo User",
          email: "demo@example.com",
          photoUrl: "",
        },
        token: "dummy-token",
      }

      if (result.type === "success") {
        login(result.user)
      }
    } catch (error) {
      console.error("Google login error:", error)
    }
  }

  const handleGuestLogin = () => {
    loginAsGuest()
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: "https://placehold.co/50x50" }} style={styles.logo} />
        <Text style={styles.title}>TrustCheck TN</Text>
        <Text style={styles.subtitle}>Shop with confidence</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="google"
          onPress={handleGoogleLogin}
          style={styles.googleButton}
          labelStyle={styles.buttonLabel}
        >
          Continue with Google
        </Button>

        <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14b8a6",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 30,
  },
  googleButton: {
    marginBottom: 15,
    paddingVertical: 8,
    backgroundColor: "#14b8a6",
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 4,
  },
  guestButton: {
    alignItems: "center",
    padding: 15,
  },
  guestButtonText: {
    color: "#14b8a6",
    fontSize: 16,
    fontWeight: "500",
  },
  termsText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
})

export default LoginScreen
