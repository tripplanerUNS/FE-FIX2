import React, { useState, useEffect } from "react";
import "./Detail1.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Detailpaket() {
  const { id } = useParams();
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/paket/budgett/${id}`
        );
        if (response.data.status === "success") {
          setPaket(response.data.data);
        } else {
          setError("Data not found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-detail-paket">
      <Navbar />
      {paket && (
        <>
          <img
            src={`http://localhost:8000/uploads/paket/${paket.image}`}
            alt="N"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              marginBottom: "20px",
              border: "2px solid #000", // Menambahkan border dengan warna abu-abu muda
              borderRadius: "5px", // Membuat sudut border menjadi sedikit melengkung
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Memberikan sedikit shadow untuk efek mendalam
            }}
          />

          <section className="package-info">
            <h1>{paket.nama_paket}</h1>
            <h2>{paket.kota}, Jawa Timur</h2>
            <p>{paket.deskripsi}</p>
          </section>
          <section className="details">
            <div className="flight-info">
              <h3>{paket.transportasi.nama_transportasi}</h3>
              <div className="flight-details">
                <p>Berangkat: {paket.transportasi.berangkat}</p>
                <p>Tujuan: {paket.transportasi.tujuan}</p>
                <p>
                  Harga: Rp. {Number(paket.transportasi.harga).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="hotel-info">
              <img
                src={`http://localhost:8000/${paket.hotel[0].images[0].image}`}
                alt="Room"
              />
              <div className="hotel-details">
                <h4>{paket.hotel[0].tipe_kamar}</h4>
                <p>
                  <span>Tanpa sarapan</span>
                </p>
                <p>
                  <span>Solo </span>
                  <a href={paket.hotel[0].alamat}>Lihat Lokasi</a>
                </p>
                <p>Rp. {Number(paket.hotel[0].harga).toLocaleString()}</p>
              </div>
            </div>
            <div className="address-info">
              <p>{paket.food.nama_kuliner}</p>
              <p>
                <a href={paket.food.alamat}>Lihat di Google Maps</a>
              </p>
              <p>Rating: {paket.food.rating}</p>
            </div>
          </section>
          <div className="footer">
            <div className="price-container">
              <p className="price">
                Harga Paket: Rp. {Number(paket.harga_paket).toLocaleString()}
              </p>
            </div>
            <div className="order-container">
              <Link to={`/Transaksi`}>Order</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Detailpaket;
