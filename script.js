async function getToken() {
    try {
        const response = await fetch("/api/server");
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Gagal mendapatkan token akses:", error);
    }
}
