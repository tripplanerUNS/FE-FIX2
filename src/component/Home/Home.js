import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import BG from "../../Assets/bg.png";
import logo from "../../Assets/Trip Plan.png";
import "./Home.css";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import PaketWisata from "../Paket/paket";
import { useNavigate } from "react-router-dom";

function Home({
  origin,
  setOrigin,
  destination,
  setDestination,
  budget,
  setBudget,
  berangkat,
  setBerangkat,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  // const [origin, setOrigin] = useState("");
  // const [destination, setDestination] = useState("");
  // const [budget, setBudget] = useState("");
  // const [berangkat, setBerangkat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/PaketWisata");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  {
    /* proses get kota dan budget -> ke ambil paket */
  }

  return (
    <div className="body">
      <Navbar />
      <div className="background" style={{ backgroundImage: `url(${BG})` }}>
        <div className="judul-konten">
          <h1>
            Rencanakan Perjalanan <br></br> anda dan dapatkan harga termurah
          </h1>
          <p>Temukan pengalaman perjalanan yang tak terlupakan.</p>
        </div>
        <div className="button">
          <div className="content">
            <button onClick={openPopup}>Create Your Trip Plan</button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            {/* Isi popup disini */}
            <h2 className="judul-content">Plan Your Trip</h2>
            <div className="container-content">
              <div className="content-1">
                <div className="form-group">
                  <label>Dari</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={"Masukkan tempat asal"}
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
              </div>
              <div className="content-1">
                <div className="icon-container">
                  <div className="icon" onClick={handleSwap}>
                    <MdSwapHorizontalCircle />
                  </div>
                </div>
              </div>
              <div className="content-1">
                <div className="form-group">
                  <label>Ke</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={"Masukkan tujuan"}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="content-1">
                <div className="form-group-date">
                  <label>Berangkat</label>
                  <input
                    type="date"
                    className="date-control"
                    value={berangkat}
                    onChange={(e) => setBerangkat(e.target.value)}
                  ></input>
                </div>
              </div>
              {/* <div className="content-1">
                <div className="form-group-date">
                  <label>Pulang</label>
                  <input type="date" className="date-control"></input>
                </div>
              </div> */}
            </div>
            <div className="content-1">
              <div className="form-group-budget">
                <label className="budget">Budget</label>
                <input
                  type="text"
                  className="budget-control"
                  placeholder="Your Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                ></input>{" "}
                {/*disini daikasih proses ngambil data dari tabel paket (budget)*/}
              </div>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {loading && (
              <button type="button" onClick={handleSubmit}>
                Loading...
              </button>
            )}
            {!loading && (
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            )}

            {/* ketika user input data form maka terjadi proses pengambilan data dari (KE = tujuan = (kota di dalam database paket), budget (budget di dalam database paket) -> dia ngeload untuk ambil data dari tabel paket noted jika tidak ada tujuan/budget maka memberikan notifikasi tidak ada data, semisal ada datanya maka dia ngeload dan ngepush ke halaman paket.js*/}
          </div>
        </div>
      )}

      <section className="body-bantuan" id="bantuan">
        <div className="wrap-bantuan">
          <h2 className="judul-bantuan">Bagaimana cara menggunakannya?</h2>
        </div>
        <div className="content-bantuan">
          <div className="content-bantuan-vidio">
            <div className="vidio">
              {/* Letakkan konten video di sini */}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Tutorial Penggunaan Fitur"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="body-about" id="about">
        <div className="wrap-about">
          <div className="for-judul">
            <h2 className="judul-about">About</h2>
          </div>
          <div className="content">
            <div className="about-1">
              <text className="">Kami adalah sebuah tim yang berdedikasi untuk memberikan pengalaman perjalanan yang tak terlupakan kepada
            setiap pelanggan kami. Dengan lebih dari sepuluh tahun pengalaman dalam industri perjalanan, kami telah
            menjadi mitra yang tepercaya bagi mereka yang mencari petualangan, kenyamanan, dan inspirasi. Kami percaya
            bahwa setiap perjalanan adalah sebuah cerita yang unik, dan kami berkomitmen untuk menyediakan layanan yang
            dapat disesuaikan dengan kebutuhan dan keinginan setiap pelanggan kami.</text>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <img src={logo} alt="logo" />
            </div>
            <div className="footer-col">
              <h4>Pembayaran</h4>
              <ul>
                <li>Shopeepay</li>
                <li>Gopay</li>
                <li>Dana</li>
                <li>Qris</li>
                <li>M-banking</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow me</h4>
              <ul>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Tiktok</li>
                <li>Youtube</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Thanks To</h4>
              <ul>
                <li>Tuhan YME</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Trip Planner App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
