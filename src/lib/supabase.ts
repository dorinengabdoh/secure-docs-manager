// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cirstzxrzqxlfluwqszx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcnN0enhyenF4bGZsdXdxc3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzODEyNTAsImV4cCI6MjA2Nzk1NzI1MH0.G0QKeC3fFQe9gqAdn-02mDu3vzbSMvrtywvN4U9XqdM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
