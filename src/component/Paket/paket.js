import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./paket.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function PaketWisata({ dari, destinasi, tanggal, bugdet }) {
  const [paketWisata, setPaketWisata] = useState([]);

  //read with axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/auth/paket/budget`,
          {
            dari: dari,
            tujuan: destinasi,
            tanggal_berangkat: tanggal,
            budget: bugdet,
          }
        );

        if (response.status === 200 && response.data.length > 0) {
          setPaketWisata(response.data);
          console.log(response);
        } else {
          // Menangani kasus jika tidak ada data yang diterima atau respons bukan 200
          console.log("Tidak ada data yang ditemukan");
        }
      } catch (error) {
        // Tangani error request
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dari, destinasi, tanggal, bugdet]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="content-paket">
        {paketWisata.map((paket) => (
          <div key={paket.id} className="paket">
            <div className="judul-paket">{paket.destinasi}</div>
            <div className="list-paket">
              <div className="wrap-list-paket">
                <div className="paketw">
                  <div className="gambar-paket">
                    <image src={paket.image} alt="Non image" />
                  </div>
                  <div className="infoPaket">
                    <p>{paket.nama_paket}</p>
                    <p>{paket.Tujuan}</p>
                    <p>{paket.Harga_paket}</p>
                  </div>
                  <div>
                    <button className="detailPaket">Lihat Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="filter">
        <div className="filterby">FilterBY</div>
        <div className="content-filter"></div>
      </div>
    </div>
  );
}

export default PaketWisata;
