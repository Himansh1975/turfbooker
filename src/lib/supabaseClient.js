import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bcgkddaxadbyyokimufp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ2tkZGF4YWRieXlva2ltdWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDUyMjksImV4cCI6MjA0NjU4MTIyOX0.468JM__UmUt4_uDAkTjBv-0WwQe_j6y2c1ewXnJKYdU'

export const supabase = createClient(supabaseUrl, supabaseKey)