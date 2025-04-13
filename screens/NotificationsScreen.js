"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Text, Appbar, Divider, Avatar } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import userIcon from "../assets/user.png" // local image

// Mock data for notifications
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "reply",
    user: {
      name: "Ahmed Ben Ali",
      avatar: userIcon,
    },
    content: "replied to your review on Fashion Trends TN",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    user: {
      name: "Sarra Mansour",
      avatar: userIcon,
    },
    content: "liked your review on Tech Haven",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "mention",
    user: {
      name: "Mohamed Karim",
      avatar: userIcon,
    },
    content: "mentioned you in a comment on Beauty Box",
    time: "3 days ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    content: "Welcome to TrustCheck TN! Start exploring trusted shops now.",
    time: "1 week ago",
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: {
      name: "Leila Trabelsi",
      avatar: userIcon,
    },
    content: "and 3 others liked your review on Home Essentials",
    time: "1 week ago",
    read: true,
  },
]

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "reply":
        return <FontAwesome name="comment" size={24} color="#14b8a6" />
      case "like":
        return <FontAwesome name="thumbs-up" size={24} color="#14b8a6" />
      case "mention":
        return <FontAwesome name="at" size={24} color="#14b8a6" />
      case "system":
        return <FontAwesome name="info-circle" size={24} color="#14b8a6" />
      default:
        return <FontAwesome name="bell" size={24} color="#14b8a6" />
    }
  }

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        {item.type === "system" ? (
          <View style={styles.systemIconContainer}>{getNotificationIcon(item.type)}</View>
        ) : (
          <Avatar.Image size={50} source={item.user.avatar} />
        )}

        <View style={styles.notificationText}>
          {item.type !== "system" && <Text style={styles.userName}>{item.user.name}</Text>}
          <Text style={styles.notificationMessage}>{item.content}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>

        {!item.read && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Notifications" />
        {unreadCount > 0 && <Appbar.Action icon="check-all" onPress={markAllAsRead} />}
      </Appbar.Header>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadText}>You have {unreadCount} unread notifications</Text>
        </View>
      )}

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="bell-slash" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
  },
  unreadBanner: {
    backgroundColor: "rgba(98, 0, 238, 0.1)",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  unreadText: {
    color: "#14b8a6",
    fontWeight: "500",
    textAlign: "center",
  },
  notificationsList: {
    flexGrow: 1,
  },
  notificationItem: {
    padding: 16,
    backgroundColor: "#fff",
  },
  unreadNotification: {
    backgroundColor: "rgba(98, 0, 238, 0.05)",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  systemIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(98, 0, 238, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#000",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#000",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#14b8a6",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#000",
  },
})

export default NotificationsScreen
