import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./paket.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";

function PaketWisata({
  dari,
  destinasi,
  tanggal,
  bugdet,
  berangkat,
  jumlah,
  id_hotels,
}) {
  const [paketWisata, setPaketWisata] = useState([]);
  const navigate = useNavigate();

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
            jumlah_hari: jumlah,
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
  }, [dari, destinasi, tanggal, bugdet, jumlah]);

  // const handleFilterClick = () => {
  //console.log("Filter button clicked");
  //};

  const handleSubmit = async () => {
    navigate("/Detailpaket");
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="rowPaket">
        <div className="content-paket">
          {paketWisata.map((paket) => (
            <div className="paket">
              <div className="judul-paket">{paket.nama_paket}</div>
              <div className="list-paket">
                <div className="wrap-list-paket">
                  <div className="paketw">
                    <div className="row">
                      <div className="hotel">
                        <div>
                          {" "}
                          <FaHotel /> Hotel{" "}
                        </div>
                        <div className="row">
                          <div className="gambar-paket">
                            <img
                              src={`http://localhost:8000/uploads/paket/${paket.image}`}
                              alt="N"
                            />
                          </div>
                          <div className="infoPaket">
                            <Link to={`/Detail/${paket.id_hotels}`}>
                              <p className="Hotelss">{paket.Hotel}</p>
                            </Link>
                            <p>{paket.Food}</p>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div>
                          {" "}
                          <FaPlane /> Transportasi{" "}
                        </div>
                        <div className="transportasi">
                          <p>{paket.jenis_transportasi}</p>
                          <p>tanggal keberangkatan {tanggal} </p>
                          <Link to={`/Detailtransport/${paket.id_transportasi}`}>
                            <p>{paket.Transportasi}</p>
                          </Link>
                        </div>
                      </div>
                      <div className="paket-container">
                        <p>{paket.Harga_paket}</p>
                        <p className="pp">pesawat+hotel</p>
                        <button className="Detailpaket">
      <Link to={`/Detailpaket/${paket.id}`}>
        Detail Paket
      </Link>
    </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaketWisata;
