import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import Navbar from '../Navbar/Navbar';

const App = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error("There was an error fetching the hotel data!", error);
      }
    };

    fetchHotels();
  }, []);

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

    <div className="app">
      <h1>Detail</h1>
      <div className="hotel-gallery">
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-item">
            <div className='gambar-hotel'>
            {hotel.images.map((image, imgIndex) => (
              <img key={imgIndex} src={image} alt={`Hotel ${hotel.name}`} className="hotel-image" />
            ))}
            </div>
            <div className='deskripsi-hotel'>
            <h2>{hotel.name}</h2>
            <p>{hotel.address}</p>
            <p>{hotel.description}</p>
            <h3>Fasilitas Utama</h3>
            <ul>
              {hotel.mainFacilities.map((facility, idx) => (
                <li key={idx}>{facility}</li>
              ))}
            </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="app">
      <h1>Penerbangan yang Termasuk dalam Paket</h1>
      <div className="flight-list">
        {flights.map((flight, index) => (
          <div key={index} className="flight-item">
            <div className="flight-info">
              <div className="flight-header">
                <div className="airline">{flight.airline}</div>
                <div className="flight-times">
                  <div className="departure-time">{flight.departureTime} <span className="airport">{flight.from}</span></div>
                  <div className="arrival-time">{flight.arrivalTime} <span className="airport">{flight.to}</span></div>
                </div>
              </div>
              <div className="flight-details">
                <div className="price">Rp {flight.price.toLocaleString('id-ID')}/orang</div>
                <div className="package-price">Harga paket: Rp {flight.packagePrice.toLocaleString('id-ID')}</div>
                <div className="package-includes">{flight.packageIncludes}</div>
                <div className="travel-duration">{flight.travelDuration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      
    </div>
    </div>
  );
};

export default App;
