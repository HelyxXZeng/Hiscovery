import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LikeDislikeComponent from '../like-dislike/Likedis';
import { supabase } from '../../lib/supabase';
//import ReportButton from './ReportButton'; // Import your ReportButton

const defaultAvatar = require('../../assets/icons/default_avatar_icon.png');
interface CommentProps {
  data: {
    id: number;
    avatar_url: string;
    time: string; // Assuming you're handling the timestamp as a string
    comment_content: string;
    username: string;
  };
  article_id: number;
}

const Comment: React.FC<CommentProps> = ({ data, article_id }) => {
  const defaultText = "Hello. Đây là tin nhắn đầu tiên";
  const [responses, setResponses] = React.useState([]);
  const [isRoot, setisRoot] = React.useState(false);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseText, setResponseText] = useState('');

  const { avatar_url: avatar, comment_content, username } = data;

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
    
    const getResponses = async () => {
      try {
        const { data: responses, error } = await supabase.rpc('get_responses', { article_id }).eq("parent_id", data.id);
  
        if (error || !responses) {
          throw error || new Error('Responses not found.');
        }
        setResponses(responses);
      } catch (error) {
        console.error('Error fetching responses:', error);
      }
    };

    const getCommentRoot = async () => {
      try {
        const { data: root, error } = await supabase.rpc('check_comment_root', { comment_id: data.id });
  
        if (error || !root) {
          throw error || new Error('No root found.');
        }
        setisRoot(root);
      } catch (error) {
        console.error('Error fetching root: ', error);
      }
    }

    const handleResponsePress = () => {
      setShowResponseInput(prevState => !prevState);
    };

    const handleSend = async () => {
      try {
        const { data: comment, error } = await supabase.rpc('add_response', { article_id: article_id, this_user_id: 2, content: responseText, parent_id: data.id });
  
        if (error || !comment) {
          throw error || new Error('Article not found.');
        }
      } catch (error) {
        console.error('Error fetching docx URL:', error);
      }
      setResponseText('');
      setShowResponseInput(false);
      getResponses();
    };

    React.useEffect(() => {
      getResponses();
      getCommentRoot();
    }, [article_id]);

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={avatar ? { uri: avatar } : defaultAvatar} style={styles.avatar} />
        </View>
        <View style={styles.commentContainer}>

          <Text style={styles.userName}>{username || "Anonymous"}</Text>

          <Text style={styles.commentText}>{comment_content || defaultText}</Text>
          <View style={isRoot ? styles.actionsContainer : styles.actionsContainer2 }>
            {isRoot && (
              <Text style={styles.responseButton} onPress={handleResponsePress}>Response</Text>
            )}
            <LikeDislikeComponent comment_id={data.id}/>
          </View>

          {showResponseInput && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type your comment..."
                value={responseText}
                onChangeText={setResponseText}
              />
              <TouchableOpacity style={styles.sendResponseButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          )}

          {responses.map(response => (
            <View key={response.id} style={styles.nestedCommentContainer}>
              <Comment data={response} article_id={article_id} />
            </View>
          ))}
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
      justifyContent: "space-between",
    },
    actionsContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-end",
    },
    nestedCommentContainer: {
      paddingLeft: 0, // Adjust the padding as needed
    },
    userName: {
      fontSize: 12,
      marginBottom: 5,
    },
    responseButton: {
      backgroundColor: 'transparent',
      color: 'black',
      padding: 5,
    },
    inputContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    sendResponseButton: {
      backgroundColor: 'blue',
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    sendButtonText: {
      color: 'white',
    }
  });
  
  export default Comment;
