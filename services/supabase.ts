import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pijirdiqcvmfmhisumuw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpamlyZGlxY3ZtZm1oaXN1bXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5ODcyNDUsImV4cCI6MjA4MDU2MzI0NX0.6eJP7-9SwH-29kn20f2RqyMT36OnBWftMhcKcx9Hqo0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return true;
};
