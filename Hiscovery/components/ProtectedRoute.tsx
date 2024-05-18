// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../app/context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { session } = useAuth();

    useEffect(() => {
        if (session === null) {
            router.push('/auth');
        }
    }, [session, router]);

    if (session === null) {
        return <Text>Redirecting to Sign In...</Text>;
    }

    return children;
};

export default ProtectedRoute;
