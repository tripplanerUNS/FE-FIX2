import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./paket.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHotel } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaMoneyBill1Wave } from "react-icons/fa6";

function PaketWisata({ dari, destinasi, tanggal, bugdet, jumlah, jumlahKaryawan }) {
  const [paketWisata, setPaketWisata] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/auth/paket/budgett`,
          {
            dari: dari,
            tujuan: destinasi,
            tanggal_berangkat: tanggal,
            budget: bugdet,
            jumlah_hari: jumlah,
            jumlah_employee: jumlahKaryawan,
          }
        );

        if (response.status === 200 && response.data.Data && response.data.Data.length > 0) {
          setPaketWisata(response.data.Data);
          console.log(response.data.Data);
        } else {
          console.log("Tidak ada data yang ditemukan");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dari, destinasi, tanggal, bugdet, jumlah, jumlahKaryawan]);

  const toggleDetails = (id) => {
    setShowDetails((prev) => (prev === id ? null : id));
  };

  return (
    <div className="paket-wisata-container slide-up-enter">
      <div>
        <Navbar />
      </div>
      <div className="rowPaket slide-up-enter">
        <div className="content-paket">
          <div className="judul-kota">
            {destinasi} tersedia {paketWisata.length} Paket
          </div>
          {paketWisata.map((paket) => (
            <div className="paket" key={paket.id}>
              <div className="judul-paket">{paket.nama_paket}</div>
              <div className="list-paket">
                <div className="wrap-list-paket">
                  <div className="paketw">
                    <div className="row">
                      <div className="hotel">
                        <div>
                          <FaHotel /> Hotel
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
                          <FaPlane /> Transportasi
                        </div>
                        <div className="transportasi">
                          <p>{paket["Jenis transportasi"]}</p>
                          <p>tanggal keberangkatan {tanggal} </p>
                          <Link to={`/Detailtransport/${paket.id_transportasi}`}>
                            <p>{paket.Transportasi}</p>
                          </Link>
                        </div>
                      </div>
                      <div className="paket-container">
                        <p>{paket.Total_harga}</p>
                        <p className="pp">transportasi+hotel+kuliner</p>
                        <button className="Detailpaket">
                          <Link to={`/Detailpaket/${paket.id}`}>
                            Detail Paket
                          </Link>
                        </button>
                        <button
                          className="toggle-details"
                          onClick={() => toggleDetails(paket.id)}
                        >
                          {showDetails === paket.id ? (
                            <IoIosArrowDropupCircle />
                          ) : (
                            <IoMdArrowDropdownCircle />
                          )}
                        </button>
                      </div>
                    </div>
                    <div
                      className={`wrap-drop-down-detail ${
                        showDetails === paket.id ? "open" : ""
                      }`}
                    >
                      <div className="drop-down-detail">
                        <h3 className="Judul-detail-paket1">{paket.nama_paket}</h3>
                        <p><SlCalender /><span>Tanggal Berangkat</span>{tanggal}</p>
                        <p><SlCalender /><span>Hote Permalam</span>{paket.Harga_hotel_per_malam}</p>
                        <p><RiMoneyDollarCircleLine /><span>Per Karyawan</span>{paket.Harga_paket_per_employee}</p>
                        <p><FaMoneyBill1Wave /><span>Total Harga</span>{paket.Total_harga}</p>
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
