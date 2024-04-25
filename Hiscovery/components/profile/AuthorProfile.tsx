// avatar
// name
// username
// number of followers - number of articles
// button follow - button report (not need)
// biography
// join_date
// rank

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BigArticleList from '../article-list/BigArticleList';
import { ArticleData } from '../articleCard/ArticleCard'

interface AuthorData {
    id: number;
    name: string;
    username: string;
    image_url: string;
    biography: string;
    join_date: Date;
    followed: boolean;
    number_of_followers: number;
    number_of_articles: number;
}

const AuthorProfile: React.FC = () => {
    const [authorData, setAuthorData] = useState<AuthorData | null>(null);
    const [articles, setArticles] = useState<ArticleData[]>([]);

    const fetchData = async () => {
        // Fetch author data and articles here
        // This is just a placeholder
        const fetchedAuthorData: AuthorData = {
            id: 1,
            name: "John Doe",
            username: "john_doe",
            image_url: "https://example.com/john_doe.jpg",
            biography: "I'm a passionate writer exploring various topics.",
            join_date: new Date("2023-05-10"),
            followed: false,
            number_of_followers: 500,
            number_of_articles: 10
        };
        const fetchedArticles: ArticleData[] = [
            {
                id: 1,
                name: "Introduction to React Hooks",
                description: "Learn how to use React Hooks for state management.",
                category_name: "Technology",
                author_name: "John Doe",
                publish_time: "2023-06-20T10:00:00Z",
                image_url: "https://example.com/react_hooks.jpg",
                is_bookmarked: false
            },
            {
                id: 2,
                name: "The Art of Writing Clean Code",
                description: "Discover best practices for writing clean and maintainable code.",
                category_name: "Programming",
                author_name: "John Doe",
                publish_time: "2023-07-15T09:30:00Z",
                image_url: "https://example.com/clean_code.jpg",
                is_bookmarked: false
            }
            // Add more articles as needed
        ];

        setAuthorData(fetchedAuthorData);
        setArticles(fetchedArticles);
    };

    const follow = () => {
        // Handle follow functionality here
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!authorData) return <Text>Loading...</Text>;

    return (
        <View>
            <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={{ uri: authorData.image_url }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{authorData.name}</Text>
            <Text style={{ textAlign: 'center' }}>{authorData.username}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '50%' }}>{authorData.number_of_followers}</Text>
                <Text style={{ width: '50%' }}>{authorData.number_of_articles}</Text>
            </View>
            <Text>Since {authorData.join_date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={follow}>
                <Image
                    source={authorData.followed ? require('../../assets/icons/star-filled.png') : require('../../assets/icons/star.png')}
                />
            </TouchableOpacity>
            <Text style={{ textAlign: 'justify' }}>{authorData.biography}</Text>
            <BigArticleList articles={articles} />
        </View>
    );
};

export default AuthorProfile;
