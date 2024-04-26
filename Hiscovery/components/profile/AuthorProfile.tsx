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
import { Icon } from 'react-native-elements';
import { COLORS, FONT, SIZES } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '../../lib/supabase';
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
interface AuthorProfileProps {
    id: number;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ id }) => {
    const [authorData, setAuthorData] = useState<AuthorData | null>(null);
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [readerId, setReaderId] = useState(0)

    const fetchData = async () => {
        let { data, error } = await supabase
            .rpc('get_author_profile_data', {
                author_id: id,
                reader_id: readerId
            })
        if (error) console.error(error)
        else {
            console.log(data[0])
            setAuthorData(data[0])
        }

        const fetchedAuthorData: AuthorData = {
            id: 1,
            name: "John Doe",
            username: "john_doe",
            image_url: "https://th.bing.com/th/id/OIP.wdeyBuzZAOn1Y-AUExfH6wAAAA?rs=1&pid=ImgDetMain",
            biography: "I'm a passionate writer exploring various topics. I'm a passionate writer exploring various topics. I'm a passionate writer exploring various topics. I'm a passionate writer exploring various topics.",
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
                image_url: "https://th.bing.com/th/id/OIP.wdeyBuzZAOn1Y-AUExfH6wAAAA?rs=1&pid=ImgDetMain",
                is_bookmarked: true
            },
            {
                id: 2,
                name: "The Art of Writing Clean Code",
                description: "Discover best practices for writing clean and maintainable code.",
                category_name: "Programming",
                author_name: "John Doe",
                publish_time: "2023-07-15T09:30:00Z",
                image_url: "https://th.bing.com/th/id/OIP.wdeyBuzZAOn1Y-AUExfH6wAAAA?rs=1&pid=ImgDetMain",
                is_bookmarked: false
            }
            // Add more articles as needed
        ];

        // setAuthorData(fetchedAuthorData);
        setArticles(fetchedArticles);
    };

    const follow = () => {
        // Handle follow functionality here
    };

    const getId = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        let { data, error } = await supabase
            .rpc('get_id_by_email', {
                p_email: user.email
            })
        if (error) console.error(error)
        else setReaderId(data);
    }

    useEffect(() => {
        fetchData();
        getId()
    }, []);

    if (!authorData) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Image
                    style={styles.avatar}
                    source={{ uri: authorData.image_url }}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{authorData.name}</Text>
                    <TouchableOpacity onPress={follow}>
                        <Icon
                            name={authorData.followed ? 'star' : 'star-o'}
                            type='font-awesome'
                            color={authorData.followed ? COLORS.darkRed : COLORS.gray2}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.username}>{authorData.username}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Followers: {authorData.number_of_followers} - </Text>
                    <Text style={styles.info}>Articles: {authorData.number_of_articles}</Text>
                </View>
                <Text style={styles.joinDate}>Since {authorData.join_date.toString()}</Text>
                <Text style={styles.biography}>{authorData.biography}</Text>
                <BigArticleList articles={articles} />
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 20,
        alignSelf: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    name: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        marginRight: 20
    },
    username: {
        textAlign: 'center',
        // marginTop: 0,
        fontSize: SIZES.medium
    },
    infoContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    info: {
        textAlign: 'center',
        fontSize: SIZES.medium
    },
    joinDate: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: SIZES.medium,
        fontStyle: 'italic', // Add this line for italics
        color: COLORS.gray2, // Add this line for gray color
    },
    biography: {
        textAlign: 'justify',
        margin: 20,
        fontSize: SIZES.medium
    }
});

export default AuthorProfile;