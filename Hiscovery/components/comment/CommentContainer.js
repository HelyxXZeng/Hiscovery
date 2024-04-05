import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import Comment from './Comment'; // Import the Comment component
import { COLORS, icons } from '../../constants';
import { supabase } from '../../lib/supabase';

const CommentContainer = ({ article_id, user_id, onClose }) => {
  // Simulated comments data (replace this with your actual data fetching mechanism)
  const [newComment, setNewComment] = React.useState('');
  const [Comments, setComments] = React.useState([]);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleAddComment = async () => {
    // Implement logic to add new comment
    try {
      const { data: comment, error } = await supabase.rpc('add_comment', { article_id: article_id, this_user_id: user_id, content: newComment });

      if (error || !comment) {
        throw error || new Error('Article not found.');
      }
    } catch (error) {
      console.error('Error fetching docx URL:', error);
    }
    setNewComment('');
    setRefreshKey(prevKey => prevKey + 1);
    try {
      const { data: comments, error } = await supabase.rpc('get_comments', { article_id: article_id });

      if (error || !comments) {
        throw error || new Error('Comment not found.');
      }
      setComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  React.useEffect(() => {
    async function fetchDocxUrl() {
      try {
        const { data: comments, error } = await supabase.rpc('get_comments', { article_id: article_id });

        if (error || !comments) {
          throw error || new Error('Comment not found.');
        }
        setComments(comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }

    fetchDocxUrl();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: COLORS.primary }}>
        <View />
        <TouchableOpacity onPress={onClose}>
          <Image source={ icons.left } style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <ScrollView key={refreshKey} style={{ flex: 1, maxHeight: 400 }}>
        {Comments.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TextInput
          value={newComment}
          onChangeText={text => setNewComment(text)}
          placeholder="Add a comment..."
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}
        />

        <TouchableOpacity onPress={handleAddComment} style={{ marginLeft: 10 }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentContainer;