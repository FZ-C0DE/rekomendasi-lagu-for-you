async function getToken() {
    try {
        const response = await fetch("http://localhost:3000/get-token");
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Gagal mendapatkan token akses:", error);
    }
}

async function findSong() {
    const loadingMessage = document.getElementById("loadingMessage");
    const result = document.getElementById("result");

    // Tampilkan pesan loading
    loadingMessage.style.display = "block";
    result.innerHTML = "";

    // Dapatkan token akses
    const token = await getToken();
    if (!token) {
        loadingMessage.style.display = "none";
        result.innerHTML = "<p>Gagal mendapatkan token akses.</p>";
        return;
    }

    // Daftar kata kunci untuk pencarian acak
    const keywords = ["pop", "rock", "jazz", "hits", "favorite", "dance", "classical"];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

    // Cari lagu menggunakan kata kunci acak dari daftar di atas
    const url = `https://api.spotify.com/v1/search?q=${randomKeyword}&type=track&limit=1`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        loadingMessage.style.display = "none";

        if (data.tracks.items.length > 0) {
            const track = data.tracks.items[0];
            const trackName = track.name;
            const artistName = track.artists[0].name;
            const trackId = track.id; // ID lagu untuk Spotify Embed

            // Tampilkan hasil dengan Spotify Embed
            result.innerHTML = `
                <div class="result-box">
                    <h2>Lagu untuk Anda: ${trackName}</h2>
                    <p>Artist: ${artistName}</p>
                    <iframe src="https://open.spotify.com/embed/track/${trackId}" 
                            width="300" 
                            height="80" 
                            frameborder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media">
                    </iframe>
                </div>
            `;
        } else {
            result.innerHTML = "<p>Maaf, tidak ada rekomendasi lagu untuk kata kunci ini.</p>";
        }
    } catch (error) {
        loadingMessage.style.display = "none";
        result.innerHTML = "<p>Terjadi kesalahan, silakan coba lagi.</p>";
        console.error("Error:", error);
    }
}
