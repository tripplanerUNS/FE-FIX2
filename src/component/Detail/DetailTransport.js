import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function DetailTransport() {
  const [transportasi, setTransportasi] = useState(null);
  const { id_transportasi } = useParams(); // Mengambil id dari URL

  useEffect(() => {
    // Fungsi untuk mendapatkan data detail hotel dari API
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/transport/${id_transportasi}`
        ); // Menggunakan id dari URL
        console.log("Response data:", response.data); // Tambahkan console.log di sini
        setTransportasi(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [id_transportasi]); // Menjalankan useEffect ketika id berubah

  return (
    <div>
      <Navbar />

      <div className="aon-destination-detail-wrap p-t110 aon-bg-white">
        <div className="container">
          <div className="aon-destination-detail-content">
            <div className="destination-head">
              {transportasi ? (
                <div key={transportasi.id_transportasi} className="destination-card">
                  <div className="card-content">
                    <div className="card-header">
                      <img
                        src={transportasi.image}
                        alt={`Icon pesawat`}
                      />
                    </div>
                    <div className="card-body">
                      <h3>{transportasi.nama_transportasi}</h3>
                      <p> {transportasi.jenis_transportasi}</p>
                      <p> {transportasi.berangkat}</p>
                      <p> {transportasi.tujuan}</p>
                      <p> {transportasi.harga}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailTransport;
