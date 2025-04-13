"use client"
import { Appbar } from "react-native-paper"
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// ✅ Import the image directly
import defaultShopImage from '../assets/defaultshop.jpg';

export default function HomeScreen({navigation}) {

  const [categories, setCategories] = useState([
    { id: 1, name: 'Clothing' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Gadgets' },
    { id: 4, name: 'Electronics' },
    { id: 5, name: 'Beauty' }
  ]);

  const [popularPages, setPopularPages] = useState([
    { 
      id: 1, 
      name: 'Style Haven', 
      reviewCount: 4120, 
      reviewComment: 'Great service and quality products!',
      rating: 4.5,
      image: defaultShopImage
    },
    { 
      id: 2, 
      name: 'Urban Living', 
      reviewCount: 995, 
      reviewComment: 'Delivered a different item, beware.',
      rating: 2.3,
      image: defaultShopImage
    },
    { 
      id: 3, 
      name: 'Trendy Closet', 
      reviewCount: 4150, 
      reviewComment: 'Reliable seller. Fast delivery.',
      rating: 4.8,
      image: defaultShopImage
    },
    { 
      id: 4, 
      name: 'Tech Galaxy', 
      reviewCount: 2210, 
      reviewComment: 'Good products but slow shipping.',
      rating: 3.7,
      image: defaultShopImage
    }
  ]);

  const renderStars = (rating) => {
    const starCount = 5;
    const filledStars = Math.floor(rating);
    
    return (
      <View style={styles.starsContainer}>
        {[...Array(starCount)].map((_, index) => (
          <FontAwesome
            key={index}
            name={index < filledStars ? "star" : "star-o"}
            size={16}
            color="#FFD700"
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
     <View style={styles.containerr}>
      <Appbar.Header style={styles.headerr}>
        <Appbar.Content title="Safer Online Shopping " />
      </Appbar.Header>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Facebook or Instagram pages"
          placeholderTextColor="#777"
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScrollView}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.iconContainer}>
              <FontAwesome name="tag" size={24} color="#14b8a6" />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Popular Pages</Text>
      {popularPages.map((page) => (
        <TouchableOpacity 
          key={page.id} 
          style={styles.pageCard}
          onPress={() => navigation.navigate('ShopDetail', {
            pageId: page.id,
            pageName: page.name,
            rating: page.rating,
            reviewCount: page.reviewCount,
            image: page.image
          })}
        >
          <View style={styles.pageHeader}>
            <View style={styles.pageLogo}>
              <Image 
                source={page.image} 
                style={styles.pageLogoImage} 
              />
            </View>
            <View style={styles.pageInfo}>
              <Text style={styles.pageName}>{page.name}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(page.rating)}
                <Text style={styles.reviewsText}>{page.reviewCount} reviews</Text>
              </View>
            </View>
          </View>
          <Text style={styles.reviewComment}>{page.reviewComment}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#000',
  }, container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerr: {
    backgroundColor: "#14b8a6",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginTop : 20,
    marginBottom: 24,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  categoriesScrollView: {
    paddingBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  pageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden', // Ensure image doesn't overflow the circular container
    backgroundColor: '#f1f1f1', // Fallback background color
  },
  pageLogoImage: {
    width: 48,
    height: 48,
    resizeMode: 'cover', // This will cover the entire area
  },
  pageInfo: {
    flex: 1,
  },
  pageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  },
  reviewComment: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  productImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  blueButton: {
    backgroundColor: '#2563EB',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  blueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});