import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert, Image } from 'react-native'
import { Text, Appbar, TextInput, Button, Checkbox, RadioButton, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

const ReportProblemScreen = () => {
  const navigation = useNavigation()
  const [problemType, setProblemType] = useState('bug')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [attachScreenshot, setAttachScreenshot] = useState(false)
  const [screenshot, setScreenshot] = useState(null)
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.8,
    })

    if (!result.canceled) {
      setScreenshot(result.assets[0].uri)
    }
  }

  const handleSubmit = () => {
    if (!description) {
      Alert.alert('Error', 'Please describe the problem')
      return
    }

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      Alert.alert(
        'Thank You', 
        'Your report has been submitted. We appreciate your feedback!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      )
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Report a Problem" />
      </Appbar.Header>

      <ScrollView>
        <Text style={styles.description}>
          Help us improve TrustCheck TN by reporting any issues you encounter.
        </Text>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Problem Type</Text>
          
          <RadioButton.Group onValueChange={value => setProblemType(value)} value={problemType}>
            <View style={styles.radioItem}>
              <RadioButton value="bug" />
              <Text style={styles.radioLabel}>App Bug or Crash</Text>
            </View>
            <Divider />
            
            <View style={styles.radioItem}>
              <RadioButton value="ui" />
              <Text style={styles.radioLabel}>UI/UX Issue</Text>
            </View>
            <Divider />
            
            <View style={styles.radioItem}>
              <RadioButton value="performance" />
              <Text style={styles.radioLabel}>Performance Problem</Text>
            </View>
            <Divider />
            
            <View style={styles.radioItem}>
              <RadioButton value="content" />
              <Text style={styles.radioLabel}>Incorrect Content</Text>
            </View>
            <Divider />
            
            <View style={styles.radioItem}>
              <RadioButton value="other" />
              <Text style={styles.radioLabel}>Other Issue</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Problem Details</Text>
          
          <TextInput
            label="Describe the problem"
            value={description}
            onChangeText={setDescription}
            style={styles.descriptionInput}
            mode="outlined"
            multiline
            numberOfLines={6}
            placeholder="Please provide as much detail as possible about what happened and how to reproduce the issue"
          />
          
          <TextInput
            label="Your Email (optional)"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="We'll contact you if we need more information"
          />
          
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={attachScreenshot ? 'checked' : 'unchecked'}
              onPress={() => setAttachScreenshot(!attachScreenshot)}
            />
            <Text style={styles.checkboxLabel} onPress={() => setAttachScreenshot(!attachScreenshot)}>
              Attach a screenshot
            </Text>
          </View>
          
          {attachScreenshot && (
            <View style={styles.screenshotSection}>
              {screenshot ? (
                <View style={styles.screenshotPreview}>
                  <Image source={{ uri: screenshot }} style={styles.screenshotImage} />
                  <Button onPress={() => setScreenshot(null)} style={styles.removeButton}>
                    Remove
                  </Button>
                </View>
              ) : (
                <Button
                  mode="outlined"
                  onPress={pickImage}
                  style={styles.pickImageButton}
                  icon="camera"
                >
                  Select Screenshot
                </Button>
              )}
            </View>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          loading={loading}
          disabled={loading}
        >
          Submit Report
        </Button>

        <Text style={styles.note}>
          Your feedback helps us improve the app for everyone. Thank you!
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
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  input: {
    marginBottom: 16,
  },
  descriptionInput: {
    marginBottom: 16,
    height: 120,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  screenshotSection: {
    marginBottom: 16,
  },
  pickImageButton: {
    borderColor: '#14b8a6',
  },
  screenshotPreview: {
    alignItems: 'center',
  },
  screenshotImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
    borderRadius: 8,
  },
  removeButton: {
    marginTop: 8,
  },
  submitButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#14b8a6',
  },
  note: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
})

export default ReportProblemScreen