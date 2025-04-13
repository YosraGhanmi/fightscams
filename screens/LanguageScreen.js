import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text, Appbar, RadioButton, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const LanguageScreen = () => {
  const navigation = useNavigation()
  const [selectedLanguage, setSelectedLanguage] = useState('english')

  const languages = [
    { id: 'english', name: 'English', native: 'English' },
    { id: 'spanish', name: 'Spanish', native: 'Español' },
    { id: 'french', name: 'French', native: 'Français' },
    { id: 'german', name: 'German', native: 'Deutsch' },
    { id: 'chinese', name: 'Chinese', native: '中文' },
    { id: 'japanese', name: 'Japanese', native: '日本語' },
    { id: 'korean', name: 'Korean', native: '한국어' },
    { id: 'arabic', name: 'Arabic', native: 'العربية' },
    { id: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { id: 'portuguese', name: 'Portuguese', native: 'Português' },
  ]

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Language" />
        <Appbar.Action icon="check" onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <ScrollView>
        <Text style={styles.description}>
          Select your preferred language for the app interface
        </Text>

        <View style={styles.languageList}>
          <RadioButton.Group
            onValueChange={value => setSelectedLanguage(value)}
            value={selectedLanguage}
          >
            {languages.map((language, index) => (
              <React.Fragment key={language.id}>
                <View style={styles.languageItem}>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageNative}>{language.native}</Text>
                  </View>
                  <RadioButton value={language.id} />
                </View>
                {index < languages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </RadioButton.Group>
        </View>

        <Text style={styles.note}>
          Note: Changing the language will restart the app
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
  languageList: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    color: '#000',
  },
  languageNative: {
    fontSize: 14,
    color: '#666',
  },
  note: {
    padding: 16,
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})

export default LanguageScreen