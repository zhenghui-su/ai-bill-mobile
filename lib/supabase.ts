import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://trwolnfkglncdhbocivg.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd29sbmZrZ2xuY2RoYm9jaXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNTA3MzAsImV4cCI6MjA2ODcyNjczMH0.SF7oS2Ih-U47YdKoRkOI3MNyCAjLosMJ2Zkqzn89Omw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
