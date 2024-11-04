require('dotenv').config();

const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

// Client ID dan Secret dari file .env
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Middleware untuk melayani file statis dari root folder
app.use(express.static("."));

// Endpoint untuk mendapatkan token akses dari Spotify API
app.get("/get-token", async (req, res) => {
  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials",
  };

  try {
    const response = await axios(authOptions);
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Error:", error); // Log error untuk debugging
    res.status(500).json({ error: "Gagal mendapatkan token akses" });
  }
});

// Route utama untuk melayani file index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Jalankan server di port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
