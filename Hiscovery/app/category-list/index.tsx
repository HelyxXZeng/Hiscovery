import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

// Replace with your actual category data and images
const categories = [
    { name: 'Category 1', image: 'https://s-media-cache-ak0.pinimg.com/564x/23/c9/5a/23c95aac9d860db1017cf220cfb48958.jpg' },
    { name: 'Category 2', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 3', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 4', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 5', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 6', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 7', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 8', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    { name: 'Category 9', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
    // Add more categories as needed
];

const moveToArticleListPage = () => {
    // This is an empty function. Implement navigation or other actions here.
};

const CategoryButton = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={moveToArticleListPage}>
        <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: item.image }} style={styles.image}>
                <View style={styles.overlay} />
                <Text style={styles.text}>{item.name}</Text>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);



export default function App() {
    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={CategoryButton}
                keyExtractor={(item) => item.name}
                numColumns={2}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 5
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
        backgroundColor: 'rgba(128, 128, 128, 0.7)',
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
