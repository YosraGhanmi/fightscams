import React, { useState, useEffect , useContext} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform, 
  Alert,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from "../context/AuthContext"
import * as ImagePicker from 'expo-image-picker';

export default function ShopDetailScreen({ route }) {
  const { pageId, pageName, rating: initialRating, reviewCount: initialReviewCount } = route.params;
  
  // State variables
  const [rating, setRating] = useState(initialRating);
  const [reviewCount, setReviewCount] = useState(initialReviewCount);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const { user, isGuest } = useContext(AuthContext)
  const [comments, setComments] = useState([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [replyImage, setReplyImage] = useState(null);
  
  // Mock logged in user - in a real app, this would come from authentication
  const loggedInUser = "Current User";

  // Sample comments - in a real app, fetch these from an API
  useEffect(() => {
    // Simulating API fetch
    const fetchedComments = [
      { 
        id: 1, 
        userName: 'Sarah J.', 
        rating: 5, 
        text: 'Excellent products! Fast shipping and the quality was better than expected.', 
        date: '2025-03-15',
        image: null,
        likes: 12,
        dislikes: 2,
        userReaction: null, // null, 'like', or 'dislike'
        replies: [
          { 
            id: 101, 
            userName: 'Sana', 
            text: 'yess i confirm', 
            date: '2025-03-16',
            image: null,
            likes: 3,
            dislikes: 0,
            userReaction: null
          }
        ]
      },
      { 
        id: 2, 
        userName: 'Mark T.', 
        rating: 4, 
        text: 'Good experience overall. The sizing was as described.', 
        date: '2025-03-10',
        image: null,
        likes: 5,
        dislikes: 1,
        userReaction: null,
        replies: []
      },
      { 
        id: 3, 
        userName: 'Lena R.', 
        rating: 2, 
        text: 'Items looked different from the pictures. Disappointed with the purchase.', 
        date: '2025-03-05',
        image: null,
        likes: 2,
        dislikes: 5,
        userReaction: null,
        replies: [
          { 
            id: 301, 
            userName: 'Angel', 
            text: 'same here the dress was awfull', 
            date: '2025-03-06',
            image: null,
            likes: 1,
            dislikes: 0,
            userReaction: null
          }
        ]
      },
      { 
        id: 4, 
        userName: 'Kevin W.', 
        rating: 5, 
        text: 'Amazing customer service! Had an issue with my order and they resolved it immediately.', 
        date: '2025-02-28',
        image: null,
        likes: 8,
        dislikes: 1,
        userReaction: null,
        replies: []
      },
    ];
    
    setComments(fetchedComments);
  }, [pageId]);

  // Request permission to access the image library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'We need camera roll permissions to upload photos.');
        }
      }
    })();
  }, []);

  // Pick an image from the gallery
  const pickImage = async (isReply = false) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (isReply) {
        setReplyImage(result.assets[0].uri);
      } else {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

  // Submit a new review
  const submitReview = () => {
    if (userRating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    
    if (commentText.trim() === '') {
      Alert.alert('Error', 'Please enter your comment');
      return;
    }
    
    const newComment = {
      id: comments.length + 1,
      userName: loggedInUser,
      rating: userRating,
      text: commentText,
      date: new Date().toISOString().split('T')[0],
      image: selectedImage,
      likes: 0,
      dislikes: 0,
      userReaction: null,
      replies: []
    };
    
    // Add new comment to top of list
    setComments([newComment, ...comments]);
    
    // Update overall rating (simplified calculation)
    const totalRatings = reviewCount + 1;
    const newRating = ((rating * reviewCount) + userRating) / totalRatings;
    setRating(parseFloat(newRating.toFixed(1)));
    setReviewCount(totalRatings);
    
    // Reset form
    setUserRating(0);
    setCommentText('');
    setSelectedImage(null);
    setIsAddingComment(false);
    
    Alert.alert('Success', 'Your review has been submitted. Thank you!');
  };

  // Submit a reply to a comment
  const submitReply = (commentId) => {
    if (replyText.trim() === '') {
      Alert.alert('Error', 'Please enter your reply');
      return;
    }
    
    const newReply = {
      id: Date.now(),
      userName: loggedInUser,
      text: replyText,
      date: new Date().toISOString().split('T')[0],
      image: replyImage,
      likes: 0,
      dislikes: 0,
      userReaction: null
    };
    
    // Add the reply to the corresponding comment
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    
    // Reset form
    setReplyText('');
    setReplyImage(null);
    setReplyingTo(null);
    
    Alert.alert('Success', 'Your reply has been submitted.');
  };

  // Handle reaction (like/dislike) for a comment
  const handleCommentReaction = (commentId, reactionType) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        // Get the current reaction
        const currentReaction = comment.userReaction;
        let likeDelta = 0;
        let dislikeDelta = 0;
        
        // Handle different cases for reaction changes
        if (currentReaction === null) {
          // No previous reaction, just add the new one
          if (reactionType === 'like') likeDelta = 1;
          else dislikeDelta = 1;
        } else if (currentReaction === reactionType) {
          // Same reaction, remove it (toggle off)
          if (reactionType === 'like') likeDelta = -1;
          else dislikeDelta = -1;
          reactionType = null;
        } else {
          // Different reaction, switch from one to another
          if (reactionType === 'like') {
            likeDelta = 1;
            dislikeDelta = -1;
          } else {
            likeDelta = -1;
            dislikeDelta = 1;
          }
        }
        
        return {
          ...comment,
          likes: comment.likes + likeDelta,
          dislikes: comment.dislikes + dislikeDelta,
          userReaction: reactionType
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  // Handle reaction (like/dislike) for a reply
  const handleReplyReaction = (commentId, replyId, reactionType) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            // Get the current reaction
            const currentReaction = reply.userReaction;
            let likeDelta = 0;
            let dislikeDelta = 0;
            
            // Handle different cases for reaction changes
            if (currentReaction === null) {
              // No previous reaction, just add the new one
              if (reactionType === 'like') likeDelta = 1;
              else dislikeDelta = 1;
            } else if (currentReaction === reactionType) {
              // Same reaction, remove it (toggle off)
              if (reactionType === 'like') likeDelta = -1;
              else dislikeDelta = -1;
              reactionType = null;
            } else {
              // Different reaction, switch from one to another
              if (reactionType === 'like') {
                likeDelta = 1;
                dislikeDelta = -1;
              } else {
                likeDelta = -1;
                dislikeDelta = 1;
              }
            }
            
            return {
              ...reply,
              likes: reply.likes + likeDelta,
              dislikes: reply.dislikes + dislikeDelta,
              userReaction: reactionType
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  // Render star rating with touch capability
  const renderRatingStars = (currentRating, interactive = false) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star}
            disabled={!interactive}
            onPress={() => interactive && setUserRating(star)}
          >
            <FontAwesome
              name={star <= (interactive ? userRating : currentRating) ? "star" : "star-o"}
              size={interactive ? 32 : 18}
              color="#FFD700"
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {/* Page Header with Rating */}
        <View style={styles.headerCard}>
          <View style={styles.pageInfo}>
            <View style={[styles.pageLogo, {backgroundColor: '#2563EB'}]}>
              <FontAwesome name="shopping-cart" size={28} color="#fff" />
            </View>
            <Text style={styles.pageName}>{pageName}</Text>
            <View style={styles.ratingContainer}>
              {renderRatingStars(rating)}
              <Text style={styles.ratingText}>{rating} ({reviewCount} reviews)</Text>
            </View>
          </View>
        </View>
        
        {/* Add Review Button */}
        {!isAddingComment ? (
          <TouchableOpacity 
            style={styles.addReviewButton}
            onPress={() => setIsAddingComment(true)}
          >
            <FontAwesome name="pencil" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.addReviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addReviewContainer}>
            <Text style={styles.addReviewTitle}>Write Your Review</Text>
            <Text style={styles.userNameDisplay}>Posting as: {loggedInUser}</Text>
            
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            {renderRatingStars(0, true)}
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience with this page..."
              multiline
              numberOfLines={4}
              value={commentText}
              onChangeText={setCommentText}
            />
            
            {/* Image attachment for review */}
            <View style={styles.imageAttachmentContainer}>
              <TouchableOpacity 
                style={styles.attachImageButton}
                onPress={() => pickImage(false)}
              >
                <FontAwesome name="camera" size={18} color="#2563EB" style={styles.buttonIcon} />
                <Text style={styles.attachImageText}>Attach Photo</Text>
              </TouchableOpacity>
              
              {selectedImage && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => setSelectedImage(null)}
                  >
                    <FontAwesome name="times-circle" size={22} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View style={styles.reviewButtonsContainer}>
              <TouchableOpacity 
                style={[styles.reviewButton, styles.cancelButton]}
                onPress={() => {
                  setIsAddingComment(false);
                  setSelectedImage(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.reviewButton, styles.submitButton]}
                onPress={submitReview}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Reviews Section */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Text style={styles.userName}>{comment.userName}</Text>
              <Text style={styles.commentDate}>{comment.date}</Text>
            </View>
            <View style={styles.commentRating}>
              {renderRatingStars(comment.rating)}
            </View>
            <Text style={styles.commentText}>{comment.text}</Text>
            
            {/* Comment image */}
            {comment.image && (
              <View style={styles.commentImageContainer}>
                <Image source={{ uri: comment.image }} style={styles.commentImage} />
              </View>
            )}
            
            {/* Like/Dislike buttons for comment */}
            <View style={styles.reactionContainer}>
              <View style={styles.reactionButtonGroup}>
                <TouchableOpacity 
                  style={[styles.reactionButton, comment.userReaction === 'like' && styles.activeReactionButton]}
                  onPress={() => handleCommentReaction(comment.id, 'like')}
                >
                  <FontAwesome 
                    name="thumbs-up" 
                    size={18} 
                    color={comment.userReaction === 'like' ? "#2563EB" : "#555"} 
                    style={styles.reactionIcon} 
                  />
                  <Text style={[styles.reactionText, comment.userReaction === 'like' && styles.activeReactionText]}>
                    {comment.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.reactionButton, comment.userReaction === 'dislike' && styles.activeReactionButton]}
                  onPress={() => handleCommentReaction(comment.id, 'dislike')}
                >
                  <FontAwesome 
                    name="thumbs-down" 
                    size={18} 
                    color={comment.userReaction === 'dislike' ? "#f44336" : "#555"} 
                    style={styles.reactionIcon} 
                  />
                  <Text style={[styles.reactionText, comment.userReaction === 'dislike' && styles.activeDislikeText]}>
                    {comment.dislikes}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {/* Reply counter */}
              <View style={styles.replyCountContainer}>
                <FontAwesome name="comment-o" size={16} color="#555" style={styles.replyCountIcon} />
                <Text style={styles.replyCountText}>
                  {comment.replies.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}
                </Text>
              </View>
            </View>
            
            {/* Replies section */}
            {comment.replies.length > 0 && (
              <View style={styles.repliesContainer}>
                <Text style={styles.repliesTitle}>Replies</Text>
                {comment.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyCard}>
                    <View style={styles.replyHeader}>
                      <Text style={styles.replyUserName}>{reply.userName}</Text>
                      <Text style={styles.replyDate}>{reply.date}</Text>
                    </View>
                    <Text style={styles.replyText}>{reply.text}</Text>
                    
                    {/* Reply image */}
                    {reply.image && (
                      <View style={styles.replyImageContainer}>
                        <Image source={{ uri: reply.image }} style={styles.replyImage} />
                      </View>
                    )}
                    
                    {/* Like/Dislike buttons for reply */}
                    <View style={styles.replyReactionContainer}>
                      <TouchableOpacity 
                        style={[styles.reactionButton, reply.userReaction === 'like' && styles.activeReactionButton]}
                        onPress={() => handleReplyReaction(comment.id, reply.id, 'like')}
                      >
                        <FontAwesome 
                          name="thumbs-up" 
                          size={16} 
                          color={reply.userReaction === 'like' ? "#2563EB" : "#555"} 
                          style={styles.reactionIcon} 
                        />
                        <Text style={[styles.replyReactionText, reply.userReaction === 'like' && styles.activeReactionText]}>
                          {reply.likes}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.reactionButton, reply.userReaction === 'dislike' && styles.activeReactionButton]}
                        onPress={() => handleReplyReaction(comment.id, reply.id, 'dislike')}
                      >
                        <FontAwesome 
                          name="thumbs-down" 
                          size={16} 
                          color={reply.userReaction === 'dislike' ? "#f44336" : "#555"} 
                          style={styles.reactionIcon} 
                        />
                        <Text style={[styles.replyReactionText, reply.userReaction === 'dislike' && styles.activeDislikeText]}>
                          {reply.dislikes}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* Reply button and form */}
            {replyingTo !== comment.id ? (
              <TouchableOpacity 
                style={styles.replyButton}
                onPress={() => {
                  setReplyingTo(comment.id);
                  setReplyText('');
                  setReplyImage(null);
                }}
              >
                <FontAwesome name="reply" size={16} color="#2563EB" style={styles.buttonIcon} />
                <Text style={styles.replyButtonText}>Reply</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.replyFormContainer}>
                <Text style={styles.userNameDisplay}>Replying as: {loggedInUser}</Text>
                <TextInput
                  style={styles.replyInput}
                  placeholder="Write your reply..."
                  multiline
                  numberOfLines={3}
                  value={replyText}
                  onChangeText={setReplyText}
                />
                
                {/* Image attachment for reply */}
                <View style={styles.imageAttachmentContainer}>
                  <TouchableOpacity 
                    style={styles.attachImageButton}
                    onPress={() => pickImage(true)}
                  >
                    <FontAwesome name="camera" size={16} color="#2563EB" style={styles.buttonIcon} />
                    <Text style={styles.attachImageText}>Attach Photo</Text>
                  </TouchableOpacity>
                  
                  {replyImage && (
                    <View style={styles.imagePreviewContainer}>
                      <Image source={{ uri: replyImage }} style={styles.imagePreview} />
                      <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => setReplyImage(null)}
                      >
                        <FontAwesome name="times-circle" size={22} color="#ff4444" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                
                <View style={styles.replyButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.replyActionButton, styles.cancelButton]}
                    onPress={() => {
                      setReplyingTo(null);
                      setReplyImage(null);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.replyActionButton, styles.submitButton]}
                    onPress={() => submitReply(comment.id)}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  addReviewButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addReviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  userNameDisplay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2563EB',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  commentInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: 16,
    marginBottom: 16,
  },
  imageAttachmentContainer: {
    marginBottom: 16,
  },
  attachImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  attachImageText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    marginTop: 8,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  reviewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#2563EB',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#000',
  },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  commentDate: {
    fontSize: 14,
    color: '#777',
  },
  commentRating: {
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  commentImageContainer: {
    marginVertical: 8,
  },
  commentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
  },
  reactionButtonGroup: {
    flexDirection: 'row',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 12,
  },
  activeReactionButton: {
    backgroundColor: '#f5f8ff',
    borderRadius: 6,
  },
  reactionIcon: {
    marginRight: 6,
  },
  reactionText: {
    fontSize: 14,
    color: '#555',
    minWidth: 20,
  },
  activeReactionText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  activeDislikeText: {
    color: '#f44336',
    fontWeight: '600',
  },
  replyCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyCountIcon: {
    marginRight: 6,
  },
  replyCountText: {
    fontSize: 14,
    color: '#555',
  },
  repliesContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  repliesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },replyCard: {
    backgroundColor: '#f5f8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  replyUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  replyDate: {
    fontSize: 12,
    color: '#777',
  },
  replyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  replyImageContainer: {
    marginVertical: 6,
  },
  replyImage: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  replyReactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  replyReactionText: {
    fontSize: 12,
    color: '#555',
    minWidth: 16,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 12,
  },
  replyButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },
  replyFormContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  replyInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  replyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  replyActionButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
  }
});