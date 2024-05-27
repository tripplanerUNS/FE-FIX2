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
    // Fungsi untuk mendapatkan data detail transportasi dari API
    const fetchTransportasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/transport/${id_transportasi}`
        ); // Menggunakan id dari URL
        console.log("Response data:", response.data); // Tambahkan console.log di sini
        setTransportasi(response.data);
      } catch (error) {
        console.error("Error fetching transportasi data:", error);
      }
    };

    fetchTransportasiData();
  }, [id_transportasi]); // Menjalankan useEffect ketika id berubah

  return (
    <div>
      <Navbar />

      <div className="aon-destination-detail-wrap p-t110 aon-bg-white">
        <div className="container">
          <div className="aon-destination-detail-content">
            <div className="destination-head">
              {transportasi ? (
                <div
                  key={transportasi.id_transportasi}
                  className="destination-card"
                >
                  <div className="card-content">
                    <div className="card-header">
                      <img src={transportasi.image} alt={`Icon`} />
                    </div>
                    <div className="card-body">
                      <div className="card-Judul">
                        <h3 className="Judul-hotelss">
                          {transportasi.nama_transportasi}
                        </h3>
                      </div>
                      <span className="deskripsi">
                        <span className="row">
                        <p>Berangkat : {transportasi.berangkat}</p>
                        <p>Jam Keberangkatan : {transportasi.jam_keberangkatan}</p>
                        </span>

                        <span className="row">
                        <p>Tujuan : {transportasi.tujuan}</p>
                        <p>Jam Kedatangan : {transportasi.jam_kedatangan}</p>
                        </span>
                      </span>
                      <span className="htkf">
                        <p>Kelas : {transportasi.kelas}</p>
                        <p>Harga : Rp {transportasi.harga}</p>
                      </span>
                      <span className="alamat-kota">
                        <span className="row">
                        <p>{transportasi.kota}</p>
                        <p>{transportasi.lama_perjalanan}</p>
                        </span>
                      </span>
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
