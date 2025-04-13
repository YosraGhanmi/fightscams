import React from 'react'
import { View, StyleSheet, ScrollView, Linking, Image } from 'react-native'
import { Text, Appbar, List, Divider, Button, Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const AboutScreen = () => {
  const navigation = useNavigation()

  const openWebsite = () => {
    Linking.openURL('https://trustchecktn.com')
  }

  const openTerms = () => {
    Linking.openURL('https://trustchecktn.com/terms')
  }

  const openPrivacyPolicy = () => {
    Linking.openURL('https://trustchecktn.com/privacy')
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="About TrustCheck TN" />
      </Appbar.Header>

      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://placehold.co/200x200/6200ee/ffffff?text=TC' }}
            style={styles.logo}
          />
          <Text style={styles.appName}>TrustCheck TN</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionText}>
              TrustCheck TN is dedicated to helping consumers make informed decisions by providing 
              transparent and reliable reviews of businesses in Tennessee. We believe in building 
              a community of trust where consumers can share their experiences and businesses can 
              showcase their commitment to customer satisfaction.
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.section}>
          <List.Item
            title="Visit Our Website"
            left={props => <List.Icon {...props} icon="web" />}
            onPress={openWebsite}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={openTerms}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={openPrivacyPolicy}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Development Team</Text>
          <List.Item
            title="Developper"
            description="Yosr Ghanmi"
            left={props => <List.Icon {...props} icon="account-supervisor" />}
          />
          <Divider />
          <List.Item
            title="Developper"
            description="Mihdi Ben Ameur"
            left={props => <List.Icon {...props} icon="account-supervisor" />}
          />
        </View>

        <Text style={styles.copyright}>
          © 2023 TrustCheck TN. All rights reserved.
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
  logoContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#000',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    margin: 16,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  missionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
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
  copyright: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginVertical: 24,
  },
})

export default AboutScreen