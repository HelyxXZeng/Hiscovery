import React, { useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { supabase } from "../../lib/supabase";
import DocxReader from "../../lib/DocxReader";
import { COLORS, FONT, SIZES, icons } from "../../constants";
import CommentContainer from "../../components/comment/CommentContainer";
import { Stack, useRouter } from "expo-router";
import Header from "../../components/header/Header";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import FeedbackPage from "../feedback";
import ReportPage from "../report";
import * as Speech from 'expo-speech';



const Article = () => {
    const [docxUrl, setDocxUrl] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [showComments, setShowComments] = React.useState("none");
    const [userSessionID, setUserSessionID] = React.useState(null);
    const [author, setAuthor] = React.useState("");
    const [authorId, setAuthorId] = React.useState(0);
    const [publishTime, setPublishTime] = React.useState(null);

    const route = useRoute();
    const router = useRouter();
    const { article_id } = route.params;

    const handleAuthorPress = async () => {
        router.push(`/author/${authorId}`);
    };

    const navigateReport = () => {
        console.log("Redirecting to report");
        router.push('/report/')
    }
    React.useEffect(() => {
        async function fetchDocxUrl() {
            try {
                const { data: article, error } = await supabase.rpc("get_article", {
                    article_id: article_id,
                });
                if (error || !article) {
                    throw error || new Error("Article not found.");
                }

                setTitle(article[0].name);
                setDescription(article[0].description);
                setDocxUrl(article[0].content_url);
            } catch (error) {
                console.error("Error fetching docx URL:", error);
            }
        }

        fetchDocxUrl();
        getArticleInfo();
    }, [article_id]);

    const getArticleInfo = async () => {
        try {
            const { data: infos, error } = await supabase.rpc("get_article_info", {
                article_id,
            });

            if (error || !infos) {
                throw error || new Error("Responses not found.");
            }
            setAuthor(infos[0].author_name);
            setAuthorId(infos[0].author_id);
            setPublishTime(new Date(infos[0].publish_time));
        } catch (error) {
            console.error("Error fetching responses:", error);
        }
    };

    const calculateTimeDifference = () => {
        if (!publishTime) return "";
        const currentTime = Date.now();
        const publishTimeMillis = publishTime.getTime();
        const difference = currentTime - publishTimeMillis;

        const minutes = Math.floor(difference / (1000 * 60));
        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        }

        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} day${days !== 1 ? "s" : ""} ago`;
        }

        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months} month${months !== 1 ? "s" : ""} ago`;
        }

        const years = Math.floor(months / 12);
        return `${years} year${years !== 1 ? "s" : ""} ago`;
    };

    useFocusEffect(
        React.useCallback(() => {
            // Screen is focused
            return () => {
                // Screen is unfocused
                Speech.stop();
            };
        }, [])
    );

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title='Article' iconvisible={false} />,
                    headerTitleAlign: "center",
                }} />
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    position: "relative",
                    height: "auto",
                    margin: 10
                }}
            >
                <Text onPress={handleAuthorPress} style={{ fontFamily: FONT.bold, fontSize: SIZES.large }}>Author: {author}</Text>
                <Text>Publish Time: {publishTime ? publishTime.toString() : ""}</Text>
                <Text>Time Difference: {calculateTimeDifference()}</Text>
            </View>
            {docxUrl ? (
                <DocxReader docxUrl={docxUrl} />
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <ActivityIndicator size="large" color={COLORS.darkRed} />
                </View>
            )}

            {showComments === "comment" && (
                <CommentContainer
                    article_id={article_id}
                    onClose={() => setShowComments("none")}
                />
            )}

            {showComments === "none" && (
                <View style={{ position: "absolute", bottom: 10, right: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#f0f0f0",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 5,
                            }}
                            onPress={navigateReport}
                        >
                            <icons.report fill={'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#f0f0f0",
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 5,
                            }}
                            onPress={() => setShowComments("comment")}
                        >
                            <Image
                                source={require("../../assets/icons/commentIcon.gif")}
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Article;
