import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { supabase } from '../lib/supabase';
import DocxReader from '../lib/DocxReader'; 
import { COLORS } from '../constants';// Path to your DocxReader component

const Article = ( {id} ) => {
  const [docxUrl, setDocxUrl] = React.useState('');

  React.useEffect(() => {
    async function fetchDocxUrl() {
      try {
        const { data: article, error } = await supabase
          .from('Article')
          .select('content_url')
          .eq('id', id)
          .single();

        if (error || !article) {
          throw error || new Error('Article not found.');
        }

        setDocxUrl(article.content_url);
      } catch (error) {
        console.error('Error fetching docx URL:', error);
      }
    }

    fetchDocxUrl();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {docxUrl ? (
        <DocxReader docxUrl={docxUrl} />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default Article;