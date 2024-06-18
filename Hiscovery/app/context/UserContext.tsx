import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';

type UserContextType = {
    userId: number | null;
    setUserId: React.Dispatch<React.SetStateAction<number | null>>;
    fetchUserId: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<number | null>(null);

    const fetchUserId = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase.rpc('get_id_by_email', { p_email: user.email });
                if (error) {
                    console.error(error);
                } else {
                    setUserId(data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchUserId();
    }, [fetchUserId]);

    return (
        <UserContext.Provider value={{ userId, setUserId, fetchUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
