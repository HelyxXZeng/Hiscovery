import * as React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { SIZES, FONT, COLORS, PADDING } from "../../constants/index";

const ArticleCard = () => {
  return (
    <View style={styles.news}>
      <View style={styles.Tags}>
        <Text style={styles.heading}>Diễn biến Thế chiến II</Text>
        <Text
          style={[styles.summary, styles.summarySpaceBlock]}
        >{`Chiến tranh thế giới thứ hai bùng nổ ở châu Âu, khi Đức xâm chiếm Ba Lan ngày 1/9/1939. Cuộc chiến lan rộng sang nhiều quốc gia và dân tộc trên toàn cựu lục địa. Khi thế chiến chấm dứt năm 1945, tổng cộng 27 triệu trong tổng số 110 triệu binh lính đã chết, khoảng 25 triệu thường dân thiệt mạng.`}
        </Text>
      </View>
      <View style={styles.ImageParent}>
        <Image
          style={styles.ImageIcon}
          source={{ uri: 'https://cdn.donmai.us/sample/a1/68/__acheron_honkai_and_1_more_drawn_by_gxws__sample-a1688a7878f6ee653f1c3c8c68048e8a.jpg' }}
        />
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={[styles.TagNCParent, styles.parentFlexBox]}>
            <Text style={[styles.tag, styles.textTypo]}>Thế chiến II</Text>
            <Text style={[styles.tag]}>
              Lịch sử Thế Giới
            </Text>
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
              source={require("../../assets/icons/bookmark-icon.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.newsChild} />
    </View>
  );
};

const styles = StyleSheet.create({
  summarySpaceBlock: {
    marginTop: 10,
    alignSelf: "stretch",
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
    fontWeight: "700",
    fontFamily: FONT.heading,
    textAlign: "left",
    color: COLORS.colorBlack,
    alignSelf: "stretch",
  },
  summary: {
    fontSize: SIZES.small,
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
  newsChild: {
    borderStyle: "solid",
    borderColor: COLORS.colorWhitesmoke_100,
    borderTopWidth: 1,
    width: 340,
    height: 1,
    marginTop: 5,
  },
  news: {
    paddingHorizontal: 10,
    paddingVertical: PADDING.p_8xs,
    alignItems: "center",
  },
});

export default ArticleCard;
