document.getElementById('vardiyaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await fetch('/api/kaydet', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('sonuc').innerText = result.mesaj || result.hata;
});
