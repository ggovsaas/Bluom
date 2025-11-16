// server/supabase/client.js
// Supabase client for server-side operations

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env');
}

// Create Supabase client with service role key for server-side operations
// This bypasses RLS policies - use only on the server
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client for user-authenticated requests (uses anon key, respects RLS)
export const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  }
);

export default supabase;

