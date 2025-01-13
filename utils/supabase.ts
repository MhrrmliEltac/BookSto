import { createClient } from "@supabase/supabase-js";
const supabaseUrl: string = "https://zqahblzhgodzufusrbdn.supabase.co";
const supabaseKey: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYWhibHpoZ29kenVmdXNyYmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NDU0OTUsImV4cCI6MjA1MTMyMTQ5NX0.caXdvnSLanZNKaE9J9zH9cPG2wzibJmOOstbOK8DxyA";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const addDataBooks = async () => {
  const { data, error } = await supabase.from("books").insert([
    {
      title: "salam",
      author: "123",
      description: "asdasdasd",
      price: 12,
      photo_url: "asdasd",
      rating: 4.8,
      category: "asdasdsa",
    },
  ]);
  console.log(data);
  console.log(error);
};

export const getDataBooks = async () => {
  const result = await supabase.from("books").select("*");
  try {
    console.log(result.data);
  } catch {
    console.log(result.error);
  }
};
