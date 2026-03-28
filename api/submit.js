import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { courses, first_name, last_name, email, phone, source } = req.body;

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    const { error } = await supabase.from("Registrations").insert([
      { courses, first_name, last_name, email, phone, source }
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Serverless error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
