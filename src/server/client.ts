import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://armmwvfspccdhqehvjrp.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
