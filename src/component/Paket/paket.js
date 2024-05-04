import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./paket.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaketWisata({ dari, destinasi, tanggal, bugdet }) {
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

  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };


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
            <div key={paket.id} className="paket">
              <div className="judul-paket">{paket.tujuan}</div>
              <div className="list-paket">
                <div className="wrap-list-paket">
                  <div className="paketw">
                    <div className="gambar-paket">
                      <img
                        src={`http://localhost:8000/uploads/paket/${paket.image}`}
                        alt="Non image"
                      />
                    </div>
                    <div className="infoPaket">
                      <p>Nama : {paket.nama_paket}</p>
                      <p>Kota : {paket.Tujuan}</p>
                      <p> Harga :{paket.Harga_paket}</p>
                    </div>
                    <div>
                      <button className="detailPaket" onClick={handleSubmit}>Lihat Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="content-filter">
          <div className="filter-container">
            <div className="filter card">
              <div className="card-body">
                <div className="filter-heading">Filter by:</div>{" "}
                {/* Tambahkan div untuk kotakan */}
                <hr /> {/* Garis pemisah */}
                <div className="filter-options">
                  <p>Your budget (Per night):</p>
                  <select>
                    <option value="50000">Rp. 500.000</option>
                    <option value="50000">Rp. 1.000.000</option>
                    <option value="50000">Rp. 1.500.000</option>
                    <option value="2000000">Rp. 2.000.000+</option>
                  </select>
                  <hr /> {/* Garis pemisah */}
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
                        <label htmlFor="airConditioning">
                          Air Conditioning
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="spa" />
                        <label htmlFor="spa">Spa</label>
                      </li>
                      <li>
                        <input type="checkbox" id="noPrepayment" />
                        <label htmlFor="noPrepayment">No Prepayment</label>
                      </li>
                      <li>
                        <input type="checkbox" id="noCreditCard" />
                        <label htmlFor="noCreditCard">
                          Book without credit card
                        </label>
                      </li>
                    </ul>
                    <button onClick={handleFilterClick}>Apply Filter</button>{" "}
                    {/* Button Apply Filter */}
                  </div>
                  <hr /> {/* Garis pemisah */}
                  <div className="meals-filter">
                    <h3>Meals:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {" "}
                      {/* Menghilangkan bulatan dan padding */}
                      <li>
                        <input type="checkbox" id="kitchenFacilities" />
                        <label htmlFor="kitchenFacilities">
                          Kitchen Facilities
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="breakfastIncluded" />
                        <label htmlFor="breakfastIncluded">
                          Breakfast Included
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="allMealsIncluded" />
                        <label htmlFor="allMealsIncluded">
                          All Meals Included
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="allInclusive" />
                        <label htmlFor="allInclusive">All Inclusive</label>
                      </li>
                      <li>
                        <input type="checkbox" id="breakfastLunchIncluded" />
                        <label htmlFor="breakfastLunchIncluded">
                          Breakfast & Lunch Included
                        </label>
                      </li>
                      <li>
                        <input type="checkbox" id="breakfastDinnerIncluded" />
                        <label htmlFor="breakfastDinnerIncluded">
                          Breakfast & Dinner Included
                        </label>
                      </li>
                    </ul>
                    <button onClick={handleFilterClick}>Apply Filter</button>{" "}
                    {/* Button Apply Filter */}
                  </div>
                  <hr /> {/* Garis pemisah */}
                  <div className="facilities-filter">
                    <h3>Facilities:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {" "}
                      {/* Menghilangkan bulatan dan padding */}
                      <li>
                        <input type="checkbox" id="parking" />
                        <label htmlFor="parking">Parking</label>
                      </li>
                      <li>
                        <input type="checkbox" id="freeWifiFacilities" />
                        <label htmlFor="freeWifiFacilities">Free WiFi</label>
                      </li>
                      <li>
                        <input type="checkbox" id="restaurant" />
                        <label htmlFor="restaurant">Restaurant</label>
                      </li>
                      <li>
                        <input type="checkbox" id="roomService" />
                        <label htmlFor="roomService">Room Service</label>
                      </li>
                      <li>
                        <input type="checkbox" id="spaFacilities" />
                        <label htmlFor="spaFacilities">Spa</label>
                      </li>
                      <li>
                        <input type="checkbox" id="familyRooms" />
                        <label htmlFor="familyRooms">Family Rooms</label>
                      </li>
                      <li>
                        <input type="checkbox" id="swimmingPool" />
                        <label htmlFor="swimmingPool">Swimming Pool</label>
                      </li>
                      <li>
                        <input type="checkbox" id="nonSmokingRooms" />
                        <label htmlFor="nonSmokingRooms">
                          Non-smoking Rooms
                        </label>
                      </li>
                    </ul>
                    <button onClick={handleFilterClick}>Apply Filter</button>{" "}
                    {/* Button Apply Filter */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaketWisata;