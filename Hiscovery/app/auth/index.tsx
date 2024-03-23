import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, TouchableOpacity, Text } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { COLORS, SIZES, FONT } from '../../constants/theme'
import { Icon } from 'react-native-elements';


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

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [hidePassword, setHidePassword] = useState(true)

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

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
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.card, { marginTop: 50 }]}>
                <View style={[styles.verticallySpaced]}>
                    <TextInput
                        style={styles.fontSize}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        autoCapitalize={'none'}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.verticallySpaced}>
                    <View style={styles.oneRow}>
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
                </View>
            </View>
            <View style={styles.formCenter}>
                <Button buttonStyle={[styles.button, styles.mt20]} title="SIGN IN" disabled={loading} onPress={() => signInWithEmail()} />
                <Button buttonStyle={[styles.button, styles.mt20]} title="SIGN UP" disabled={loading} onPress={() => signUpWithEmail()} />
                <TouchableOpacity onPress={() => console.log('Forgot Password')}>
                    <Text style={[{ marginTop: 40 }, { fontSize: SIZES.large }, { color: COLORS.darkRed }, { fontFamily: FONT.bold }]}>Forget Password?</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
        flexDirection: 'row'
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
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
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