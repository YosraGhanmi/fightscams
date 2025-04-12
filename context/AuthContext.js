"use client"

import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    // Check if user data exists in AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData")
        const guestStatus = await AsyncStorage.getItem("isGuest")

        if (userData) {
          setUser(JSON.parse(userData))
        }

        if (guestStatus) {
          setIsGuest(guestStatus === "true")
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }

    loadUserData()
  }, [])

  const login = async (userData) => {
    try {
      setUser(userData)
      setIsGuest(false)
      await AsyncStorage.setItem("userData", JSON.stringify(userData))
      await AsyncStorage.setItem("userToken", userData.token || "dummy-token")
      await AsyncStorage.setItem("isGuest", "false")
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const loginAsGuest = async () => {
    try {
      setUser(null)
      setIsGuest(true)
      await AsyncStorage.setItem("isGuest", "true")
      await AsyncStorage.setItem("userToken", "guest-token")
    } catch (error) {
      console.error("Error saving guest status:", error)
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      setIsGuest(false)
      await AsyncStorage.removeItem("userData")
      await AsyncStorage.removeItem("userToken")
      await AsyncStorage.removeItem("isGuest")
    } catch (error) {
      console.error("Error removing user data:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isGuest, login, loginAsGuest, logout }}>{children}</AuthContext.Provider>
}
