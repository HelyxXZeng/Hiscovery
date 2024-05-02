import { useRoute } from "@react-navigation/native"
import AuthorProfile from "../../components/profile/AuthorProfile"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native"
import Header from "../../components/header/Header";
import { COLORS } from "../../constants"

const AuthorProfilePage = () => {

    const route = useRoute()
    const { author_id } = route.params //This has compile error but can run without problem

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <Stack.Screen
                options={{
                    headerTitle: () => <Header title="Author Profile" iconvisible={false} />,
                }} />
            <AuthorProfile id={author_id} />
        </SafeAreaView>
    )
}

export default AuthorProfilePage