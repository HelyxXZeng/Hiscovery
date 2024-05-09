import * as React from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SIZES, FONT, COLORS, PADDING } from "../../constants/index";
import { useRouter } from "expo-router";
import Article from "../../app/article/Article";

// Define an interface for the Supabase data
export interface ArticleData {
  id: number;
  name: string;
  description: string;
  category_name: string;
  author_name: string;
  publish_time: string;
  image_url: string;
  is_bookmarked: boolean;
}

// Modify ArticleCard component to accept props based on ArticleData interface
const ArticleCard: React.FC<{ data: ArticleData }> = ({ data }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/article/" + data.id);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.news}>
        <View style={styles.Tags}>
          <Text style={styles.heading}>{data.name}</Text>
          <Text
            style={[styles.summary, styles.summarySpaceBlock]}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {data.description}
          </Text>
        </View>
        <View style={styles.ImageParent}>
          <Image style={styles.ImageIcon} source={{ uri: data.image_url }} />
          <View style={[styles.frameParent, styles.parentFlexBox]}>
            <View style={[styles.TagNCParent, styles.parentFlexBox]}>
              <Text style={[styles.tag, styles.textTypo]}>
                {data.category_name}
              </Text>
              <Text style={[styles.tag]}>{data.author_name}</Text>
            </View>
            <View style={[styles.TagNCParent, styles.parentFlexBox]}>
              <View style={[styles.commentIconParent, styles.parentFlexBox]}>
                <Image
                  style={styles.commentIcon}
                  source={require("../../assets/icons/commentIcon.gif")}
                />
                <Text style={[styles.text, styles.textTypo]}>3</Text>
              </View>
              <Image
                style={styles.bookmarkIcon}
                source={
                  data.is_bookmarked
                    ? require("../../assets/icons/bookmark-filled-icon.png")
                    : require("../../assets/icons/bookmark-icon.png")
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  summarySpaceBlock: {
    marginTop: 10,
    alignSelf: "stretch",
    backgroundColor: "white",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    display: "flex",
    fontSize: SIZES.xSmall,
    fontFamily: FONT.tag,
    alignItems: "center",
  },
  heading: {
    fontSize: SIZES.large,
    fontFamily: FONT.heading,
    textAlign: "left",
    color: COLORS.colorBlack,
    alignSelf: "stretch",
  },
  summary: {
    fontSize: SIZES.medium,
    textAlign: "justify",
    fontFamily: FONT.tag,
    marginTop: 10,
    color: COLORS.colorBlack,
  },
  Tags: {
    alignSelf: "stretch",
  },
  ImageIcon: {
    flex: 1,
    borderRadius: 5,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    width: "100%",
    alignSelf: "stretch",
    resizeMode: "stretch",
  },
  tag: {
    fontSize: SIZES.xSmall,
    color: COLORS.textColor3,
    fontFamily: FONT.tag,
    textAlign: "left",
    marginRight: 10,
  },
  TagNCParent: {
    justifyContent: "center",
  },
  commentIcon: {
    width: 23,
    height: 23,
  },
  text: {
    color: COLORS.lightColor,
    textAlign: "center",
    width: 13,
    height: 13,
    justifyContent: "center",
  },
  commentIconParent: {
    width: 22,
    justifyContent: "center",
  },
  bookmarkIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  frameParent: {
    justifyContent: "space-between",
    paddingHorizontal: PADDING.p_3xs,
    paddingVertical: 0,
    marginTop: 10,
    alignSelf: "stretch",
  },
  ImageParent: {
    height: 221,
    marginTop: 5,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  separator: {
    borderStyle: "solid",
    borderColor: COLORS.colorWhitesmoke_100,
    borderTopWidth: 1,
    width: "100%",
    height: 1,
    marginTop: 10,
  },
  news: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default ArticleCard;
