import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
// import ArticleCard, { ArticleData } from '../articleCard/ArticleCard';
import ItemWatchLater, { ArticleData } from '../articleCard/SmallArticleCard'
import { COLORS, SIZES } from '../../constants/theme';

interface SmallArticleListProps {
    articles: ArticleData[];
}

const SmallArticleList: React.FC<SmallArticleListProps> = ({ articles }) => {
    const renderItem = ({ item }: { item: ArticleData }) => (
        <>
            <ItemWatchLater article={item} />
            {/* <View style={styles.separator} /> */}
        </>

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default SmallArticleList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: "white"
    },
    button: {
        width: '47%',
        aspectRatio: 1,
        margin: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.38)',
    },
    imageContainer: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: SIZES.large
    }
});