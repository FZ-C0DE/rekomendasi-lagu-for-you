require('dotenv').config();
const axios = require("axios");

module.exports = async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

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
    console.error("Error:", error);
    res.status(500).json({ error: "Gagal mendapatkan token akses" });
  }
};
