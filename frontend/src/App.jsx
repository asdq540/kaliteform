import React, { useState } from "react";

export default function App() {
  const [index, setIndex] = useState(1);

  const yeniSatir = () => setIndex((prev) => prev + 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const aciklamalar = [];
    for (let i = 0; i < index; i++) {
      const aciklama = formData.get(`aciklama${i}`);
      const personel = formData.get(`personel${i}`);
      if (aciklama || personel) aciklamalar.push({ aciklama, personel });
    }
    formData.append("aciklamalar", JSON.stringify(aciklamalar));

    const res = await fetch("/api/kaydet", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    alert(data.mesaj || data.hata);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Vardiya Formu</h1>
      <form id="vardiyaForm" onSubmit={handleSubmit}>
        <input type="date" name="tarih" required />
        <select name="vardiya">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select name="hat">
          <option value="R1">R1</option>
          <option value="R2">R2</option>
          <option value="R3">R3</option>
        </select>

        {[...Array(index)].map((_, i) => (
          <div key={i}>
            <input type="text" placeholder="Açıklama" name={`aciklama${i}`} />
            <input type="text" placeholder="Personel" name={`personel${i}`} />
          </div>
        ))}

        <button type="button" onClick={yeniSatir}>
          + Satır Ekle
        </button>
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
