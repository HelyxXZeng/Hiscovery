import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LikeDislikeComponent from '../like-dislike/likedis';
//import ReportButton from './ReportButton'; // Import your ReportButton

const defaultAvatar = require('../../assets/icons/default_avatar_icon.png');

const Comment: React.FC = () => {
  let defaultText = "Hello. Đây là tin nhắn đầu tiên";
  const [commentText, setCommentText] = useState<string>(defaultText); // State for comment text
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined); // State for avatar URI
  // const { id } = useParams<{ id: string }>(); // Get the comment ID from URL parameters

  // Simulate fetching comment data from an API based on the comment ID
  // useEffect(() => {
  //   // Example fetch function to fetch comment data
  //   const fetchCommentData = async (commentId: string) => {
  //     try {
  //       // Make an API call to fetch comment data based on the comment ID
  //       const response = await fetch(`https://example.com/api/comments/${commentId}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setCommentText(data.text); // Set the comment text from the fetched data
  //         setAvatarUri(data.avatarUri); // Set the avatar URI from the fetched data
  //       } else {
  //         // Handle error
  //         console.error('Failed to fetch comment data:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching comment data:', error);
  //     }
  //   };

  //   // Call the fetchCommentData function with the comment ID
  //   fetchCommentData(id);
  // }, [id]); // Call useEffect whenever the comment ID changes

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={avatarUri ? { uri: avatarUri } : defaultAvatar} style={styles.avatar} />
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{commentText}</Text>
        <View style={styles.actionsContainer}>
          <LikeDislikeComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-end"
  },
});

export default Comment;