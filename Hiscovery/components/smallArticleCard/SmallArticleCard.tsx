import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FONT, SIZES, COLORS } from "../../constants/index";

interface ArticleData {
    id: number;
    name: string;
    category_name: string;
    publish_time: string;
    image_url: string;
}

const ItemWatchLater = ({ article }: { article: ArticleData }) => {
    return (
      <View style={[styles.itemWatchLater, styles.itemWatchLaterLayout]}>
        <Image
          style={styles.itemWatchLaterChild}
          resizeMode="center"
          source={{ uri: article.image_url }}
        />
        <View style={styles.titleParent}>
          <Text style={styles.title}>{article.name}</Text>
          <Text style={styles.tagNTime}>{article.category_name} - {article.publish_time}</Text>
        </View>
        <View style={styles.itemWatchLaterItem} />
      </View>
    );
};
  

const styles = StyleSheet.create({
  itemWatchLaterLayout: {
    height: 90,
  },
  itemWatchLaterChild: {
    top: 1,
    left: 0,
    borderRadius: 5,
    width: 102,
    height: 91,
    position: "absolute",
  },
  title: {
    textAlign: "left",
    fontFamily: FONT.heading,
    fontSize: SIZES.medium,
    color: COLORS.textColor1,
    display: "flex",
    alignItems: "center",
    width: 195,
  },
  tagNTime: {
    fontSize: SIZES.small,
    color: COLORS.textColor3,
    textAlign:'left',
    fontFamily: FONT.tag,
  },
  titleParent: {
    top: 0,
    left: 130,
    justifyContent: "space-between",
    width: 195,
  },
  itemWatchLaterItem: {
    top: 104,
    left: -11,
    borderStyle: "solid",
    borderColor: COLORS.colorWhitesmoke_100,
    borderTopWidth: 1,
    height: 1,
    position: "absolute",
  },
  itemWatchLater: {
    top: 128,
    left: 17,
    width: 325,
  },
});

export default ItemWatchLater;
