import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Detail() {
  const [hotel, setHotel] = useState(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id_hotels } = useParams(); // Mengambil id dari URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fungsi untuk mendapatkan data detail hotel dari API
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/hotels/${id_hotels}/images`
        ); // Menggunakan id dari URL
        console.log("Response data:", response.data); // Tambahkan console.log di sini
        setHotel(response.data.data.hotel); // Mengatur state hotel dengan data hotel
        setImages(response.data.data.images); // Mengatur state images dengan data gambar
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [id_hotels]); // Menjalankan useEffect ketika id berubah

  const handleBackClick = () => {
    navigate("/PaketWisata"); // Menggunakan navigate untuk berpindah halaman
  };

  return (
    <div>
      <Navbar />

      <div
        className={`aon-destination-detail-wrap p-t110 aon-bg-white ${
          loaded ? "loaded" : ""
        }`}
      >
        <div className="container">
          <div className="aon-destination-detail-content">
            <div className="destination-head">
              {hotel ? (
                <div key={hotel.id_hotels} className="destination-card">
                  <div className="card-content">
                    <div className="card-header">
                      <div className="hotel-images-container">
                        {images && images.length > 0 ? (
                          images.map((image, index) => (
                            <img
                              key={index}
                              src={`http://localhost:8000/${image.image}`}
                              alt={`${hotel.nama_hotel} Image ${index + 1}`}
                              className="hotel-image"
                            />
                          ))
                        ) : (
                          <p>No Image Available</p>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-Judul">
                        <h3 className="Judul-hotelss">{hotel.nama_hotel}</h3>
                      </div>
                      <p>Harga per malam: Rp {hotel.harga}</p>
                      <span className="ratinggg">
                        <p>Rating: {hotel.rating}</p>
                      </span>
                      <span className="deskripsiii">
                        <p>Deskripsi: {hotel.deskripsi}</p>
                      </span>
                      <span className="htkf">
                        <p>Tipe Kamar: {hotel.tipe_kamar}</p>
                        <p>Fasilitas: {hotel.fasilitas}</p>
                      </span>
                      <span className="alamat-kota">
                        <p>
                          {hotel.kota}{" "}
                          <a
                            href={hotel.alamat}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lihat di Google Maps
                          </a>
                        </p>
                      </span>
                      <button type="button" onClick={handleBackClick}>
                        Kembali ke Halaman Paket
                      </button>
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
