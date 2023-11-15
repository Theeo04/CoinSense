import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://phvxihhidlakjqacrzhe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodnhpaGhpZGxha2pxYWNyemhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MzcwNzgsImV4cCI6MjAxMjAxMzA3OH0.CvNZhhs-5TL7fp2-KHi8r716yKcnBrDnqwfNCt_V5dI";

export const supabase = createClient(supabaseUrl, supabaseKey);
