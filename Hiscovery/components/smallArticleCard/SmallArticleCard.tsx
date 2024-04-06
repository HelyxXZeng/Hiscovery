import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FONT, SIZES, COLORS } from "../../constants/index";
import { useRouter } from 'expo-router';

interface ArticleData {
    id: number;
    name: string;
    category_name: string;
    publish_time: string;
    image_url: string;
}

const ItemWatchLater = ({ article }: { article: ArticleData }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push('../../app/home');
  };
    return (  
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.itemWatchLater, styles.itemWatchLaterLayout]}>
          <Image
            style={styles.itemWatchLaterChild}
            resizeMode="cover"
            source={{ uri: article.image_url }}
          />
          <View style={styles.titleParent}>
            <Text style={styles.title}>{article.name}</Text>
            <Text style={styles.tagNTime}>{article.category_name} - {article.publish_time}</Text>
          </View>
          <View style={styles.itemWatchLaterItem} />
        </View>
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
    itemWatchLaterLayout: {
      height: 90,
    },
    itemWatchLaterChild: {
      borderRadius: 5,
      width: 102,
      height: 91,
    },
    title: {
      fontFamily: FONT.heading,
      fontSize: SIZES.medium,
      color: COLORS.textColor1,
    },
    tagNTime: {
      fontSize: SIZES.small,
      color: COLORS.textColor3,
      fontFamily: FONT.tag,
    },
    titleParent: {
      marginLeft: 10,
      justifyContent: "space-between",
      flex: 1,
    },
    itemWatchLaterItem: {
      marginTop: 10,
      borderStyle: "solid",
      borderColor: COLORS.colorWhitesmoke_100,
      borderTopWidth: 1,
      height: 1,
    },
    itemWatchLater: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      width: "100%",
    },
});
    

export default ItemWatchLater;
