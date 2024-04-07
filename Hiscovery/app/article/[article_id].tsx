import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import DocxReader from '../../lib/DocxReader';

import { COLORS } from '../../constants';
import CommentContainer from '../../components/comment/CommentContainer'; // Container for Comments

import { Stack, useRouter } from 'expo-router';
import Header from '../../components/header/Header';
import { useRoute } from '@react-navigation/native';

const Article = () => {
    const [docxUrl, setDocxUrl] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [showComments, setShowComments] = React.useState(false);
    const [userSessionID, setUserSessionID] = React.useState(null);

    const route = useRoute();
    const { article_id } = route.params //This has compile error but can run without problem

    React.useEffect(() => {
        // console.log('this is article_id', article_id)
        async function fetchDocxUrl() {
            try {
                // const { data: sessionData, error: sessionError } = await supabase.auth.refreshSession();
                // if (sessionError) {
                //     console.log(sessionError);
                //     setUserSessionID(0);
                //     // console.log('Came here 1')
                // }
                // if (sessionData && sessionData.user) {
                //     setUserSessionID(sessionData.user.email);
                //     // console.log('Came here 2', sessionData.user.email)
                // }

                const { data: article, error } = await supabase.rpc('get_article', { article_id: article_id });
                if (error || !article) {
                    throw error || new Error('Article not found.');
                }

                setTitle(article[0].name);
                setDescription(article[0].description);
                setDocxUrl(article[0].content_url);
            } catch (error) {
                console.error('Error fetching docx URL:', error);
            }
        }

        fetchDocxUrl();
    }, [article_id]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            {/* <Stack.Screen
                options={{
                    headerTitle: () => <Header title="Article" iconvisible={true} />,
                    headerTitleAlign: 'center',
                    headerBackVisible: false
                }} /> */}

            {docxUrl ? (
                <DocxReader docxUrl={docxUrl} />
                // <Text>{docxUrl}</Text>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </View>
            )}

            {showComments ? (
                <CommentContainer article_id={article_id} onClose={() => setShowComments(false)} />
            ) : (
                <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#f0f0f0',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 5,
                        }}
                        onPress={() => setShowComments(true)}>
                        <Image source={require('../../assets/icons/commentIcon.gif')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Article;