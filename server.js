const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Client ID dan Secret dari Spotify API
const client_id = "98e14b7394344007be6b1c8e067a2f9d";
const client_secret = "6e61596b01774725a12b8d5d468a6064";

// Middleware untuk melayani file statis dari folder "public"
app.use(express.static("public"));

// Endpoint untuk mendapatkan token akses dari Spotify API
app.get("/get-token", async (req, res) => {
  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials",
  };

  try {
    const response = await axios(authOptions);
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan token akses" });
  }
});

// Jalankan server di port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
