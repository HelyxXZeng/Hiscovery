import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONT, SIZES, COLORS, PADDING } from "../../constants/index";
import { useRouter } from 'expo-router';


export interface ArticleData {
    id: number;
    name: string;
    category_name: string;
    publish_time: string;
    image_url: string;
    description: string;
}

const ItemWatchLater = ({ article }: { article: ArticleData }) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push('/article/' + article.id)
  }
    return (  
      <TouchableOpacity onPress={handlePress}>
        <View style={ styles.itemWatchLaterLayout}>
          <Image
            style={styles.itemWatchLaterChild}
            resizeMode="cover"
            source={{ uri: article.image_url }}
          />
          <View style={styles.titleParent}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{article.name}</Text>
            <Text style={styles.tagNTime}>{article.category_name} - {article.publish_time}</Text>
          </View>
          
        </View>
        {/* <View style={styles.itemWatchLaterItem} /> */}
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
    itemWatchLaterLayout: {
      height: 100,
      flex: 1,
      flexDirection: "row",
      paddingBottom: 10,
      paddingHorizontal: 15,
      marginTop: 12,
    },
    itemWatchLaterChild: {
      borderRadius: 5,
      width: 135,
      height: 90,

    },
    title: {
      fontFamily: FONT.heading,
      fontSize: SIZES.medium18,
      color: COLORS.textColor1,
    },
    tagNTime: {
      fontSize: SIZES.small,
      color: COLORS.textColor3,
      fontFamily: FONT.tag,
      marginTop: 'auto',
    },
    titleParent: {
      marginLeft: 10,
    },
    itemWatchLaterItem: {
      marginTop: 10,
      borderStyle: "solid",
      borderColor: COLORS.colorWhitesmoke_100,
      borderTopWidth: 1,
      height: 1,
    }
});

export default ItemWatchLater;
