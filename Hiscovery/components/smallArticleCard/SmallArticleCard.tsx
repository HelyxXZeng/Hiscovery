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
  const formatDate = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - dateTime.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInMonths = now.getMonth() - dateTime.getMonth() + (12 * (now.getFullYear() - dateTime.getFullYear()));

    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else if (diffInDays < 30) {
      return `${diffInDays} ngày trước`;
    } else {
      return `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`;
    }
  };

  return (  
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.itemWatchLaterLayout}>
        <Image
          style={styles.itemWatchLaterChild}
          resizeMode="cover"
          source={{ uri: article.image_url }}
        />
        <View style={styles.titleParent}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{article.name}</Text>
          <Text style={styles.tagNTime}>{article.category_name} - {formatDate(article.publish_time)}</Text>
        </View>
      </View>
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
      width: 130,
      height: 90,

    },
    title: {
      fontFamily: FONT.heading,
      fontSize: SIZES.medium18,
      color: COLORS.textColor1,
      width:250,
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
