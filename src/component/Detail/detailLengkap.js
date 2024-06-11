import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Detail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Detailpaket() {
  return (
    <div>
      <Navbar />
      <div className="Wrap-detail-paket">
        <div className="wrap foto">
          disini foto
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detailpaket;
