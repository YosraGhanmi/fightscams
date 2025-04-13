"use client"
import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Provider as PaperProvider } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Screens
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import LanguageScreen from "./screens/LanguageScreen"
import PrivacySettingsScreen from "./screens/PrivacySettingsScreen"
import AboutScreen from "./screens/AboutScreen"
import SupportScreen from "./screens/SupportScreen"
import ReportProblemScreen from "./screens/ReportProblemScreen"

import HomeScreen from "./screens/HomeScreen"
import ShopDetailScreen from "./screens/ShopDetailScreen"
import ProfileScreen from "./screens/ProfileScreen"
import NotificationsScreen from "./screens/NotificationsScreen"
import AddShopScreen from "./screens/AddShopScreen"

// Context
import { AuthProvider } from "./context/AuthContext"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const ProfileStack = createStackNavigator()

// Home Stack (includes Shop Details)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        options={({ route }) => ({
          title: route.params?.pageName || "Shop Details"
        })}
      />
    </Stack.Navigator>
  )
}

// Profile Stack (includes all profile-related screens)
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: true, title: "Sign Up" }} />
      <ProfileStack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="SupportScreen" component={SupportScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="ReportProblemScreen" component={ReportProblemScreen} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  )
}

// Bottom Tabs for logged-in users
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Home") iconName = "home"
          else if (route.name === "Profile") iconName = "user"
          else if (route.name === "Notifications") iconName = "bell"
          else if (route.name === "Add Shop") iconName = "plus-circle"
          return <FontAwesome name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#14b8a6",
        tabBarInactiveTintColor: "gray"
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Add Shop" component={AddShopScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken")
        setIsLoggedIn(true) // userToken !== null
        setIsLoading(false)
      } catch (e) {
        console.log("Failed to fetch token from storage")
        setIsLoading(false)
      }
    }
    checkLoginStatus()
  }, [])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            ) : (
              <Stack.Screen name="Main" component={MainTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  )
}