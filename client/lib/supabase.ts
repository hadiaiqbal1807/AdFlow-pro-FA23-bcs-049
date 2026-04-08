import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl) {
  console.log("⚠️ Error: Supabase URL nahi mil raha. Apni .env.local file check karein.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)