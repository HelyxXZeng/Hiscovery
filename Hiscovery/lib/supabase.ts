import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://stdhckynjwfydcbwzgnm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZGhja3luandmeWRjYnd6Z25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2MTQzMDMsImV4cCI6MjAyNTE5MDMwM30.a_UHFcoEDQ9ZnBZYQ2tM_b8y-kl38-UPytHL0TwsL8M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})