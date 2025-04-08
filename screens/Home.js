import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Fight Online Shopping Scams</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Facebook or Instagram pages"
          placeholderTextColor="#777"
        />
      </View>
      
      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryItem}>
          
          <Text style={styles.categoryText}>Clothes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.categoryItem}>
          
          <Text style={styles.categoryText}>Furniture</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.categoryItem}>
          
          <Text style={styles.categoryText}>Gadgets</Text>
        </TouchableOpacity>
      </View>
      
      {/* Popular Pages Section */}
      <Text style={styles.sectionTitle}>Popular Pages</Text>
      
      {/* Page Card - Style Haven */}
      <View style={styles.pageCard}>
        <View style={styles.pageHeader}>
          
          <View style={styles.pageInfo}>
            <Text style={styles.pageName}>Style Haven</Text>
            <View style={styles.ratingContainer}>
             
              <Text style={styles.reviewsText}>4120 reviews</Text>
            </View>
          </View>
        </View>
        <Text style={styles.reviewComment}>Great service and quality products!</Text>
        
      </View>
      
      {/* Page Card - Urban Living */}
      <View style={styles.pageCard}>
        <View style={styles.pageHeader}>
        
          <View style={styles.pageInfo}>
            <Text style={styles.pageName}>Urban Living</Text>
            <View style={styles.ratingContainer}>
              
              <Text style={styles.reviewsText}>995 reviews</Text>
            </View>
          </View>
        </View>
        <Text style={styles.reviewComment}>Delivered a different item, beware.</Text>
       
      </View>
      
      {/* Page Card - Trendy Closet */}
      <View style={styles.pageCard}>
        <View style={styles.pageHeader}>
          
          <View style={styles.pageInfo}>
            <Text style={styles.pageName}>Trendy Closet</Text>
            <View style={styles.ratingContainer}>
              
              <Text style={styles.reviewsText}>4150 reviews</Text>
            </View>
          </View>
        </View>
        <Text style={styles.reviewComment}>Reliable seller. Fast delivery.</Text>
      </View>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
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
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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