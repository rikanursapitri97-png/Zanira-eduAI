exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Gunakan metode POST." }) };
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 503, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "OPENAI_API_KEY belum dipasang di Netlify: Site configuration → Environment variables." }) };
  }
  try {
    const data = JSON.parse(event.body || "{}");
    if (!data.topic || !data.age) {
      return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Topik dan target usia wajib diisi." }) };
    }
    const system = "Kamu adalah Zanira EduAI, asisten perancang media pembelajaran. Jawab dalam bahasa Indonesia. Buat hasil yang konkret, terstruktur, sesuai usia, ramah anak, dan bisa langsung dipakai. Pastikan akurasi materi. Untuk kuis, sertakan kunci dan umpan balik. Jangan mengklaim kepatuhan kurikulum secara pasti jika detailnya tidak tersedia.";
    const user = `Buat rancangan media edukasi berdasarkan data berikut dalam bentuk hasil yang lengkap dan praktis.\\n${JSON.stringify(data, null, 2)}\\n\\nBerikan judul, ringkasan konsep, tujuan, alur/struktur per halaman sesuai jumlah yang dipilih, isi tiap bagian, ide visual, navigasi/interaksi jika relevan, dan kuis beserta jawaban serta umpan balik jika dipilih. Jangan menghilangkan bagian pilihan pengguna.`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        messages: [{ role: "system", content: system }, { role: "user", content: user }],
        temperature: 0.7
      })
    });
    const result = await response.json();
    if (!response.ok) {
      const msg = result && result.error && result.error.message ? result.error.message : "Permintaan AI gagal.";
      return { statusCode: response.status === 401 ? 502 : 502, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Layanan AI menolak permintaan: " + msg }) };
    }
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    if (!content) throw new Error("Respons AI kosong.");
    return { statusCode: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify({ result: content }) };
  } catch (error) {
    return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: error.message || "Terjadi kesalahan pada fungsi AI." }) };
  }
};
