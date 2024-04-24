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
      // setErrorMessage("");
      // setLoading(true);
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

        if (response.status === 200) {
          // setLoading(false);
          setPaketWisata(response.data);
          console.log(response.data); // Menampilkan output dari backend di console
        }

        // Lakukan penanganan respons sesuai kebutuhan, misalnya menampilkan data pada halaman atau melakukan navigasi ke halaman lain
      } catch (error) {
        if (error.response) {
          // setLoading(false);
          // setErrorMessage(error.response.data.message);
        } else {
          // setErrorMessage("Something went wrong. Please try again.");
        }
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (index) => {
    // Implement detail click logic here
    console.log("Detail button clicked for index:", index);
  };

  const handleFilterClick = () => {
    // Implement filter click logic here
    console.log("Filter button clicked");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="column">
            <div id="paket-wisata">
              {paketWisata.map((paket, index) => (
                <div className="paket" key={index}>
                  <div className="gambar-container">
                    <img
                      className="gambar"
                      src={paket.gambar}
                      alt={"Gambar Paket Wisata " + (index + 1)}
                    />
                  </div>
                  <div className="info">
                    <div>
                      <strong>Hotel:</strong> {paket.hotel}
                    </div>
                    <div>
                      <strong>Destinasi:</strong> {paket.destinasi}
                    </div>
                    <div>
                      <strong>Transportasi:</strong> {paket.transportasi}
                    </div>
                    <div>
                      <strong>Harga:</strong> {paket.harga}
                    </div>
                    <button onClick={() => handleDetailClick(index)}>
                      Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="column">
            <div className="filter">
              <h3>Filter by:</h3>
              <p>Your budget (Per night):</p>
              <select>
                <option value="50000">Rp. 500.000</option>
                <option value="50000">Rp. 1.000.000</option>
                <option value="50000">Rp. 1.500.000</option>
                <option value="2000000">Rp. 2.000.000+</option>
              </select>
              <div className="popular-filter">
                <h3>Popular Filter:</h3>
                <ul>
                  <li>
                    <input type="checkbox" id="freeWifi" />
                    <label htmlFor="freeWifi">Free Wifi</label>
                  </li>
                  <li>
                    <input type="checkbox" id="fiveStar" />
                    <label htmlFor="fiveStar">5 Star</label>
                  </li>
                  <li>
                    <input type="checkbox" id="veryGood" />
                    <label htmlFor="veryGood">Very Good: 8+</label>
                  </li>
                  <li>
                    <input type="checkbox" id="twinBeds" />
                    <label htmlFor="twinBeds">Twin Beds</label>
                  </li>
                  <li>
                    <input type="checkbox" id="airConditioning" />
                    <label htmlFor="airConditioning">Air Conditioning</label>
                  </li>
                  <li>
                    <input type="checkbox" id="spa" />
                    <label htmlFor="spa">Spa</label>
                  </li>
                  <li>
                    <input type="checkbox" id="noPrepayment" />
                    <label htmlFor="noPrepayment">No Prepayment</label>
                  </li>
                </ul>
              </div>
              <button onClick={handleFilterClick}>Apply Filter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaketWisata;
