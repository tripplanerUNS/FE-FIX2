import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import Dashboard from "./Admin/Component/Home/Dashboard";
import Agen from "./Admin/Page/Agen/Agen";
import Pengguna from "./Admin/Page/Pengguna/Pengguna";
import Destinasi from "./Admin/Page/Destination/Destinasi";
import Hotel from "./Admin/Page/Akomodasi/Hotel";
import Transportasi from "./Admin/Page/Akomodasi/Transportasi";
import Kuliner from "./Admin/Page/Akomodasi/Kuliner";
import Paket from "./Admin/Page/Paket/Paket";
import About from "./component/About/about";
import Detail from "./component/Detail/Detail";
import PaketWisata from "./component/Paket/paket";
import Cobalogin from "./component/coba/Cobalogin";
import Adminlogin from "./component/coba/Adminlogin";
import DetailTransport from "./component/Detail/DetailTransport";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [berangkat, setBerangkat] = useState("");
  const [jumlah, setJumlah] = useState("")
  // const [id_hotels, setId_hotels] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} budget={budget} setBudget={setBudget} berangkat={berangkat} setBerangkat={setBerangkat} jumlah={jumlah} setJumlah={setJumlah}/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/loginn" element={<Cobalogin />} />
        <Route path="/Alogin" element={<Adminlogin />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Agen&Admin/Dashboard" element={<Dashboard />} />
        <Route path="/Agen&Admin/Agen" element={<Agen />} />
        <Route path="/Agen&Admin/Pengguna" element={<Pengguna />} />
        <Route path="/Agen&Admin/Destinasi" element={<Destinasi />} />
        <Route path="/Agen&Admin/Hotel" element={<Hotel />} />
        <Route path="/Agen&Admin/Transportasi" element={<Transportasi />} />
        <Route path="/Agen&Admin/Kuliner" element={<Kuliner />} />
        <Route path="/Agen&Admin/Paket" element={<Paket />} />
        <Route path="/Detail/:id_hotels" element={<Detail />} />
        <Route path="/About" element={<About />} />
        <Route path="/PaketWisata" element={<PaketWisata dari={origin} destinasi={destination} bugdet={budget} tanggal={berangkat} jumlah={jumlah} setJumlah={setJumlah}/>} />
        <Route path="/Detailpaket" element={<Detail />} />
        <Route path="/Detailtransport/:id_transportasi" element={<DetailTransport/>} />
      </Routes>
    </Router>
  );
}

export default App;
