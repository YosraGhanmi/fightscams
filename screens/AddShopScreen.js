"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Text, TextInput, Button, Appbar, HelperText, Chip, RadioButton } from "react-native-paper"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import * as ImagePicker from "expo-image-picker"
import { useNavigation, CommonActions } from "@react-navigation/native"

const CATEGORIES = [
  "Clothing",
  "Electronics",
  "Beauty",
  "Home Goods",
  "Footwear",
  "Accessories",
  "Food",
  "Toys",
  "Books",
  "Other",
]

// Import the default shop image
const defaultShopImage = require('../assets/defaultshop.jpg')

const AddShopScreen = () => {
  const [shopName, setShopName] = useState("")
  const [shopImage, setShopImage] = useState(null)
  const [shopCategory, setShopCategory] = useState("")
  const [shopLink, setShopLink] = useState("")
  const [platformType, setPlatformType] = useState("facebook")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const navigation = useNavigation()

  const validateForm = () => {
    const newErrors = {}

    if (!shopName.trim()) {
      newErrors.shopName = "Shop name is required"
    }

    if (!shopLink.trim()) {
      newErrors.shopLink = "Shop link is required"
    } else if (platformType === "facebook" && !shopLink.includes("facebook.com")) {
      newErrors.shopLink = "Please enter a valid Facebook link"
    } else if (platformType === "instagram" && !shopLink.includes("instagram.com")) {
      newErrors.shopLink = "Please enter a valid Instagram link"
    } else if (platformType === "website" && !shopLink.includes(".")) {
      newErrors.shopLink = "Please enter a valid website URL"
    }

    if (!shopCategory) {
      newErrors.shopCategory = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setShopImage(result.assets[0].uri)
    }
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Generate a unique ID for the new shop (in a real app, this would be from the server)
    const newShopId = `shop_${Date.now()}`
    
    // Navigate to the ShopDetailScreen with the shop details
    setTimeout(() => {
      setIsSubmitting(false)
      
      // Navigate to nested stack navigator screen
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Home',
          params: {
            screen: 'ShopDetail',
            params: {
              pageId: newShopId,
              pageName: shopName,
              rating: 0, // New shop has 0 rating
              reviewCount: 0, // New shop has 0 reviews
              image: shopImage ? { uri: shopImage } : defaultShopImage, // Use the default image if none was selected
              description: description,
              category: shopCategory,
              link: shopLink,
              platform: platformType
            }
          }
        })
      )
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Add New Shop" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Shop Information</Text>
        <Text style={styles.sectionSubtitle}>Help the community by adding a new online shop to review</Text>

        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            {shopImage ? (
              <Image source={{ uri: shopImage }} style={styles.shopImagePreview} />
            ) : (
              <>
                <FontAwesome name="camera" size={32} color="black" />
                <Text style={styles.imagePickerText}>Add Shop Logo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Shop Name *"
            value={shopName}
            onChangeText={setShopName}
            style={styles.input}
            error={!!errors.shopName}
            
          />
          {errors.shopName && <HelperText type="error">{errors.shopName}</HelperText>}
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.inputLabel}>Category *</Text>
          <View style={styles.chipContainer}>
            {CATEGORIES.map((category) => (
              <Chip
                key={category}
                selected={shopCategory === category}
                onPress={() => setShopCategory(category)}
                style={[styles.categoryChip, shopCategory === category && styles.selectedCategoryChip]}
                textStyle={shopCategory === category ? styles.selectedChipText : { color: "black" }}
              >
                {category}
              </Chip>
            ))}
          </View>
          {errors.shopCategory && <HelperText type="error">{errors.shopCategory}</HelperText>}
        </View>

        <View style={styles.platformContainer}>
          <Text style={styles.inputLabel}>Platform Type *</Text>
          <RadioButton.Group onValueChange={(value) => setPlatformType(value)} value={platformType}>
            <View style={styles.radioRow}>
              <View style={styles.radioItem}>
                <RadioButton value="facebook" color="#14b8a6" />
                <Text style={{ color: "black" }}>Facebook</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="instagram" color="#14b8a6" />
                <Text style={{ color: "black" }}>Instagram</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="website" color="#14b8a6" />
                <Text style={{ color: "black" }}>Website</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label={`${platformType.charAt(0).toUpperCase() + platformType.slice(1)} Link *`}
            value={shopLink}
            onChangeText={setShopLink}
            style={styles.input}
            placeholder={`Enter the ${platformType} link`}
            error={!!errors.shopLink}
          />
          {errors.shopLink && <HelperText type="error">{errors.shopLink}</HelperText>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
            numberOfLines={4}
            placeholder="Tell us about this shop..."
          />
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Add Shop
        </Button>

        <Text style={styles.disclaimer}>
          By adding this shop, you confirm that this is a legitimate online seller and the information provided is
          accurate to the best of your knowledge.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#14b8a6",
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "black",
    marginBottom: 24,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shopImagePreview: {
    width: "100%",
    height: "100%",
  },
  imagePickerText: {
    marginTop: 8,
    color: "black",
  },
  inputContainer: {
    marginBottom: 16,
    
  },
  input: {
    color : "black",
    backgroundColor: "#fff",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: "black",
  },
  categoryContainer: {
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    
  },
  categoryChip: {
    margin: 4,
    backgroundColor: "#fff",
  },
  selectedCategoryChip: {
    backgroundColor: "#14b8a6",
  },
  selectedChipText: {
    color: "#fff",
  },
  platformContainer: {
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "33%",
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#14b8a6",
    paddingVertical: 8,
  },
  submitButtonLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginBottom: 24,
  },
})

export default AddShopScreen