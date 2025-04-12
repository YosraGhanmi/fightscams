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
import HomeScreen from "./screens/HomeScreen"
import ShopDetailScreen from "./screens/ShopDetailScreen"
import ProfileScreen from "./screens/ProfileScreen"
import NotificationsScreen from "./screens/NotificationsScreen"
import AddShopScreen from "./screens/AddShopScreen"
// Context
import { AuthProvider } from "./context/AuthContext"
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
// Create a separate stack navigator for Home screens
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
  );
}
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Profile") {
            iconName = "user"
          } else if (route.name === "Notifications") {
            iconName = "bell"
          } else if (route.name === "Add Shop") {
            iconName = "plus-circle"
          }
          return <FontAwesome name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Add Shop" component={AddShopScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken")
        setIsLoggedIn(true) //userToken !== null
        setIsLoading(false)
      } catch (e) {
        console.log("Failed to fetch the data from storage")
        setIsLoading(false)
      }
    }
    checkLoginStatus()
  }, [])
  if (isLoading) {
    return null // Or a loading screen
  }
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {!isLoggedIn ? (
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  )
}