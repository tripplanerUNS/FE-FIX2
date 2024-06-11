import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Detail.css";

function DetailTransport() {
  const [transportasi, setTransportasi] = useState(null);
  const { id_transportasi } = useParams(); // Get id from URL

  useEffect(() => {
    // Function to get transportation details from API
    const fetchTransportasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/transport/${id_transportasi}`
        ); // Use id from URL
        console.log("Response data:", response.data); // Add console.log here
        setTransportasi(response.data);
      } catch (error) {
        console.error("Error fetching transportasi data:", error);
      }
    };

    fetchTransportasiData();
  }, [id_transportasi]); // Run useEffect when id changes

  return (
    <div className="container">
      <Navbar />
      <div className="detail-transport">
        {transportasi ? (
          <div className="detail-card">
            <img src={transportasi.image} alt="Transport" className="image" />
            <h2>{transportasi.nama_transportasi}</h2>
            <div className="rating">
              <span>⭐⭐⭐⭐⭐</span>
              <p>Transportasi</p>
            </div>
            <div className="schedule">
              <div className="schedule-header">
                <span>{transportasi.nama_transportasi}</span>
                <div className="time">
                  <span>{transportasi.jam_keberangkatan}</span>
                  <span>→</span>
                  <span>{transportasi.jam_kedatangan}</span>
                </div>
              </div>
              <div className="schedule-details">
                <div className="schedule-item">
                  <span>{transportasi.berangkat}</span>
                  <span> - </span>
                  <span>{transportasi.tujuan}</span>
                </div>
                <div className="schedule-item">
                  <span>{transportasi.kelas}</span>
                  <span>{transportasi.harga}</span>
                  <span>{transportasi.lama_perjalanan}</span>
                </div>
              </div>
            </div>
            <button className="back-button">Back to Package</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailTransport;