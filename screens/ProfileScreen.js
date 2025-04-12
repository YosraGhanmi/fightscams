"use client"

import { useContext, useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Text, Button, Avatar, List, Switch, Divider, Card } from "react-native-paper"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { AuthContext } from "../context/AuthContext"

const ProfileScreen = () => {
  const { user, isGuest, logout } = useContext(AuthContext)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        {isGuest ? (
          <View style={styles.guestProfile}>
            <Avatar.Icon size={80} icon="account" style={styles.guestAvatar} />
            <Text style={styles.guestText}>Guest User</Text>
            <Text style={styles.guestSubtext}>
              Create an account to save your reviews and get personalized recommendations
            </Text>
            <Button mode="contained" style={styles.signupButton} labelStyle={styles.buttonText}>
              Sign Up
            </Button>
          </View>
        ) : (
          <View style={styles.userProfile}>
            <Avatar.Image size={80} source={{ uri: user?.photoUrl || "https://placehold.co/50x50" }} />
            <Text style={styles.userName}>{user?.name || "User"}</Text>
            <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>48</Text>
                <Text style={styles.statLabel}>Helpful</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Shops</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {!isGuest && (
        <Card style={styles.activityCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityItem}>
              <FontAwesome name="star" size={20} color="#6200ee" />
              <Text style={styles.activityText}>
                You reviewed <Text style={styles.activityHighlight}>Tech Haven</Text>
              </Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
            <View style={styles.activityItem}>
              <FontAwesome name="thumbs-up" size={20} color="#6200ee" />
              <Text style={styles.activityText}>Your review was marked helpful by 3 users</Text>
              <Text style={styles.activityTime}>1 week ago</Text>
            </View>
          </Card.Content>
        </Card>
      )}

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <List.Item
          title="Notifications"
          titleStyle={styles.listItemTitle}
          description="Receive alerts about your reviews and replies"
          descriptionStyle={styles.listItemDescription}
          left={(props) => <List.Icon {...props} icon="bell" color="#6200ee" />}
          right={(props) => <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} color="#6200ee" />}
        />
        <Divider />
        <List.Item
          title="Dark Mode"
          titleStyle={styles.listItemTitle}
          description="Switch between light and dark themes"
          descriptionStyle={styles.listItemDescription}
          left={(props) => <FontAwesome {...props} name="moon-o" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} color="#6200ee" />}
        />
        <Divider />
        <List.Item
          title="Language"
          titleStyle={styles.listItemTitle}
          description="English"
          descriptionStyle={styles.listItemDescription}
          left={(props) => <FontAwesome {...props} name="language" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <FontAwesome name="chevron-right" size={18} color="#6200ee" />}
        />
        <Divider />
        <List.Item
          title="Privacy Settings"
          titleStyle={styles.listItemTitle}
          description="Manage your data and privacy"
          descriptionStyle={styles.listItemDescription}
          left={(props) => <FontAwesome {...props} name="shield" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <FontAwesome name="chevron-right" size={18} color="#6200ee" />}
        />
      </View>

      <View style={styles.helpSection}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <List.Item
          title="About TrustCheck TN"
          titleStyle={styles.listItemTitle}
          left={(props) => <FontAwesome {...props} name="info-circle" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <FontAwesome name="chevron-right" size={18} color="#6200ee" />}
        />
        <Divider />
        <List.Item
          title="Contact Support"
          titleStyle={styles.listItemTitle}
          left={(props) => <FontAwesome {...props} name="envelope" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <FontAwesome name="chevron-right" size={18} color="#6200ee" />}
        />
        <Divider />
        <List.Item
          title="Report a Problem"
          titleStyle={styles.listItemTitle}
          left={(props) => <FontAwesome {...props} name="exclamation-circle" size={24} color="#6200ee" style={styles.listIcon} />}
          right={(props) => <FontAwesome name="chevron-right" size={18} color="#6200ee" />}
        />
      </View>

      <Button 
        mode="outlined" 
        onPress={handleLogout} 
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      >
        Log Out
      </Button>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200ee",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Keeping header text white for contrast
  },
  profileSection: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  guestProfile: {
    alignItems: "center",
  },
  guestAvatar: {
    backgroundColor: "#6200ee",
  },
  guestText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#000",
  },
  guestSubtext: {
    textAlign: "center",
    color: "#000",
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  signupButton: {
    marginTop: 8,
    backgroundColor: "#6200ee",
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff", // Keeping button text white for contrast
  },
  userProfile: {
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#000",
  },
  userEmail: {
    color: "#000",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee", // Keeping stat numbers purple for emphasis
  },
  statLabel: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  activityCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  activityText: {
    marginLeft: 12,
    flex: 1,
    color: "#000",
  },
  activityHighlight: {
    fontWeight: "bold",
    color: "#000",
  },
  activityTime: {
    fontSize: 12,
    color: "#000",
  },
  settingsSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    marginHorizontal: 16,
    color: "#000",
  },
  listItemTitle: {
    color: "#000",
  },
  listItemDescription: {
    color: "#000",
  },
  helpSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderColor: "#6200ee",
    borderWidth: 1,
    elevation: 1,
  },
  logoutButtonText: {
    color: "#6200ee", // Keeping the logout button text purple for better visibility
  },
  versionText: {
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
  },
  listIcon: {
    marginLeft: 8,
    marginRight: 12,
    marginVertical: 8,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default ProfileScreen