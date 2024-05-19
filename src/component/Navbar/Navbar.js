import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import logo from "../../Assets/Trip Plan.png";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState(""); // State untuk menyimpan username

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Ambil username dari local storage saat komponen dimuat
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Hapus username dari local storage saat logout
    localStorage.removeItem("username");
    // Atur kembali state username menjadi kosong
    setUsername("");
  };

  return (
    <nav
      className={`navbar-items ${isOpen ? "open" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menu-navbar">
        <div className="toggle-button" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link smooth to="#bantuan">
              Bantuan
            </Link>
          </li>
          <li>
            <Link smooth to="#about">
              About
            </Link>
          </li>
          {username ? (
            <>
              <li>
                <span>Welcome, {username}</span>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link smooth to="/loginn">
                  Login
                </Link>
              </li>
              <li>
                <Link smooth to="/Register">
                  Daftar
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
