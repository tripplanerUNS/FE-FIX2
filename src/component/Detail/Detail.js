import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Detail() {
  const [hotel, setHotel] = useState(null);
  const { id_hotels } = useParams(); // Mengambil id dari URL

  useEffect(() => {
    // Fungsi untuk mendapatkan data detail hotel dari API
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/hotels/${id_hotels}`
        ); // Menggunakan id dari URL
        console.log("Response data:", response.data); // Tambahkan console.log di sini
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [id_hotels]); // Menjalankan useEffect ketika id berubah

  return (
    <div>
      <Navbar />

      <div className="aon-destination-detail-wrap p-t110 aon-bg-white">
        <div className="container">
          <div className="aon-destination-detail-content">
            <div className="destination-head">
              {hotel ? (
                <div key={hotel.id_hotels} className="destination-card">
                  <div className="card-content">
                    <div className="card-header">
                      <img
                        src={hotel.image}
                        alt={`${hotel.nama_hotel} Image`}
                      />
                    </div>
                    <div className="card-body">
                      <h3>{hotel.nama_hotel}</h3>
                      <p>Kota: {hotel.kota}</p>
                      <p>Alamat: {hotel.alamat}</p>
                      <p>Harga per malam: Rp {hotel.harga}</p>
                      <p>Rating: {hotel.rating}</p>
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

export default Detail;
