import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import PrivacyPolicyAndTosData from './../../privacyandpolicy.json';

// PrivacyPolicyAndTos Component
const PrivacyPolicyAndTos = () => {
    const handleBack = () => {
        // Handle back button press here
        // For example, navigate back to the previous screen
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.heading}>Privacy Policy</Text>
                    {Object.keys(PrivacyPolicyAndTosData.chinh_sach_bao_mat).map((key) => {
                        const section = PrivacyPolicyAndTosData.chinh_sach_bao_mat[key];
                        return (
                            <View key={key}>
                                <Text style={styles.subHeading}>{section.tieude}</Text>
                                {Object.keys(section).map((subKey) => {
                                    if (subKey !== 'tieude') {
                                        return <Text style={styles.content} key={subKey}>{section[subKey]}</Text>;
                                    }
                                    return null;
                                })}
                            </View>
                        );
                    })}
                </View>

                <View>
                    <Text style={styles.heading}>Terms of Service</Text>
                    {Object.keys(PrivacyPolicyAndTosData.dieu_khoan_su_dung).map((key) => {
                        const section = PrivacyPolicyAndTosData.dieu_khoan_su_dung[key];
                        return (
                            <View key={key}>
                                <Text style={styles.subHeading}>{section.tieude}</Text>
                                {Object.keys(section).map((subKey) => {
                                    if (subKey !== 'tieude') {
                                        return <Text style={styles.content} key={subKey}>{section[subKey]}</Text>;
                                    }
                                    return null;
                                })}
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        margin: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 15,
    },
    content: {
        fontSize: 13,
        marginBottom: 10,
        marginLeft: 20,
    },
});

export default PrivacyPolicyAndTos;
