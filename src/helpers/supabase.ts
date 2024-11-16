import { createClient } from "@supabase/supabase-js"
import { type Database, type Tables } from "./supabase.types"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
export { type Database, type Tables }