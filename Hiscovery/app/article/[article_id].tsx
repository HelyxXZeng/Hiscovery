import React from "react";
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { supabase } from "../../lib/supabase";
import DocxReader from "../../lib/DocxReader";

import { COLORS } from "../../constants";
import CommentContainer from "../../components/comment/CommentContainer"; // Container for Comments

import { Stack, useRouter } from "expo-router";
import Header from "../../components/header/Header";
import { useRoute } from "@react-navigation/native";
import FeedbackPage from "../feedback";
import ReportPage from "../report";

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
    const { article_id } = route.params; //This has compile error but can run without problem

    const handleAuthorPress = async () => {
        console.log("Redirecting to author page");
        router.push(`/author/${authorId}`);
    };

    React.useEffect(() => {
        // console.log('this is article_id', article_id)
        async function fetchDocxUrl() {
            try {
                // const { data: sessionData, error: sessionError } = await supabase.auth.refreshSession();
                // if (sessionError) {
                //     console.log(sessionError);
                //     setUserSessionID(0);
                //     // console.log('Came here 1')
                // }
                // if (sessionData && sessionData.user) {
                //     setUserSessionID(sessionData.user.email);
                //     // console.log('Came here 2', sessionData.user.email)
                // }

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
        if (!publishTime) return ""; // If publishTime is not set yet, return empty string
        const currentTime = Date.now(); // Get current time in milliseconds
        const publishTimeMillis = publishTime.getTime(); // Get publish time in milliseconds
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "left",
                    position: "relative",
                    height: "auto",
                }}
            >
                <Text onPress={handleAuthorPress}>Author: {author}</Text>
                <Text>Publish Time: {publishTime ? publishTime.toString() : ""}</Text>
                <Text>Time Difference: {calculateTimeDifference()}</Text>
            </View>
            {docxUrl ? (
                <DocxReader docxUrl={docxUrl} />
            ) : (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text>Loading...</Text>
                </View>
            )}

            {showComments === "comment" && (
                <CommentContainer
                    article_id={article_id}
                    onClose={() => setShowComments("none")}
                />
            )}

            {showComments === "feedback" && (
                <FeedbackPage
                    onClose={() => setShowComments("none")}
                />
            )}

            {showComments === "report" && (
                <ReportPage
                    source_id={article_id}
                    onClose={() => setShowComments("none")}
                />
            )}

            {showComments === "none" && (
                <View style={{ position: "absolute", bottom: 20, right: 20 }}>
                    <View style={{ flexDirection: "row" }}>
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
        </SafeAreaView>
    );
};

export default Article;
