import { Alert, Button, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'
import { useState } from 'react';

export default function ResetPassword() {
    const route = useRoute();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function handleResetPassword() {
        if (password !== passwordConfirmation) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            Alert.alert('Error resetting password', error.message);
        } else {
            Alert.alert('Success', 'Your password has been updated');
        }
    }

    return (
        <View>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="New Password"
                secureTextEntry
            />
            <TextInput
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                placeholder="Confirm New Password"
                secureTextEntry
            />
            <Button title="Submit" onPress={handleResetPassword} />
        </View>
    );
}
