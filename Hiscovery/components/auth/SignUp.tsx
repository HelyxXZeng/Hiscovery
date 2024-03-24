import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, TouchableOpacity, Text, Platform, ScrollView } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { COLORS, SIZES, FONT } from '../../constants/theme'
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function SignIn({ switchToSignIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState(new Date())
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')

    const [loading, setLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, always show DatePicker inline
        setBirthdate(currentDate);
    };

    const formattedDate = birthdate.toLocaleDateString();

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        else {
            let { data, error } = await supabase
                .rpc('register_user', {
                    p_birthdate: birthdate,
                    p_email: email,
                    p_join_date: new Date(),
                    p_name: name,
                    p_password: password,
                    p_phone: phone,
                    p_username: username
                })
            if (error) console.error(error)
            else console.log(data)

        }
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.card, styles.fontSize]}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    autoCapitalize={'none'}
                />

                <TextInput
                    style={[styles.card, styles.fontSize, styles.mt20]}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    placeholder="Full Name"
                    autoCapitalize={'words'}
                />


                <TextInput
                    style={[styles.card, styles.fontSize, styles.mt20]}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    placeholder="Username"
                    autoCapitalize={'none'}
                />

                <View style={[styles.card, styles.oneRow]}>
                    <View style={{ flex: 1 }}>
                        <Text>Birth Date</Text>
                        <TextInput
                            style={[styles.fontSize, styles.mt20,]}
                            value={formattedDate}
                            placeholder="Select Date"
                            editable={false} // Make the TextInput non-editable
                        />
                    </View>

                    <Button
                        onPress={() => { setShowDatePicker(true) }}
                        title="📅"
                    />
                </View>


                {showDatePicker && (
                    <DateTimePicker
                        value={birthdate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <TextInput
                    style={[styles.card, styles.fontSize, styles.mt20]}
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    placeholder="Phone"
                    autoCapitalize={'none'}
                />

                <View style={[styles.card, styles.oneRow]}>
                    <TextInput
                        style={[styles.fontSize, { flex: 1 }]} // Add flex: 1 here
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={hidePassword} // This will hide the password when hidePassword is true
                        placeholder="Password"
                        autoCapitalize={'none'}
                    />
                    <Icon
                        style={{ alignSelf: 'center' }} // Change 'flex-end' to 'center'
                        name={hidePassword ? 'eye-slash' : 'eye'}
                        type='font-awesome'
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                </View>

                <View style={styles.formCenter}>
                    <Text style={styles.mt20}>Already have an Account?
                        <TouchableOpacity disabled={loading} onPress={switchToSignIn}>
                            <Text style={[{ color: COLORS.darkRed }, { fontFamily: FONT.bold }]}>  Sign In now!</Text>
                        </TouchableOpacity>
                    </Text>
                    <Button buttonStyle={[styles.button, styles.mt20]} title="SIGN UP" disabled={loading} onPress={() => signUpWithEmail()} />
                </View>

            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        padding: 12,
        flex: 1,
        backgroundColor: COLORS.primary
    },
    card: {
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 20,
        borderColor: COLORS.gray2,
        borderWidth: 1
    },
    oneRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontSize: {
        fontSize: 18
    },
    formCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    mt20: {
        marginTop: 20,
    },
    button: {
        backgroundColor: COLORS.darkRed,
        borderRadius: 20,
        width: 328,
        height: 56
    }
})