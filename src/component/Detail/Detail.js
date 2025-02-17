import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Detail.css";

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
              {/* Container untuk gambar hotel */}
              <div className="hotel-images-container">
                {images && images.length > 0 ? (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/${image.image}`}
                      alt={`${hotel && hotel.nama_hotel} Image ${index + 1}`}
                      className="hotel-image"
                    />
                  ))
                ) : (
                  <div className="no-image-container">
                    <p className="no-image-text">No Image Available</p>
                  </div>
                )}
              </div>

              {/* Container untuk nama hotel */}
              <div className="hotel-name-container">
                <h1 className="hotel-name">{hotel && hotel.nama_hotel}</h1>
              </div>

              {/* Container untuk deskripsi hotel */}
              <div className="hotel-description-container">
                <div className="hotel-description">{hotel && hotel.deskripsi}</div>
              </div>
              
              {/* Deskripsi tambahan */}
              <div className="additional-description">
                Surabaya adalah tempat indah.
              </div>

              {/* Detail hotel */}
              {hotel ? (
                <div key={hotel.id_hotels} className="destination-card">
                  <div className="card-content">
                    <div className="card-header">
                      {/* Container untuk gambar hotel */}
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
                          <div className="no-image-container">
                            <p className="no-image-text">No Image Available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card-title">
                        <h3 className="hotel-title">{hotel.nama_hotel}</h3>
                      </div>
                      <p>Harga per malam: Rp {hotel.harga}</p>
                      <span className="rating">
                        <p>Rating: {hotel.rating}</p>
                      </span>
                      <span className="description">
                        <p>Deskripsi: {hotel.deskripsi}</p>
                      </span>
                      <span className="room-type-facilities">
                        <p>Tipe Kamar: {hotel.tipe_kamar}</p>
                        <p>Fasilitas: {hotel.fasilitas}</p>
                      </span>
                      <span className="location-city">
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
     
    </div>
  );
}

export default Detail;
