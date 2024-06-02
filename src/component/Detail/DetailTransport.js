import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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
                        <div className="row">
                          <p>Berangkat: {transportasi.berangkat}</p>
                          <p>Jam Keberangkatan: {transportasi.jam_keberangkatan}</p>
                        </div>

                        <div className="row">
                          <p>Tujuan: {transportasi.tujuan}</p>
                          <p>Jam Kedatangan: {transportasi.jam_kedatangan}</p>
                        </div>
                      </span>
                      <div className="htkf">
                        <p>Kelas: {transportasi.kelas}</p>
                        <p>Harga: Rp {transportasi.harga}</p>
                      </div>
                      <div className="alamat-kota">
                        <div className="row">
                          <p>{transportasi.kota}</p>
                          <p>{transportasi.lama_perjalanan}</p>
                        </div>
                      </div>
                      <div className="flight-actions">
                        <button className="add-to-cart">Tambah ke keranjang</button>
                        <button className="select">Pilih</button>
                      </div>
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
