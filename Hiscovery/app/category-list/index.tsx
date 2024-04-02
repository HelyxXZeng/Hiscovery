import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { supabase } from '../../lib/supabase';

// Replace with your actual category data and images
// const categories = [
//     { name: 'Category 1', image: 'https://s-media-cache-ak0.pinimg.com/564x/23/c9/5a/23c95aac9d860db1017cf220cfb48958.jpg' },
//     { name: 'Category 2', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 3', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 4', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 5', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 6', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 7', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 8', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     { name: 'Category 9', image: 'https://external-preview.redd.it/K1kZb8iczswrNoSmVCBygCGSPiPIAoA9RcadLzRst0k.jpg?auto=webp&s=99c8c9ef0632f1d78199796cc2814614483e2942' },
//     // Add more categories as needed
// ];

const moveToArticleListPage = () => {
    // This is an empty function. Implement navigation or other actions here.
};

const CategoryButton = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={moveToArticleListPage}>
        <View style={styles.imageContainer}>
            <ImageBackground source={{ uri: item.image_url }} style={styles.image}>
                <View style={styles.overlay} />
                <Text style={styles.text}>{item.category_name}</Text>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);



export default function CategoryList() {
    const [categories, setCategories] = useState(null)
    useEffect(() => {
        const getData = async () => {
            let { data, error } = await supabase
                .rpc('get_category_list')
            if (error) console.error(error)
            else console.log(data)

            setCategories(data)
        }

        getData()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={CategoryButton}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: COLORS.primary
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
