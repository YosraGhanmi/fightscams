import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Appbar, List, Switch, Divider, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const PrivacySettingsScreen = () => {
  const navigation = useNavigation()
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true)
  const [thirdPartyEnabled, setThirdPartyEnabled] = useState(false)

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Privacy Settings" />
      </Appbar.Header>

      <ScrollView>
        <Text style={styles.description}>
          Control how your data is used and shared within the app
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Collection</Text>
          
          <List.Item
            title="Location Services"
            description="Allow app to access your location for nearby businesses"
            left={props => <List.Icon {...props} icon="map-marker" />}
            right={props => (
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                color="#14b8a6"
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Analytics"
            description="Help improve the app by sending anonymous usage data"
            left={props => <List.Icon {...props} icon="chart-bar" />}
            right={props => (
              <Switch
                value={analyticsEnabled}
                onValueChange={setAnalyticsEnabled}
                color="#14b8a6"
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Personalization"
            description="Allow app to customize your experience based on your activity"
            left={props => <List.Icon {...props} icon="tune" />}
            right={props => (
              <Switch
                value={personalizationEnabled}
                onValueChange={setPersonalizationEnabled}
                color="#14b8a6"
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Third-Party Sharing"
            description="Share your data with trusted partners for marketing purposes"
            left={props => <List.Icon {...props} icon="share-variant" />}
            right={props => (
              <Switch
                value={thirdPartyEnabled}
                onValueChange={setThirdPartyEnabled}
                color="#14b8a6"
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>
          
          <List.Item
            title="Download Your Data"
            description="Get a copy of all data associated with your account"
            left={props => <List.Icon {...props} icon="download" />}
            onPress={() => {}}
          />
          <Divider />
          
          <List.Item
            title="Delete Your Data"
            description="Permanently remove all your data from our servers"
            left={props => <List.Icon {...props} icon="delete" />}
            onPress={() => {}}
          />
        </View>

        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          Save Changes
        </Button>
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
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 16,
    color: '#000',
  },
  saveButton: {
    margin: 16,
    backgroundColor: '#14b8a6',
  },
})

export default PrivacySettingsScreen